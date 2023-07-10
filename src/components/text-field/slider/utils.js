import _ from 'lodash'
import BigNumber from 'bignumber.js'

import { handlePreventDefault } from '../../utils/handlers'

const HALF = 2
const EXPONENT_FLOOR = 10
const ACCURACY = 2

export const addSliderHandlers = (element, handleMouseMove, handleMouseUp) => {
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('touchmove', handleMouseMove, { passive: false })
    element.addEventListener('touchend', handleMouseUp, { passive: false })
    element.addEventListener('selectstart', handlePreventDefault)
}

export const removeSliderHandlers = (element, handleMouseMove, handleMouseUp) => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseup', handleMouseUp)
    element.removeEventListener('touchmove', handleMouseMove)
    element.removeEventListener('touchend', handleMouseUp)
    element.removeEventListener('selectstart', handlePreventDefault)
}

export const makeDelimiters = (min, max, step, grid) => {
    if (grid) {
        return grid.map((item, i) => 100 * i / (grid.length - 1))
    }

    const delimiters = []
    const halfStep = step / HALF

    let firstStep = min - (min % step) + step

    if (firstStep < min + halfStep) {
        firstStep += step
    }

    if (_.isNaN(firstStep) || firstStep >= max) {
        return delimiters
    }

    delimiters.push(firstStep)

    while (_.last(delimiters) + step < max - halfStep) {
        delimiters.push(_.last(delimiters) + step)
    }

    return delimiters.map((value) => (value - min) / (max - min) * 100)
}

const clampBorders = ({ leftValue, rightValue }, min, max, step) => {
    const halfStep = step / HALF
    let newLeftValue = leftValue
    let newRightValue = rightValue

    if (newLeftValue < min + halfStep) {
        newLeftValue = min
    }
    if (newRightValue < min + halfStep) {
        newRightValue = min
    }
    if (newRightValue > max - halfStep) {
        newRightValue = max
    }
    if (newLeftValue > max - halfStep) {
        newLeftValue = max
    }
    return { leftValue: newLeftValue, rightValue: newRightValue }
}

const getClosest = (value, { leftValue, rightValue }) =>
    Math.abs(value - leftValue) < Math.abs(rightValue - value)
        ? leftValue
        : rightValue

export const computeStepByDigits = (min, max, step, digits) => {
    if (!digits) {
        return step
    }

    const diff = max - min
    const maxSteps = _.ceil(diff / step)
    const exponent = Math.pow(EXPONENT_FLOOR, _.floor(Math.log(diff / maxSteps) / Math.LN10))

    let stepSize = 0

    for (let i = 0; i < digits.length; i += 1) {
        stepSize = digits[i] * exponent

        if (_.floor(diff / stepSize) <= maxSteps) {
            break
        }
    }

    return _.floor(diff / stepSize) >= EXPONENT_FLOOR ? stepSize : 1
}

const TOUCH_EVENT_TYPES = ['touchstart', 'touchend', 'touchmove']
export const getValueByMouse = (event, element, offset, step, min, max, grid, prevValue) => {
    const position = TOUCH_EVENT_TYPES.includes(event.type) ? event.changedTouches[0].pageX : event.pageX

    if (_.isUndefined(position)) {
        return prevValue
    }

    const absoluteValue = _.clamp((position - element.clientLeft - element.getBoundingClientRect().left - offset) / element.clientWidth, 0, 1)

    if (grid) {
        const newValue = grid[Math.round(absoluteValue * (grid.length - 1))]

        return new BigNumber(newValue).toPrecision()
    }

    const relativeValue = (absoluteValue * (max - min)) + min

    const borders = {
        leftValue: _.round(relativeValue - (relativeValue % step), ACCURACY),
        rightValue: _.round(relativeValue - (relativeValue % step) + step, ACCURACY)
    }

    const clampedBorders = clampBorders(borders, min, max, step)
    const newValue = getClosest(relativeValue, clampedBorders)

    return new BigNumber(newValue).toPrecision()
}

function getLowerBound (grid, value, from = 0, to = grid.length) {
    if (from >= to) {
        return to - 1
    }
    const m = Math.floor((from + to) / HALF)
    if (Number(grid[m]) < value) {
        return getLowerBound(grid, value, m + 1, to)
    }
    return getLowerBound(grid, value, from, m)
}

function getUpperBound (grid, value, from = 0, to = grid.length) {
    if (from >= to) {
        return to
    }
    const m = Math.floor((from + to) / HALF)
    if (Number(grid[m]) > value) {
        return getUpperBound(grid, value, from, m)
    }
    return getUpperBound(grid, value, m + 1, to)
}

export const getGridValue = (value, grid) => {
    // parseFloat нужен, т.к. value может быть с точкой в конце, например "5000."
    const matchIndex = grid.findIndex((i) => parseFloat(String(i)) === parseFloat(String(value)))
    if (matchIndex !== -1) {
        return matchIndex / (grid.length - 1)
    }

    const lowerBound = getLowerBound(grid, value)
    const upperBound = getUpperBound(grid, value, lowerBound + 1)

    if (lowerBound < 0) {
        return 0
    }
    if (upperBound >= grid.length) {
        return 1
    }

    const pseudoPercentage = (value - grid[lowerBound]) / (grid[upperBound] - grid[lowerBound])

    return (lowerBound + pseudoPercentage) / (grid.length - 1)
}

export const getLinearValue = (value, min, max) => _.clamp((value - min) / (max - min), 0, 1)

export const getValuePrefixSuffix = (value, prefix = '', suffix = '') => `${prefix}${value}${suffix}`

export const getBoundaries = ({ options, grid, min, max }) => {
    if (options) {
        return {
            min: _.first(options).title,
            max: _.last(options).title
        }
    } else if (grid) {
        return {
            min: _.first(grid),
            max: _.last(grid)
        }
    }

    return {
        min,
        max
    }
}

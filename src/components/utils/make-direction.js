import _ from 'lodash'

const BOTTOM = 'bottom'
const TOP = 'top'
const LEFT = 'left'
const RIGHT = 'right'
const CENTER = 'center'
const LINE_HEIGHT = 25
const HALF_TIP_WIDTH = 144

export const parseDirection = (directionStr) =>
    _.kebabCase(
        directionStr
            .replace('Text', '')
            .replace('Icon', '')
            .replace('sideLeft', 'topLeft')
            .replace('sideRight', 'topLeft')
    ).split('-')

const makeVerticalDirection = (
    height,
    bottom,
    clientHeight,
    verticalDirection,
    startVerticalDirection
) => {
    switch (true) {
        case verticalDirection === TOP && bottom <= height:
            return BOTTOM
        case startVerticalDirection === TOP && bottom - height - LINE_HEIGHT > height:
            return TOP

        case verticalDirection === BOTTOM && bottom >= clientHeight:
            return TOP
        case startVerticalDirection === BOTTOM && bottom + LINE_HEIGHT + height < clientHeight:
            return BOTTOM
        default:
            return verticalDirection
    }
}

const makeHorizontalDirection = (
    right,
    left,
    clientWidth,
    horizontalDirection
) => {
    if (right >= clientWidth) {
        if (horizontalDirection === LEFT) {
            return right - HALF_TIP_WIDTH < clientWidth ? CENTER : RIGHT
        }

        if (horizontalDirection === CENTER) {
            return RIGHT
        }
    }

    if (left <= 0) {
        if (horizontalDirection === RIGHT) {
            return left + HALF_TIP_WIDTH > 0 ? CENTER : LEFT
        }

        if (horizontalDirection === CENTER) {
            return LEFT
        }
    }

    return horizontalDirection
}

export const makeDirection = (node, direction, startDirection = []) => {
    if (!node) {
        return direction
    }

    const [verticalDirection, horizontalDirection] = direction
    const [startVerticalDirection] = startDirection
    const { bottom, height, left, right } = node.getBoundingClientRect()
    const { clientHeight, clientWidth } = document.documentElement

    const newVerticalDirection = makeVerticalDirection(
        height,
        bottom,
        clientHeight,
        verticalDirection,
        startVerticalDirection
    )
    const newHorizontalDirection = makeHorizontalDirection(
        right,
        left,
        clientWidth,
        horizontalDirection
    )

    return [newVerticalDirection, newHorizontalDirection]
}

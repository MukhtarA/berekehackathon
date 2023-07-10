import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const ZERO_PX = '0px'
const NO_DIGITS = /^\D+$/

const getExpectedDimensionFactory = (dimension) => {
    const capitalizeDimension = _.capitalize(dimension)
    const scroll = `scroll${capitalizeDimension}`
    const offset = `offset${capitalizeDimension}`
    const client = `client${capitalizeDimension}`
    const paddingStart = dimension === 'height' ? 'paddingTop' : 'paddingLeft'
    const paddingEnd = dimension === 'height' ? 'paddingBottom' : 'paddingRight'

    return (element, min, max = Infinity) => {
        if (element && min) {
            if (element[scroll] === 0) {
                return void 0
            }
            /**
             * IE-инпуты имеют неправильный scrollWidth
             * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11325194/
             * Для них необходимо проверять через div ширину контента и подставлять его значение
             */
            const responsiveElement = document.createElement('div')
            responsiveElement.innerHTML = element.value.replace(/\n/g, '<br />')
            responsiveElement.className = element.className
            const styles = getComputedStyle(element)
            _.forEach(styles, (value, key) => {
                // фикс для FF (он генерирует стили в разных форматах + массивом)
                if (NO_DIGITS.test(key)) {
                    responsiveElement.style[key] = value
                }
            })

            element.parentNode.appendChild(responsiveElement)
            if (element.tagName === 'INPUT') {
                responsiveElement.style.whiteSpace = 'nowrap'
            }

            const reservedPaddingStart = responsiveElement.style[paddingStart]
            const reservedPaddingEnd = responsiveElement.style[paddingEnd]
            responsiveElement.style[dimension] = ZERO_PX
            responsiveElement.style[paddingStart] = ZERO_PX
            responsiveElement.style[paddingEnd] = ZERO_PX

            const mainSize = responsiveElement[scroll] + responsiveElement[offset] - responsiveElement[client]

            responsiveElement.style[paddingStart] = reservedPaddingStart
            responsiveElement.style[paddingEnd] = reservedPaddingEnd

            const newValue = _.clamp(mainSize + parseFloat(styles[paddingStart]) + parseFloat(styles[paddingEnd]), min, max)

            responsiveElement.style[dimension] = `${newValue}px`

            const expectedDimension = responsiveElement.style[dimension]

            element.parentNode.removeChild(responsiveElement)

            return expectedDimension
        }

        return void 0
    }
}

const setDimensionFactory = (dimension) => {
    const capitalizeDimension = _.capitalize(dimension)
    const scroll = `scroll${capitalizeDimension}`
    const getExpectedDimension = getExpectedDimensionFactory(dimension)

    return (element, min, max = Infinity) => {
        if (element && min) {
            if (element[scroll] === 0) {
                return
            }

            const expectedDimension = getExpectedDimension(element, min, max)

            if (expectedDimension) {
                // comment: работа с размерами в realtime
                element.style[dimension] = expectedDimension
            }
        }
    }
}

export const setHeight = setDimensionFactory('height')
export const setWidth = setDimensionFactory('width')

export const autoSizeFactory = ({ minHeight, minWidth, maxHeight, maxWidth }) =>
    (Component) => class AutoSize extends React.PureComponent {
        static propTypes = {
            refWrapper: PropTypes.func
        }

        static defaultProps = {
            refWrapper: _.noop
        }

        componentDidMount () {
            setHeight(this.refWrapper, minHeight, maxHeight)
            setWidth(this.refWrapper, minWidth, maxWidth)
        }

        componentDidUpdate () {
            setHeight(this.refWrapper, minHeight, maxHeight)
            setWidth(this.refWrapper, minWidth, maxWidth)
        }

        setRef = (component) => {
            this.props.refWrapper(component)
            this.refWrapper = component
        }

        static WrappedComponent = Component

        render () {
            return <Component {...this.props} refWrapper={this.setRef} />
        }
    }

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
    disableHandler,
    preventHandler,
    handlePreventDefault,
    addClickHandlers,
    removeClickHandlers
} from '../../utils/handlers'

import { Segments } from './segments'
import {
    computeStepByDigits,
    getValueByMouse,
    getGridValue,
    getLinearValue,
    addSliderHandlers,
    removeSliderHandlers
} from './utils'
import { SliderBasicStyled, ProgressStyled, TrackStyled, ThumbStyled } from './slider.style'

export class BaseSlider extends React.PureComponent {
    static propTypes = {
        mode: PropTypes.oneOf([
            'segmented'
        ]),

        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,

        error: PropTypes.string,
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        digits: PropTypes.arrayOf(PropTypes.number),
        grid: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
        transitionDuration: PropTypes.number,

        /**
         * Thrown out functions for adding global handlers to the event listeners of the document. CAUTION: do not change, only for unit-tests
         */
        addSliderHandlers: PropTypes.func.isRequired,
        removeSliderHandlers: PropTypes.func.isRequired,
        addClickHandlers: PropTypes.func.isRequired,
        removeClickHandlers: PropTypes.func.isRequired
    }

    static defaultProps = {
        colorScheme: 'base',
        mode: void 0,

        onChange: _.noop,
        disabled: false,

        error: void 0,
        prefix: '',
        suffix: '',
        min: 0,
        max: 100,
        step: 1,
        grid: void 0,
        digits: void 0,
        title: void 0,
        transitionDuration: 0.3,

        addSliderHandlers,
        removeSliderHandlers,
        addClickHandlers,
        removeClickHandlers
    }

    componentWillUnmount () {
        this.props.removeSliderHandlers(document, this.handleMouseMove, this.handleMouseUp)
        this.props.removeClickHandlers(document, this.handleMouseClick)
    }

    setRefTrack = (component) => {
        this.track = component
    }

    setClosestValue = (event) => {
        const { min, max, step, digits, value, onChange, disabled, grid } = this.props

        const newValue = getValueByMouse(
            event,
            this.track,
            computeStepByDigits(min, max, step, digits),
            min,
            max,
            grid,
            value
        )

        if (newValue !== value) {
            disableHandler(onChange, disabled)(newValue, event)
        }
    }

    handleMouseDown = (event) => {
        if (!this.props.disabled) {
            this.setClosestValue(event)

            this.props.addSliderHandlers(document, this.handleMouseMove, this.handleMouseUp)
            this.props.addClickHandlers(document, this.handleMouseClick)
        }
    }

    handleMouseMove = preventHandler(this.setClosestValue)

    handleMouseUp = (event) => {
        this.setClosestValue(event)

        this.props.removeSliderHandlers(document, this.handleMouseMove, this.handleMouseUp)
    }

    handleMouseClick = (event) => {
        handlePreventDefault(event)
        this.props.removeClickHandlers(document, this.handleMouseClick)
    }

    render () {
        const {
            min,
            max,
            value,
            grid,
            mode,
            step,
            digits,
            error,
            transitionDuration,
            disabled
        } = this.props

        const leftOffset = grid
            ? `${100 * getGridValue(value, grid)}%`
            : `${100 * getLinearValue(value, min, max)}%`

        return (
            <SliderBasicStyled>
                <TrackStyled
                    error={error}
                    disabled={disabled}
                    ref={this.setRefTrack}
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={this.handleMouseDown}
                >
                    <ProgressStyled
                        leftOffset={leftOffset}
                        transitionDuration={transitionDuration}
                    />
                    <ThumbStyled
                        leftOffset={leftOffset}
                        transitionDuration={transitionDuration}
                    />
                    {mode === 'segmented' && (
                        <Segments
                            min={min}
                            max={max}
                            step={computeStepByDigits(min, max, step, digits)}
                            grid={grid}
                        />
                    )}
                </TrackStyled>
            </SliderBasicStyled>
        )
    }
}

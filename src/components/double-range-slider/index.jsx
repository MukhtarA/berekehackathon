import React, { useState, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
    RootElementStyled,
    InputRangeStyled,
    SliderWrapperStyled,
    TrackStyled,
    ThumbStyled,
    RangeLeftStyled,
    RangeRightStyled
} from './style'

const toPercent = (v, min, max) => ((v - min) / (max - min)) * 100

/*
 * SliderStyled based on this codepen
 * https://codepen.io/MinzCode/pen/MWKgyqb
 *
 */
export default function DoubleRangeSlider({ min, max, initialValues, onChange, step }) {
    const [start, setStart] = useState(_.get(initialValues, 'start', min))
    const [end, setEnd] = useState(_.get(initialValues, 'end', max))
    const [wrapperWidth, setWrapperWidth] = useState(0)
    const wrapper = useRef(null)
    const startInput = useRef(null)
    const endInput = useRef(null)

    const onStartChange = useCallback(
        (e) => {
            const newStart = Math.min(parseInt(e.target.value, 10), end)
            setStart(newStart)
            onChange(newStart, end)
        },
        [end, onChange]
    )

    const onEndChange = useCallback(
        (e) => {
            const newEnd = Math.max(parseInt(e.target.value, 10), start)
            setEnd(newEnd)
            onChange(start, newEnd)
        },
        [start, onChange]
    )

    const onTouchStart = useCallback((e) => {
        startInput.current.classList.remove('focus')
        e.target.classList.add('focus')
    }, [])

    const onTouchEnd = useCallback((e) => {
        endInput.current.classList.remove('focus')
        e.target.classList.add('focus')
    }, [])

    useEffect(() => {
        setWrapperWidth(wrapper.current.clientWidth)
    }, [])

    const startPercent = toPercent(start, min, max)
    const endPercent = toPercent(end, min, max)
    const x1 = (wrapperWidth * startPercent) / 100
    const x2 = (wrapperWidth * endPercent) / 100

    return (
        <RootElementStyled>
            <InputRangeStyled
                ref={endInput}
                type="range"
                onChange={onEndChange}
                onTouchStart={onTouchStart}
                value={_.get(initialValues, 'end', end)}
                min={min}
                max={max}
                step={step}
            />
            <InputRangeStyled
                ref={startInput}
                type="range"
                onChange={onStartChange}
                onTouchStart={onTouchEnd}
                value={_.get(initialValues, 'start', start)}
                min={min}
                max={max}
                step={step}
            />
            <SliderWrapperStyled ref={wrapper}>
                <TrackStyled>
                    <RangeLeftStyled value={startPercent} />
                    <RangeRightStyled value={endPercent} />
                </TrackStyled>
                <ThumbStyled value={x1} />
                <ThumbStyled value={x2} />
            </SliderWrapperStyled>
        </RootElementStyled>
    )
}

DoubleRangeSlider.propTypes = {
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    initialValues: PropTypes.shape({ start: PropTypes.number, end: PropTypes.number }),
    onChange: PropTypes.func.isRequired
}

DoubleRangeSlider.defaultProps = {
    step: 1,
    min: 0,
    max: 100,
    initialValues: null
}

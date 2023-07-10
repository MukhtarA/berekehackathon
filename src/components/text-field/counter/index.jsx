import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { metaOmitter } from '../../utils/hoc/omittere'
import { TextFieldMasked } from '../masked'
import { withLabel } from '../../labeled'

import { CounterStyled } from './text-field-counter.style'
import { CounterControl } from './counter-control'

const TOP_ARROW = 38
const BOTTOM_ARROW = 40
const HOME = 36
const END = 35
const PAGE_UP = 33
const PAGE_DOWN = 34

const MULTIPLICITY = 10

// comment: Ошибка side-effects
export const TextFieldCounter = metaOmitter(({
    size = 'md',
    formName,
    refWrapper,
    onChange = _.noop,
    onKeyDown = _.noop,
    readonly,
    disabled,
    value,
    step = 1,
    min = 0,
    max,
    prefix,
    suffix,
    ...props
}) => {
    const passedProps = _.extend(props, {
        refWrapper,
        onChange,
        form: formName,
        disabled,
        readonly,
        size,
        prefix,
        suffix,
        autoComplete: 'off',
        role: 'spinbutton',
        'aria-disabled': disabled,
        'aria-valuenow': value,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuetext': `${prefix}${value}${suffix}`
    })

    const handleIncreaseByTimes = useCallback((times) => {
        const newSum = _.toInteger(value) + (times * step)
        const newValue = _.toString(max ? Math.min(newSum, max) : newSum)

        if (newValue !== value) {
            onChange(newValue)
        }
    }, [step, value, onChange, min, max])

    const handleDecreaseByTimes = useCallback((times) => {
        const newQuantity = _.toInteger(value) - (times * step)
        const newValue = _.toString(Math.max(newQuantity, min))

        if (newValue !== value) {
            onChange(newValue)
        }
    }, [step, value, onChange, min, max])

    const handleIncrease = useCallback(() => {
        handleIncreaseByTimes(1)
    })

    const handleDecrease = useCallback(() => {
        handleDecreaseByTimes(1)
    })

    const handleKeyDown = useCallback((event) => {
        /*
         * Важно понимать что выражение `event.preventDefault()` необходимо выполнять после изменения значения.
         * Такая необходимость происходит из-за того, что некоторые скринридеры (VoiceOver) меняют режим взаимодействия браузера и клавиатуры,
         * что, в свою очередь, отменяет возможность клавиатурным событиям менять значение и ломать a11y.
         * */
        if (!disabled && !readonly) {
            switch (event.keyCode) {
                case BOTTOM_ARROW: {
                    handleDecreaseByTimes(1)
                    event.preventDefault()
                    break
                }
                case TOP_ARROW: {
                    handleIncreaseByTimes(1)
                    event.preventDefault()
                    break
                }
                case HOME: {
                    onChange(_.toString(min))
                    event.preventDefault()
                    break
                }
                case END: {
                    if (max) {
                        onChange(_.toString(max))
                    }
                    event.preventDefault()
                    break
                }
                case PAGE_DOWN: {
                    handleDecreaseByTimes(MULTIPLICITY)
                    event.preventDefault()
                    break
                }
                case PAGE_UP: {
                    handleIncreaseByTimes(MULTIPLICITY)
                    event.preventDefault()
                    break
                }
                default: {
                    break
                }
            }
        }

        onKeyDown(event)
    }, [onChange, min, max, onKeyDown, disabled, handleIncreaseByTimes, handleDecreaseByTimes])

    const parsedValue = _.toInteger(value)
    const disabledDecrease = disabled || parsedValue <= min
    const disabledIncrease = disabled || (!!max && parsedValue >= max)

    const mask = useMemo(
        () => `${prefix ? `${prefix} ` : ''}num${suffix ? ` ${suffix}` : ''}`,
        [prefix, suffix]
    )

    return (
        <TextFieldMasked
            inputMode="decimal"
            {...passedProps}
            onKeyDown={handleKeyDown}
            value={value}
            maskOptions={{
                mask,
                blocks: {
                    num: {
                        mask: Number,
                        min,
                        max
                    },
                },
                lazy: false
            }}
            additionalChild={
                !readonly && (
                    <CounterStyled size={size}>
                        <CounterControl
                            mode="decrease"
                            onClick={handleDecrease}
                            disabled={disabledDecrease}
                            aria-hidden="true"
                        />
                        <CounterControl
                            mode="increase"
                            onClick={handleIncrease}
                            disabled={disabledIncrease}
                            aria-hidden="true"
                        />
                    </CounterStyled>
                )
            }
        />
    )
})

TextFieldCounter.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    title: PropTypes.string,
    error: PropTypes.string,
    formName: PropTypes.string,
    refWrapper: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
}

export const LabeledTextFieldCounter = withLabel(TextFieldCounter)

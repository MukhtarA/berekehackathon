import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import SingleInput from './single-input'
import { OtpInputStyled } from './style'

export const OtpInput = ({
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChange,
    error,
    type,
    ...rest
}) => {
    const [activeInput, setActiveInput] = useState(0)
    const [otpValues, setOTPValues] = useState(new Array(length).fill(''))

    // Helper to return OTP from inputs
    const handleOtpChange = useCallback(
        (otp) => {
            const otpValue = otp.join('')
            onChange(otpValue)
        },
        [onChange]
    )

    // Helper to return value with the right type: 'text' or 'number'
    const getRightValue = useCallback(
        (str) => {
            const changedValue = str

            if (!isNumberInput) {
                return changedValue
            }

            return !changedValue || /\d/.test(changedValue) ? changedValue : ''
        },
        [isNumberInput]
    )

    // Change OTP value at focussing input
    const changeCodeAtFocus = useCallback(
        (str) => {
            const updatedOTPValues = [...otpValues]
            updatedOTPValues[activeInput] = str[0] || ''
            setOTPValues(updatedOTPValues)
            handleOtpChange(updatedOTPValues)
        },
        [activeInput, handleOtpChange, otpValues]
    )

    // Focus `inputIndex` input
    const focusInput = useCallback(
        (inputIndex) => {
            const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
            setActiveInput(selectedIndex)
        },
        [length]
    )

    const focusPrevInput = useCallback(() => {
        focusInput(activeInput - 1)
    }, [activeInput, focusInput])

    const focusNextInput = useCallback(() => {
        focusInput(activeInput + 1)
    }, [activeInput, focusInput])

    // Handle onFocus input
    const handleOnFocus = useCallback(
        (index) => () => {
            focusInput(index)
        },
        [focusInput]
    )

    // Handle onChange value for each input
    const handleOnChange = useCallback(
        (e) => {
            const val = getRightValue(e)

            if (!val) {
                e.preventDefault()

                return
            }
            changeCodeAtFocus(val)
            focusNextInput()
        },
        [changeCodeAtFocus, focusNextInput, getRightValue]
    )

    // Handle onBlur input
    const onBlur = useCallback(() => {
        setActiveInput(-1)
    }, [])

    // Handle onKeyDown input
    const handleOnKeyDown = useCallback(
        (e) => {
            switch (e.key) {
                case 'Backspace':
                case 'Delete': {
                    e.preventDefault()

                    if (otpValues[activeInput]) {
                        changeCodeAtFocus('')
                    } else {
                        focusPrevInput()
                    }
                    break
                }
                case 'ArrowLeft': {
                    e.preventDefault()
                    focusPrevInput()
                    break
                }
                case 'ArrowRight': {
                    e.preventDefault()
                    focusNextInput()
                    break
                }
                case ' ': {
                    e.preventDefault()
                    break
                }
                default:
                    break
            }
        },
        [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
    )

    const handleOnPaste = useCallback(
        (e) => {
            e.preventDefault()
            const pastedData = e.clipboardData
                .getData('text/plain')
                .trim()
                .slice(0, length - activeInput)
                .split('')

            if (pastedData) {
                let nextFocusIndex = 0
                const updatedOTPValues = [...otpValues]
                updatedOTPValues.forEach((val, index) => {
                    if (index >= activeInput) {
                        const changedValue = getRightValue(pastedData.shift() || val)

                        if (changedValue) {
                            updatedOTPValues[index] = changedValue
                            nextFocusIndex = index
                        }
                    }
                })
                setOTPValues(updatedOTPValues)
                handleOtpChange(updatedOTPValues)
                setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
            }
        },
        [activeInput, getRightValue, handleOtpChange, length, otpValues]
    )

    return (
        <OtpInputStyled {...rest}>
            {new Array(length).fill('').map((_, index) => (
                <SingleInput
                    // eslint-disable-next-line react/no-array-index-key
                    key={`SingleInput-${index}`}
                    focus={activeInput === index}
                    value={otpValues && otpValues[index]}
                    autoFocus={autoFocus}
                    onFocus={handleOnFocus(index)}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onBlur={onBlur}
                    onPaste={handleOnPaste}
                    disabled={disabled}
                    error={error}
                    type={type}
                />
            ))}
        </OtpInputStyled>
    )
}

OtpInput.propTypes = {
    length: PropTypes.number,
    isNumberInput: PropTypes.bool,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    type: PropTypes.string
}

OtpInput.defaultProps = {
    length: 4,
    isNumberInput: true,
    autoFocus: true,
    disabled: false,
    error: '',
    type: 'tel'
}

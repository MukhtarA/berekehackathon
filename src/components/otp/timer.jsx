import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Body2, Headline5 } from '../typography'

export const Timer = forwardRef(
    ({ initialMinute = 0, initialSeconds = 0, children, isSimpleTimer, handleTimeIsOver }, ref) => {
        const [minutes, setMinutes] = useState(initialMinute)
        const [seconds, setSeconds] = useState(initialSeconds)
        const { t } = useTranslation('shared')

        useEffect(() => {
            const myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1)
                }

                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                        handleTimeIsOver()
                    } else {
                        setMinutes(minutes - 1)
                        setSeconds(59)
                    }
                }
            }, 1000)

            return () => {
                clearInterval(myInterval)
            }
        })

        const resetTimer = ({ newMinutes, newSeconds }) => {
            setMinutes(newMinutes)
            setSeconds(newSeconds)
        }

        useImperativeHandle(ref, () => {
            return { resetTimer }
        })

        if (minutes === 0 && seconds === 0) {
            return <>{children}</>
        }

        return (
            <Body2 verticalPadding="zero">
                {!isSimpleTimer ? (
                    t('otp.hint', {
                        time: `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                    })
                ) : (
                    <Headline5 indent="zero">
                        {' '}
                        {`${minutes}м:${seconds < 10 ? `0${seconds}` : seconds}с`}
                    </Headline5>
                )}
            </Body2>
        )
    }
)

Timer.propTypes = {
    initialMinute: PropTypes.number,
    initialSeconds: PropTypes.number,
    children: PropTypes.node,
    isSimpleTimer: PropTypes.bool,
    handleTimeIsOver: PropTypes.func
}

Timer.defaultProps = {
    initialMinute: 0,
    initialSeconds: 0,
    children: null,
    isSimpleTimer: false,
    handleTimeIsOver: () => {}
}

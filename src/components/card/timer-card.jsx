import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { padStart } from 'lodash'

import { disableHandler } from '../utils/handlers'

import { Card } from './card'

const SECONDS = 60
const MILLISECONDS = 1000

const parseTimer = (timer) => {
    const minutes = (timer - (timer % SECONDS)) / SECONDS
    const seconds = padStart(timer % SECONDS, 2, 0)

    return `${minutes}:${seconds}`
}

export const TimerCard = ({
    initialValue,
    value,
    title,
    icon,
    timerIcon,
    timerTitle = '',
    onClick = () => {},
    ...props
}) => {
    const [timer, setTimer] = useState(Boolean(initialValue))
    const [timerValue, setTimerValue] = useState(initialValue)

    useEffect(() => {
        const timerID = setInterval(() => {
            if (timerValue) {
                setTimerValue(timerValue - 1)

            } else {
                clearInterval(timerID)
                setTimer(false)
            }
        }, MILLISECONDS)

        return () => clearInterval(timerID)
    }, [timerValue])

    const handleClick = useCallback(() => {
        setTimerValue(value)
        setTimer(true)

        onClick()
    }, [onClick, value])

    return (
        <Card
            title={timer ? `${timerTitle} ${parseTimer(timerValue)}` : title}
            onClick={disableHandler(handleClick, timer)}
            icon={timer && timerIcon ? timerIcon : icon}
            {...props}
        />
    )
}

TimerCard.propTypes = {
    /**
     * Передавайте значение, если таймер должен быть выставлен сразу
     */
    initialValue: PropTypes.number,
    value: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    timerTitle: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    timerIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}

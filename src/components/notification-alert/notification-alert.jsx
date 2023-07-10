/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@sbol/design-system/core/typography'

import { Headline5Styled, LoaderStyled, NotificationAlertStyled } from './style'

const NotificationAlert = ({
    children,
    handleClick,
    handleClose,
    open,
    acceptText,
    message,
    duration,
    isProgress,
    colorScheme
}) => {
    const [timer, setTimer] = useState(duration / 1000)

    useEffect(() => {
        if (open) {
            const timerWarning = setTimeout(() => {
                handleClose()
            }, +duration)

            return () => clearTimeout(timerWarning)
        }
    }, [duration, handleClose, open])

    useEffect(() => {
        if (open && timer > 0) {
            const timerDecrement = setTimeout(() => {
                setTimer(timer - 1)
            }, 1000)

            return () => clearTimeout(timerDecrement)
        }
    }, [duration, open, timer])

    return (
        open &&
        timer > 0 && (
            <NotificationAlertStyled show={open} colorScheme={colorScheme}>
                {isProgress && (
                    <LoaderStyled colorScheme={colorScheme}>
                        <Typography>{timer}</Typography>
                    </LoaderStyled>
                )}
                <Headline5Styled indent="zero">{children || message}</Headline5Styled>
                <Typography
                    fontWeight="semibold"
                    colorScheme={colorScheme}
                    onClick={handleClick || handleClose}
                >
                    {acceptText}
                </Typography>
            </NotificationAlertStyled>
        )
    )
}

NotificationAlert.propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    acceptText: PropTypes.string,
    colorScheme: PropTypes.string,
    isProgress: PropTypes.bool,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    message: PropTypes.string.isRequired
}

NotificationAlert.defaultProps = {
    handleClick: null,
    handleClose: () => {},
    acceptText: 'OK',
    children: null,
    open: false,
    duration: 5000,
    colorScheme: 'warning',
    isProgress: false
}

export default NotificationAlert

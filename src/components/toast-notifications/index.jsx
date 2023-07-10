import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { uniqueId } from 'lodash'

import { NotificationMessageStyled, NotificationStyled, ToastContainerStyled } from './style'
import { removeToastNotification } from './slice'

const ToastNotifications = (props) => {
    const { t } = useTranslation('shared')
    const dispatch = useDispatch()
    const toastList = useSelector((state) => state.toastNotifications)
    const { autoDelete, autoDeleteTime } = props

    const handleClose = useCallback(
        (id) => () => {
            dispatch(removeToastNotification(id))
        },
        [dispatch]
    )

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length > 0) {
                handleClose(toastList[0].id)()
            }
        }, autoDeleteTime)

        return () => {
            clearInterval(interval)
        }
    }, [toastList, autoDelete, autoDeleteTime, handleClose])

    return (
        <ToastContainerStyled>
            {toastList.map((toast) => (
                <NotificationStyled key={uniqueId()}>
                    <NotificationMessageStyled>{toast.message}</NotificationMessageStyled>
                    <button onClick={handleClose(toast.id)}>{t('toast.close')}</button>
                </NotificationStyled>
            ))}
        </ToastContainerStyled>
    )
}

ToastNotifications.propTypes = {
    autoDelete: PropTypes.bool,
    autoDeleteTime: PropTypes.number
}

ToastNotifications.defaultProps = {
    autoDelete: true,
    autoDeleteTime: 5000
}

export default ToastNotifications

import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonPrimary } from '../../button'

import { Modal } from '../../modal'
import AlertModal from '../../alert-modal'
import { OtpWrapper } from '../../otp'
import { EventObserver } from './event-observer'

export const mobileObserver = new EventObserver()

const smsLength = 5

export const ShowSmsDialogFallbacks = () => {
    const { t } = useTranslation('shared')
    const [modal, setModal] = useState('')
    const [otp, setOtp] = useState('')

    const changeModal = useCallback((name) => {
        setModal(name)
    }, [])

    const closeModal = useCallback(() => {
        setModal('')
    }, [])

    const subscribe = useCallback(
        (data) => {
            switch (data) {
                case 'showSmsDialog': {
                    changeModal('sms')
                    break
                }
                case 'hideSmsDialog': {
                    closeModal()
                    break
                }
                case 'unavailableOnPC': {
                    changeModal('unavaialable')
                    break
                }
                default: {
                    break
                }
            }
        },
        [changeModal, closeModal]
    )

    useEffect(() => {
        const listen = mobileObserver.subscribe(subscribe)

        return () => mobileObserver.unsubscribe(listen)
    }, [subscribe])

    const handleChangeOtp = useCallback((smsValue) => {
        setOtp(smsValue)
    }, [])

    const handleResultOtp = useCallback(() => {
        window.onSmsDialogResult(otp)
    }, [otp])

    const handleResendOtp = useCallback(() => {
        window.onSmsDialogResendClicked()
    }, [])

    const handleUnavailableOk = () => {}

    const alertButtons = [
        {
            text: t('navigation.ok'),
            role: 'ok',
            handler: handleUnavailableOk
        }
    ]

    return (
        <>
            {modal === 'unavaialable' && (
                <AlertModal
                    title={t('modal.onlyMobileTitle')}
                    message={t('modal.onlyMobileSub')}
                    buttons={alertButtons}
                    open={modal === 'unavaialable'}
                    onClose={closeModal}
                />
            )}
            {modal === 'sms' && (
                <Modal title={t('otp.title')} onClose={closeModal}>
                    <OtpWrapper
                        initialMinute={1}
                        initialSeconds={0}
                        length={smsLength}
                        resend={handleResendOtp}
                        onChange={handleChangeOtp}
                    />
                    <ButtonPrimary
                        title={t('navigation.send')}
                        fullWidth
                        disabled={otp.length !== smsLength}
                        onClick={handleResultOtp}
                    />
                </Modal>
            )}
        </>
    )
}

import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { ButtonPrimary } from '@sbol/design-system/core/button'

import { ScreenLayout } from '@web_sbol/shared/src/components/screen-layout'
import { LoaderText } from '@web_sbol/shared/src/components/loader'
import { SignatureScreen } from '@web_sbol/shared/src/components/signature-screen'
import { ScreenOops } from '@web_sbol/shared/src/components/screen-oops'
import { MobileActions } from '@web_sbol/shared/src/utils/mobile-actions'
import { SmsScreenWebStateful } from '../../sms-screen-web'
import { useAgreementSignature } from '../../../utils/hooks'
import { LOADING, SUCCEEDED, FAILED } from '../../../constants'

export const Agreement = ({ onSign, onClose, axiosInstance }) => {
    const { t } = useTranslation()
    const [agreement, setAgreement] = useState(false)
    const [smsCode, setSmsCode] = useState('')
    const [showSmsScreenWeb, setShowSmsScreenWeb] = useState(false)

    const {
        stateCreateAgreement,
        stateApproveAgreement,
        statePreapproveAgreement,
        createAgreement,
        preapproveAgreement,
        approveAgreement
    } = useAgreementSignature(axiosInstance)

    const stateListAgreement = [stateCreateAgreement.status, stateApproveAgreement.status]
    const stateListSms = {
        getSms: stateCreateAgreement.status,
        acceptSms: stateApproveAgreement.status
    }
    const isLoadingAgreement = stateListAgreement.includes(LOADING)
    const isFailedAgreement = stateListAgreement.includes(FAILED) && !isLoadingAgreement
    const isSucceededAgreement =
        stateListAgreement.includes(SUCCEEDED) && !isLoadingAgreement && !isFailedAgreement

    const handleCloseSmsScreenWeb = useCallback(() => setShowSmsScreenWeb(false), [])

    const handleSign = useCallback(() => {
        if (window.Mobile) {
            MobileActions.showSmsDialog()
        } else {
            setShowSmsScreenWeb(true)
        }
    }, [])

    const handleAgreement = useCallback((value) => {
        setAgreement(value)
    }, [])

    const handleClose = useCallback(async () => {
        onClose()
    }, [onClose])

    const handleApproveSmsWeb = useCallback((code) => {
        setSmsCode(code)
    }, [])

    window.onSmsDialogResendClicked = () => createAgreement()

    window.onSmsDialogResult = async (code) => {
        setSmsCode(code)
    }

    useEffect(() => {
        createAgreement()
    }, [createAgreement])

    useEffect(() => {
        if (stateCreateAgreement.status === SUCCEEDED) {
            preapproveAgreement()
        }
    }, [preapproveAgreement, stateCreateAgreement.status])

    useEffect(() => {
        if (statePreapproveAgreement.status === SUCCEEDED && smsCode) {
            approveAgreement(smsCode)
        }
    }, [statePreapproveAgreement.status, smsCode, approveAgreement])

    useEffect(() => {
        if (stateApproveAgreement.status === SUCCEEDED) {
            onSign({ link: statePreapproveAgreement?.data?.docId })
            MobileActions.hideSmsDialog()
        }

        if (stateApproveAgreement.status === FAILED) {
            MobileActions.hideSmsDialog()
        }
    }, [stateApproveAgreement, statePreapproveAgreement, onSign])

    return (
        <>
            {isLoadingAgreement && (
                <ScreenLayout>
                    <ScreenLayout.Content>
                        <LoaderText texts={[{ text: t('processingPersonalData') }]} />
                    </ScreenLayout.Content>
                </ScreenLayout>
            )}
            {isSucceededAgreement && !showSmsScreenWeb && (
                <SignatureScreen
                    headerTitle={t('agreement.release')}
                    agreementTitle="agreement.create.agreement"
                    agreement={agreement}
                    title={t('agreement.create.title')}
                    description={t('agreement.create.description')}
                    documentLink={`${process.env.SBOL_BACKEND_URL}/haos/signer/api/v1/files/${_.get(
                        statePreapproveAgreement,
                        'data.docId'
                    )}`}
                    documentTitle={t('agreement.create.documentTitle')}
                    buttonAgreementTitle={t('agreement.create.agreementButton')}
                    signButtonTitle={t('button.signTitle')}
                    onAgreement={handleAgreement}
                    onSign={handleSign}
                    loader={isLoadingAgreement}
                    onClose={handleClose}
                />
            )}
            {isSucceededAgreement && showSmsScreenWeb && (
                <SmsScreenWebStateful
                    smsStatuses={stateListSms}
                    onResendSms={createAgreement}
                    onApprove={handleApproveSmsWeb}
                    onClose={handleCloseSmsScreenWeb}
                />
            )}
            {isFailedAgreement && (
                <ScreenOops
                    appName={t('header.title')}
                    title={t('oops')}
                    text={t('oops.text')}
                    footer={
                        <ButtonPrimary
                            title={t('button.backHome')}
                            fullWidth
                            onClick={handleClose}
                        />
                    }
                />
            )}
        </>
    )
}

Agreement.propTypes = {
    onSign: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    axiosInstance: PropTypes.func.isRequired
}

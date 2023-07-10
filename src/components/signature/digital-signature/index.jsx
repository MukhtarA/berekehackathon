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
import { useGeoLocation } from '@web_sbol/shared/src/utils'
import { SmsScreenWebStateful } from '../../sms-screen-web'
import { useDigitalSignature } from '../../../utils/hooks'
import { LOADING, SUCCEEDED, FAILED } from '../../../constants'

export const DigitalSignature = ({ onCreated, onClose, axiosInstance, errorDescription }) => {
    const { t } = useTranslation('shared')
    const { latitude, longitude } = useGeoLocation()
    const [agreement, setAgreement] = useState(false)
    const [showSmsScreenWeb, setShowSmsScreenWeb] = useState(false)

    const {
        createEds,
        stateCreateEds,
        revokeEds,
        preapproveEds,
        statePreapproveEds,
        approveEds,
        stateApproveEds
    } = useDigitalSignature(axiosInstance)

    const stateListEDS = [stateCreateEds.status, statePreapproveEds.status, stateApproveEds.status]
    const stateListSms = { getSms: stateCreateEds.status, acceptSms: stateApproveEds.status }
    const isLoadingEDS = stateListEDS.includes(LOADING)
    const isFailedEDS = stateListEDS.includes(FAILED) && !isLoadingEDS
    const isSucceededEDS = stateListEDS.includes(SUCCEEDED) && !isLoadingEDS && !isFailedEDS

    const handleCloseSmsScreenWeb = useCallback(() => setShowSmsScreenWeb(false), [])

    const handleSign = useCallback(() => {
        preapproveEds()

        if (window.Mobile) {
            MobileActions.showSmsDialog()
        } else {
            setShowSmsScreenWeb(true)
        }
    }, [preapproveEds])

    const handleCreateEDS = useCallback(() => {
        if (latitude && longitude) {
            createEds(latitude, longitude)
        }
    }, [createEds, latitude, longitude])

    const handleAgreement = useCallback((value) => {
        setAgreement(value)
    }, [])

    const handleClose = useCallback(async () => {
        revokeEds()
        onClose()
    }, [revokeEds, onClose])

    const handleApproveSmsWeb = useCallback(
        (sms) => {
            approveEds(sms)
        },
        [approveEds]
    )

    window.onSmsDialogResendClicked = () => handleCreateEDS()

    window.onSmsDialogResult = async (code) => {
        approveEds(code)
    }

    useEffect(() => {
        if (stateApproveEds.status === SUCCEEDED) {
            onCreated()
        }

        if (stateApproveEds.status !== LOADING && window.Mobile) {
            MobileActions.hideSmsDialog()
        }

        return () => {
            if (!stateApproveEds.status === SUCCEEDED) {
                revokeEds()
            }
        }
    }, [stateApproveEds, onCreated, revokeEds])

    useEffect(() => {
        handleCreateEDS()
    }, [handleCreateEDS])

    return (
        <>
            {isLoadingEDS && (
                <ScreenLayout>
                    <ScreenLayout.Content>
                        <LoaderText texts={[{ text: t('common:processingPersonalData') }]} />
                    </ScreenLayout.Content>
                </ScreenLayout>
            )}
            {isSucceededEDS && !showSmsScreenWeb && (
                <SignatureScreen
                    headerTitle={t('common:eds.release')}
                    agreementTitle="eds.create.agreement"
                    agreement={agreement}
                    title={t('common:eds.create.title')}
                    description={t('common:eds.create.description')}
                    documentLink={`${process.env.SBOL_BACKEND_URL}/haos/signer/api/v1/files/${_.get(
                        stateCreateEds,
                        'data.link'
                    )}`}
                    documentTitle={t('common:eds.create.documentTitle')}
                    buttonAgreementTitle={t('common:eds.create.agreementButton')}
                    signButtonTitle={t('common:button.signTitle')}
                    onAgreement={handleAgreement}
                    onSign={handleSign}
                    loader={isLoadingEDS}
                    onClose={handleClose}
                />
            )}
            {isSucceededEDS && showSmsScreenWeb && (
                <SmsScreenWebStateful
                    smsStatuses={stateListSms}
                    onResendSms={handleCreateEDS}
                    onApprove={handleApproveSmsWeb}
                    onClose={handleCloseSmsScreenWeb}
                />
            )}
            {isFailedEDS && (
                <ScreenOops
                    appName={t('common:eds.release')}
                    title={t('common:oops')}
                    text={errorDescription}
                    footer={
                        <ButtonPrimary
                            title={t('shared:navigation.back')}
                            fullWidth
                            onClick={handleClose}
                        />
                    }
                    onBack={handleClose}
                />
            )}
        </>
    )
}

DigitalSignature.propTypes = {
    onCreated: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    axiosInstance: PropTypes.func.isRequired,
    errorDescription: PropTypes.string
}

DigitalSignature.defaultProps = {
    errorDescription: ''
}

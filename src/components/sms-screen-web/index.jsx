import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { LabeledTextField } from '@sbol/design-system/core/text-field'
import { Headline3 } from '@sbol/design-system/core/typography'
import { ButtonPrimary } from '@sbol/design-system/core/button'

import { ScreenLayout } from '@web_sbol/shared/src/components/screen-layout'
import { LoaderText } from '@web_sbol/shared/src/components/loader'
import { LinkButton } from '../buttons'
import { LOADING, SUCCEEDED, FAILED } from '../../constants'

export const SmsScreenWeb = ({
    sms,
    setSms,
    onResendSms,
    onApprove,
    smsStatuses,
    UITexts,
    onClose
}) => {
    const { t } = useTranslation()
    const loaderTexts = _.map(UITexts.loaderTexts, (text) => ({
        text: t(text)
    }))
    const isLoadingGetSms = _.get(smsStatuses, 'getSms') === LOADING
    const isSucceededGetSms = _.get(smsStatuses, 'getSms') === SUCCEEDED
    const isFailedGetSms = _.get(smsStatuses, 'getSms') === FAILED
    const isFailedAcceptSms = _.get(smsStatuses, 'acceptSms') === FAILED
    const isDisabled = sms?.length !== 5

    const handleChangeSms = useCallback((value) => setSms(value), [setSms])

    return (
        <ScreenLayout>
            {!isLoadingGetSms && (
                <ScreenLayout.Header
                    iconName="icon:core/common/ic24Cross"
                    title="SMS"
                    onClick={onClose}
                />
            )}
            <ScreenLayout.Content>
                {isLoadingGetSms && <LoaderText texts={loaderTexts} />}
                {isSucceededGetSms && (
                    <LabeledTextField
                        value={sms}
                        inputMode="numeric"
                        fullWidth
                        onChange={handleChangeSms}
                    />
                )}
                {isFailedGetSms && !isFailedAcceptSms && (
                    <Headline3>{t(UITexts.failedHeadline)}</Headline3>
                )}
            </ScreenLayout.Content>
            <ScreenLayout.Footer>
                {!isLoadingGetSms && (
                    <>
                        <ButtonPrimary
                            title={t(UITexts.successButttonTitle)}
                            fullWidth
                            disabled={isDisabled}
                            onClick={onApprove}
                        />
                        <LinkButton title={t(UITexts.failedButttonTitle)} onClick={onResendSms} />
                    </>
                )}
            </ScreenLayout.Footer>
        </ScreenLayout>
    )
}

const withStateful = (Comp) =>
    function HOC({ onApprove, ...props }) {
        const [smsValue, setSmsValue] = useState('')

        const handleApproveSms = useCallback(() => {
            onApprove(smsValue)
        }, [smsValue, onApprove])

        return <Comp sms={smsValue} setSms={setSmsValue} onApprove={handleApproveSms} {...props} />
    }

export const SmsScreenWebStateful = withStateful(SmsScreenWeb)

SmsScreenWeb.propTypes = {
    sms: PropTypes.string.isRequired,
    setSms: PropTypes.func.isRequired,
    smsStatuses: PropTypes.shape({
        getSms: PropTypes.string.isRequired,
        acceptSms: PropTypes.string.isRequired
    }).isRequired,
    onResendSms: PropTypes.func.isRequired,
    onApprove: PropTypes.func.isRequired,
    UITexts: PropTypes.shape({
        loaderTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
        successButttonTitle: PropTypes.string.isRequired,
        failedHeadline: PropTypes.string.isRequired,
        failedButttonTitle: PropTypes.string.isRequired
    }),
    onClose: PropTypes.func
}

SmsScreenWeb.defaultProps = {
    UITexts: {
        loaderTexts: ['common:loading'],
        successButttonTitle: 'shared:otp.confirm',
        failedHeadline: 'shared:otp.rerequest',
        failedButttonTitle: 'shared:otp.resend'
    },
    onClose: null
}

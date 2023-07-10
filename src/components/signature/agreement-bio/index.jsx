// eslint-disable promise/prefer-await-to-then
import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import * as _ from 'lodash'

import AlertModal from '@web_sbol/shared/src/components/alert-modal'
import { ScreenLayout } from '../../screen-layout'
import { LoaderText } from '../../loader'
import { BioSigner } from './bio-signer'
import { CreateAgreement } from './create-agreement'
import api from '../../../api'

const exampleDocs =
    '[{"docId":"8186e495-e8e8-489f-8d4c-6f107aa965f6","file_name":"6a7606c3-bae0-4c71-b7c4-158f4ce06319.pdf","type":"Анкета клиента на открытие текущего и карточного счета(модуль доверительный кредит)","type_id":"0d5a59b6-83f2-4037-9c62-3d3bce8d2e72","signType":"client","sha":""},{"docId":"8186e495-e8e8-489f-8d4c-6f107aa965f6","file_name":"6a7606c3-bae0-4c71-b7c4-158f4ce06319.pdf","type":"Анкета клиента на открытие текущего и карточного счета(модуль доверительный кредит)","type_id":"0d5a59b6-83f2-4037-9c62-3d3bce8d2e72","signType":"clientBank","sha":""}]'

const checkAgreement = () => {
    return api.get('communication/ecp/api/v1/agreement/check?type=physical')
}

export const AgreementController = ({
    children = <Redirect to="/" />,
    debugMode,
    onSignSuccess,
    onSignCancel,
    ...props
}) => {
    const { t } = useTranslation('shared')
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)
    const [error, setError] = useState()

    const checkIsSign = useCallback(async (onOk, onFail = _.noop, options) => {
        if (options?.unmounted) {
            return
        }

        const checkResponse = await checkAgreement()

        if (checkResponse?.data?.info?.includes('Consent signed')) {
            console.log('success case. Already had consent')
            onOk()

            return
        }

        onFail()
    }, [])

    const handleAccept = useCallback(
        async (result) => {
            console.log('handleAccepted func reached')
            checkIsSign(
                () => {
                    console.log('checkSignSuccess', result, onSignSuccess)
                    setSigned(true)
                    onSignSuccess?.(result)
                },
                () => {
                    setError(t('bioEds.errors.revise'))
                    // setSigned(true)
                    // onSignSuccess?.(result)
                }
            )
        },
        [checkIsSign]
    )

    const handleRejected = useCallback((denyType) => {
        if (denyType === 'USER_EXIT') {
            onSignCancel()

            return
        }
        console.log({ denyType })
        setError(t('bioEds.errors.wrong'))
    }, [])

    const resetError = useCallback(() => {
        setError(null)
    }, [])

    useEffect(() => {
        let unmounted = false

        if (debugMode) {
            setLoading(false)
        } else {
            checkIsSign(
                () => {
                    setSigned(true)
                    setLoading(false)
                },
                _.noop,
                { unmounted }
            )
        }

        return () => {
            unmounted = true
        }
    }, [checkIsSign, debugMode])

    if (error) {
        return (
            <AlertModal
                title={t('bioEds.error.title')}
                message={error}
                buttons={[{ handler: resetError, text: t('button.ok') }]}
                open={error}
                onClose={resetError}
            />
        )
    }

    if (loading) {
        return (
            <ScreenLayout>
                <LoaderText texts={[{ text: t('bioEds.checkingAgreement') }]} />
            </ScreenLayout>
        )
    }

    if (!signed) {
        return (
            <CreateAgreement>
                {(documents) => (
                    <BioSigner
                        onSucceed={handleAccept}
                        onRejected={handleRejected}
                        documents={documents}
                        {...props}
                    />
                )}
            </CreateAgreement>
        )
    }

    return children
}

AgreementController.propTypes = {
    debugMode: PropTypes.bool,
    processId: PropTypes.number.isRequired,
    onSignSuccess: PropTypes.func.isRequired
}

AgreementController.defaultProps = {
    onSignCancel: () => {}
}

export const withAgreementHOC = (WrappedComponent, options) => (props) => {
    return (
        <AgreementController {...options}>
            <WrappedComponent {...props} />
        </AgreementController>
    )
}

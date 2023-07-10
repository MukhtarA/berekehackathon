/* eslint-disable react/jsx-no-literals */
import React, { useState, useCallback, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import axios from 'axios'
import _ from 'lodash'
import { LabeledTextFieldMasked } from '../text-field'
import { ButtonPrimary } from '../button'

import { OtpWrapper } from '../otp'
import {
    generateUuid,
    getBrowserInfo,
    authUrl,
    parseJwt,
    getRequestParams,
    setTokens,
    getLanguage
} from './helpers'
import { MobileLinks, BackLink, InfoBlock } from './components'
import {
    LoginWrapperStyled,
    LoginFormWrapperStyled,
    LoginTitleStyled,
    AgreementTextStyled
} from './style'

const id = generateUuid()
const platform = getBrowserInfo()

export default () => {
    const { push } = useHistory()
    const {
        t,
        i18n: { language }
    } = useTranslation('shared')
    const { state } = useLocation()
    const [step, setStep] = useState('IIN')
    const [number, setNumber] = useState()
    const [iin, setIin] = useState()
    const [pan, setPan] = useState()
    const [otp, setOtp] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [errorCode, setErrorCode] = useState()
    const [showLinks, setShowLinks] = useState(false)
    const [validationData, setValidationData] = useState()
    const [isWrongIin, setIsWrongIin] = useState(false)
    const [isNumberWrong, setNumberWrong] = useState(false)
    const redirectUrl = _.get(state, 'redirectUrl', '/')
    const userAuthError = t('auth.userAuthError')

    const goBack = useCallback(() => {
        setStep('IIN')
        setNumber('')
        setIin('')
        setPan('')
        setOtp('')
        setError('')
        setErrorCode('')
        setShowLinks(false)
    }, [])

    const handleNext = useCallback(async () => {
        if (!number) {
            setStep('NUMBER')

            return
        }

        const params = getRequestParams('client_credentials')

        try {
            setIsLoading(true)
            const response = await axios.post(`${authUrl}/protocol/openid-connect/token`, params, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Accept-Language': getLanguage()
                }
            })

            if (response.status === 200) {
                try {
                    const secondResponse = await axios.post(
                        `${authUrl}/user-validation/v2`,
                        {
                            ctn: number,
                            iin,
                            device: {
                                id,
                                os: platform
                            },
                            platform
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${response.data.access_token}`,
                                'Accept-Language': language
                            }
                        }
                    )

                    setValidationData(secondResponse.data)
                    setStep('OTP')
                    setError('')
                } catch (e) {
                    const description = _.get(e, 'response.data.rqMessageText', userAuthError)
                    setError(description)
                }
            } else {
                setError(t('auth.appAuthError'))
            }
        } catch (e) {
            const description = _.get(e, 'response.data.error_description', e.message)
            setError(description)
        }
        setIsLoading(false)
    }, [iin, language, number, t, userAuthError])

    const handleLogin = useCallback(async () => {
        const params = getRequestParams('password')
        params.append('username', number)
        params.append('REQUEST_ID', validationData.requestId)
        params.append('OTP', otp)
        params.append('DEVICE_ID', id)
        params.append('IIN', iin)

        if (pan) {
            params.append(
                'MASKED_PAN',
                pan.replace(/•| /g, (match) => (match === '•' ? '*' : ''))
            )
        }

        try {
            setIsLoading(true)
            const response = await axios.post(`${authUrl}/protocol/openid-connect/token`, params, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Accept-Language': getLanguage()
                }
            })

            if (response.status === 200) {
                const accessToken = response.data.access_token
                const refreshToken = response.data.refresh_token
                const clientType = _.get(parseJwt(accessToken), 'clientType')
                // TODO: REMOVE IT AFTER IT FIXED ON BACKEND SIDE
                axios.get(`${process.env.SBOL_BACKEND_URL}/profile/v1/ping`, {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
                })

                if (clientType !== 3) {
                    setTokens(accessToken, refreshToken, number)
                    push(redirectUrl)
                } else {
                    setError(t('auth.isNotClientError'))
                    setErrorCode('isNotClient')
                    setStep('NUMBER')
                }
            } else {
                setError(userAuthError)
            }
        } catch (e) {
            const code = _.get(e, 'response.data.error')
            const description = _.get(e, 'response.data.error_description', userAuthError)
            setErrorCode(code)
            setError(description)

            if (code === 'invalidOtp') {
                setOtp('')
                setStep('OTP')
            }

            if (code === 'invalidMaskedPan') {
                setStep('MASKED_PAN')
            }
        }

        setIsLoading(false)
    }, [iin, number, otp, pan, push, redirectUrl, t, validationData, userAuthError])

    const handleOtp = useCallback(() => {
        const nextStep = _.last(_.get(validationData, 'accept', ['OTP']))

        if (nextStep !== 'OTP') {
            setStep(nextStep)
        } else {
            handleLogin()
        }
    }, [handleLogin, validationData])

    const handleShowClient = useCallback(() => {
        setShowLinks(!showLinks)
    }, [showLinks])

    const handleIinKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter' && _.size(iin) === 12) {
                setIsWrongIin(false)
                handleNext()
            } else if (e.key === 'Enter') {
                setIsWrongIin(true)
            }
        },
        [handleNext, iin]
    )

    const handleNumberKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter' && _.size(number) === 11) {
                setNumberWrong(false)
                handleNext()
            } else if (e.key === 'Enter') {
                setNumberWrong(true)
            }
        },
        [handleNext, number]
    )

    const handleIinMouseClick = useCallback(() => {
        if (_.size(iin) === 12) {
            setIsWrongIin(false)
            handleNext()
        } else {
            setIsWrongIin(true)
        }
    }, [handleNext, iin])

    const handlePhoneNumberMouseClick = useCallback(() => {
        if (_.size(number) === 11) {
            setNumberWrong(false)
            handleNext()
        } else {
            setNumberWrong(true)
        }
    }, [handleNext, number])

    useEffect(() => {
        if (step === 'IIN') {
            document.getElementById('iinInput').focus()
            setNumberWrong(false)
        } else if (step === 'NUMBER') {
            document.getElementById('phoneInput').focus()
        }
    }, [step])

    useEffect(() => {
        if (otp?.length === 6) {
            document.getElementById('otpConfirm').focus()
        }
    }, [otp])

    const renderButton = () => {
        switch (errorCode) {
            case 'invalidIinForMobile':
                return <ButtonPrimary fullWidth title={t('auth.iinBackButton')} onClick={goBack} />
            case 'isNotClient':
                return (
                    <ButtonPrimary
                        fullWidth
                        title={showLinks ? t('auth.hideButton') : t('auth.showButton')}
                        onClick={handleShowClient}
                    />
                )
            default:
                return step === 'IIN' ? (
                    <ButtonPrimary
                        fullWidth
                        title={t('navigation.next')}
                        onClick={handleIinMouseClick}
                    />
                ) : (
                    <ButtonPrimary
                        fullWidth
                        title={t('auth.numberButton')}
                        onClick={handlePhoneNumberMouseClick}
                        loading={isLoading}
                    />
                )
        }
    }

    return (
        <LoginWrapperStyled>
            {step === 'IIN' && (
                <LoginFormWrapperStyled>
                    <LoginTitleStyled indent="zero">{t('auth.loginTitle')}</LoginTitleStyled>
                    <LabeledTextFieldMasked
                        id="iinInput"
                        label={t('auth.iinLabel')}
                        maskOptions={{ mask: '000000000000', lazy: true }}
                        placeholder={t('auth.iinPlaceholder')}
                        onChange={setIin}
                        onKeyPress={handleIinKeyPress}
                        value={iin}
                        type="tel"
                    />
                    <AgreementTextStyled>
                        <Trans i18nKey="shared:auth.agreementText">
                            Отправляя свои данные, я соглашаюсь с
                            <a
                                href={`${process.env.STATIC_FILES_URL}/privacy_policy/Usloviya_predostavlenii_uslug.pdf`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Договором электронных банковских услуг
                            </a>
                            , даю согласие на
                            <a
                                href={`${process.env.STATIC_FILES_URL}/privacy_policy/Usloviya_predostavlenii_uslug.pdf`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                сбор и обработку персональных данных
                            </a>
                            , и ознакомлен с
                            <a
                                href={`${process.env.STATIC_FILES_URL}/privacy_policy/privacy_policy.pdf`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                «Политикой конфиденциальности»
                            </a>
                        </Trans>
                    </AgreementTextStyled>
                    {isWrongIin && <InfoBlock error={t('auth.invalidIin')} />}
                    {renderButton()}
                </LoginFormWrapperStyled>
            )}
            {step === 'NUMBER' && (
                <LoginFormWrapperStyled>
                    <BackLink onClick={goBack} />
                    <LabeledTextFieldMasked
                        id="phoneInput"
                        label={t('auth.numberLabel')}
                        maskOptions={{ mask: '+{7} (000) 000-00-00' }}
                        placeholder={t('auth.numberPlaceholder')}
                        onChange={setNumber}
                        onKeyPress={handleNumberKeyPress}
                        value={number}
                        type="tel"
                    />
                    <InfoBlock error={error} />
                    {isNumberWrong && <InfoBlock error={t('auth.invalidPhone')} />}
                    {renderButton()}
                </LoginFormWrapperStyled>
            )}
            {step === 'OTP' && (
                <LoginFormWrapperStyled>
                    <BackLink onClick={goBack} />
                    <OtpWrapper
                        initialMinute={1}
                        length={6}
                        onChange={setOtp}
                        resend={handleNext}
                    />
                    <InfoBlock error={error} />
                    <ButtonPrimary
                        id="otpConfirm"
                        fullWidth
                        title={t('otp.confirm')}
                        onClick={handleOtp}
                        loading={isLoading}
                    />
                </LoginFormWrapperStyled>
            )}
            {step === 'MASKED_PAN' && (
                <LoginFormWrapperStyled>
                    <BackLink onClick={goBack} />
                    <LabeledTextFieldMasked
                        label={t('auth.panLabel')}
                        maskOptions={{
                            mask: '00{•• •••• •••• }0000',
                            lazy: false
                        }}
                        placeholder="00•• •••• •••• 0000"
                        onChange={setPan}
                        value={pan}
                    />
                    <InfoBlock error={error} text={t('auth.panInfoText')} />
                    <ButtonPrimary
                        fullWidth
                        title={t('navigation.finish')}
                        onClick={handleLogin}
                        loading={isLoading}
                    />
                </LoginFormWrapperStyled>
            )}
            {(step === 'IIN' || showLinks) && <MobileLinks />}
        </LoginWrapperStyled>
    )
}

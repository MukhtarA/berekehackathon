import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { Headline5, Body2 } from '../typography'
import { Loader } from '../loader'

import { OtpInput } from './otp-input'
import { Timer } from './timer'
import { LinkStyled } from './style'

export const OtpWrapper = ({
    name,
    error,
    initialMinute,
    initialSeconds,
    length,
    resend,
    onChange,
    isLoading
}) => {
    const { t } = useTranslation('shared')
    const formikContext = useFormikContext()
    const ref = useRef(null)

    const handleOtpChange = useCallback(
        (value) => {
            if (formikContext) {
                formikContext.setFieldValue(name, value, true)
            }

            onChange(value)
        },
        [formikContext, onChange, name]
    )

    const handleResend = useCallback(() => {
        ref.current.resetTimer({ newMinutes: initialMinute, newSeconds: initialSeconds })

        resend(formikContext?.values)
    }, [initialSeconds, initialMinute, resend, formikContext?.values])

    return (
        <>
            <Headline5>{t('otp.description')}</Headline5>
            <OtpInput onChange={handleOtpChange} length={length} error={error} />
            {error && (
                <Body2 colorScheme="warning" verticalPadding="zero">
                    {error}
                </Body2>
            )}
            {isLoading ? (
                <Loader />
            ) : (
                <Timer initialMinute={initialMinute} initialSeconds={initialSeconds} ref={ref}>
                    <LinkStyled
                        size="md"
                        colorScheme="success"
                        onClick={handleResend}
                        title={t('otp.resend')}
                    />
                </Timer>
            )}
        </>
    )
}

OtpWrapper.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    initialMinute: PropTypes.number,
    initialSeconds: PropTypes.number,
    length: PropTypes.number,
    resend: PropTypes.func,
    onChange: PropTypes.func,
    isLoading: PropTypes.bool
}

OtpWrapper.defaultProps = {
    name: 'otp',
    error: '',
    initialMinute: 0,
    initialSeconds: 0,
    length: 4,
    isLoading: false,
    resend: () => {},
    onChange: () => {}
}

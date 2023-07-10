import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Loader as UILoader } from '@sbol/design-system/core/loader'
import { Alert } from '@sbol/design-system/core/alert'

import { AlertWrapperStyled, LoaderStyled } from './style'

export const Loader = () => (
    <LoaderStyled>
        <UILoader />
    </LoaderStyled>
)

export const Error = ({ error }) => (
    <AlertWrapperStyled>
        <Alert mode="warning" a11y={{ title: error }}>
            {error}
        </Alert>
    </AlertWrapperStyled>
)

Error.propTypes = {
    error: PropTypes.string.isRequired
}

export const Info = ({ text }) => (
    <AlertWrapperStyled>
        <Alert mode="info" a11y={{ title: text }}>
            {text}
        </Alert>
    </AlertWrapperStyled>
)

Info.propTypes = {
    text: PropTypes.string.isRequired
}

export default ({ status, error, children, data, errorText }) => {
    const { t } = useTranslation('shared')

    if (status === 'loading') {
        return <Loader />
    }

    if (status === 'failed') {
        return <Error error={error} />
    }

    if (status === 'succeeded' && _.isEmpty(data) && typeof data !== 'undefined') {
        return <Info text={errorText || t('info.noData')} />
    }

    return children
}

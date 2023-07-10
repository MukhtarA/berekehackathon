import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { LinkStyled } from './style'

export const BackButton = ({ title }) => {
    const { goBack } = useHistory()
    const { t } = useTranslation('shared')

    return (
        <LinkStyled
            onClick={goBack}
            iconName="icon:core/common/ic_24_arrow_left"
            fontWeight="semibold"
            title={title || t('navigation.back')}
        />
    )
}

BackButton.propTypes = {
    title: PropTypes.string
}

BackButton.defaultProps = {
    title: null
}

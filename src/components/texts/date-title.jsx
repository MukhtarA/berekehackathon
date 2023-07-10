import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { formatDate } from '../../utils'
import { DateTitleStyled } from './style'

export const DateTitle = ({ date }) => {
    const { t } = useTranslation('shared')

    return (
        <DateTitleStyled fontWeight="semibold">
            {date === formatDate(new Date()) ? t('info.today') : date}
        </DateTitleStyled>
    )
}

DateTitle.propTypes = {
    date: PropTypes.string.isRequired
}

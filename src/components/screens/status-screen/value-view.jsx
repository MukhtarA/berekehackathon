import React from 'react'
import PropTypes from 'prop-types'

import { formatDate, formatMoney, formatNumber } from '../../../utils'
import { CardValueStyled, CardIconStyled, ValueStyled, DescriptionStyled } from './style'

export const ValueView = ({ value, type }) => {
    const renderValue = () => {
        switch (type) {
            case 'account':
            case 'deposit':
            case 'card': {
                const { title, description, icon } = value

                return (
                    <CardValueStyled>
                        {icon && <CardIconStyled name={icon} />}

                        <ValueStyled>{title}</ValueStyled>
                        <DescriptionStyled colorScheme="tertiary">{description}</DescriptionStyled>
                    </CardValueStyled>
                )
            }
            case 'date':
                return <ValueStyled>{formatDate(value, 'dd.MM.yyyy')}</ValueStyled>
            case 'money':
                return (
                    <ValueStyled>
                        {typeof value === 'object'
                            ? formatMoney(value.value, { currency: value.currency })
                            : formatMoney(value)}
                    </ValueStyled>
                )
            case 'percent':
                return <ValueStyled>{`${formatNumber(value)}%`}</ValueStyled>
            default:
                return <ValueStyled>{value}</ValueStyled>
        }
    }

    return renderValue()
}

ValueView.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    icon: PropTypes.string
}

ValueView.defaultProps = {
    type: ''
}

import React from 'react'
import PropTypes from 'prop-types'
import { IconLoader } from '@sbol/design-system/core/icon'

import { formatMoney, formatNumber } from '../../utils'
import {
    TransactionCardStyled,
    IconStyled,
    IconWrapperStyled,
    CardWrapperStyled,
    CardContentStyled,
    TitleStyled,
    AdditionalStyled,
    AmountStyled,
    StatusStyled,
    CashBackStyled
} from './transaction.style'
import { handleStatusColorScheme, handleCashbackTitle } from './calculations'
import { FlexDivStyled } from './style'

const getAmount = (amount, currency) => {
    if (amount > 0) {
        return `+ ${formatMoney(amount, { currency })}`
    }

    return `- ${formatMoney(amount * -1, { currency })}`
}

export const TransactionCard = ({ title, description, amount, currency, status, cashback }) => {
    const mode = amount > 0 ? 'green' : 'black'
    const iconName = `icon:core/common/${
        mode === 'green' ? 'ic36CoinDown' : 'ic36ArrowRightTraceLine'
    }`

    return (
        <TransactionCardStyled mode={mode}>
            <IconStyled mode={mode}>
                <IconWrapperStyled mode={mode}>
                    <IconLoader name={iconName} colorScheme="noColor" />
                </IconWrapperStyled>
            </IconStyled>
            <CardWrapperStyled>
                <CardContentStyled>
                    <TitleStyled>{title}</TitleStyled>
                    <TitleStyled colorScheme="tertiary">{description}</TitleStyled>
                </CardContentStyled>
                <AdditionalStyled>
                    <AmountStyled mode={mode}>{getAmount(amount, currency)}</AmountStyled>
                    {cashback?.has && (
                        <FlexDivStyled>
                            <CashBackStyled
                                colorScheme={handleStatusColorScheme(cashback?.postStatus)}
                                indent="zero"
                            >
                                {`${handleCashbackTitle(cashback?.postStatus)}${formatNumber(
                                    cashback?.amount
                                )}`}
                            </CashBackStyled>
                            &nbsp;
                            <IconLoader name="icon:core/common/ic_16_cashback_coins" />
                        </FlexDivStyled>
                    )}
                    {status && <StatusStyled>{status}</StatusStyled>}
                </AdditionalStyled>
            </CardWrapperStyled>
        </TransactionCardStyled>
    )
}

TransactionCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    status: PropTypes.string,
    cashback: PropTypes.object
}

TransactionCard.defaultProps = {
    status: null,
    cashback: null
}

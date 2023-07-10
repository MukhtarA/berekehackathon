import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { pluralize } from '../utils/pluralize'

import { options, setCurrencyDisplayName } from './options'
import { CurrencyStyled } from './currency.style'

const hasFallback = (code) => _.has(options.display, _.lowerCase(code))
const hasSymbol = (code) => _.has(options.symbols, _.lowerCase(code))

const isSymbol = (code, mode) => {
    switch (mode) {
        case 'code':
        case 'word':
            return false
        case 'symbol':
            return hasSymbol(code)
        default:
            return !hasFallback(code) && hasSymbol(code)
    }
}

const getCurrencyValue = (code, mode = 'auto', value = 0) => {
    if (mode === 'code') {
        return code
    } else if ((mode === 'word' || mode === 'auto') && hasFallback(code)) {
        return pluralize(options.display[_.lowerCase(code)], value)
    } else if ((mode === 'symbol' || mode === 'auto') && hasSymbol(code)) {
        return options.symbols[_.lowerCase(code)]
    }

    return code
}

export const Currency = ({
    value = 1,
    title = void 0,
    mode = 'auto',
    size = 'md',
    verticalMargin = 'zero',
    verticalPadding = 'zero',
    fontWeight = 'regular',
    ...props
}) => {
    const passedProps = _.omit({ value, title, mode, size, ...props }, [
        'value',
        'currencyCode',
        'asSymbol',
        'mode',
        'size',
        'verticalMargin',
        'verticalPadding',
        'title',
        'fontWeight'
    ])

    return (
        <CurrencyStyled
            {...passedProps}
            isSymbol={isSymbol(title, mode)}
            size={size}
            verticalMargin={verticalMargin}
            verticalPadding={verticalPadding}
            fontWeight={fontWeight}
        >
            {getCurrencyValue(title, mode, value)}
        </CurrencyStyled>
    )
}

Currency.propTypes = {
    /**
     * Только для mode="auto" или "word" с Currency.setCurrencyDisplayName
     */
    value: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'h1', 'h2', 'h3', 'h4', 'h5']),
    mode: PropTypes.oneOf(['auto', 'symbol', 'word', 'code']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalPadding: PropTypes.oneOf([
        'open',
        'inner',
        'micro',
        'nano',
        'zero'
    ]),
    fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular'])
}

Currency.options = options
Currency.setCurrencyDisplayName = setCurrencyDisplayName
Currency.getCurrencyValue = getCurrencyValue

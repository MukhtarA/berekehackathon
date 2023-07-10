import _ from 'lodash'
import BigNumber from 'bignumber.js'

import { symbols } from '../currency/locales'

const configRuLocale = {
    prefix: '',
    decimalSeparator: ',',
    groupSeparator: ' ',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
}
const Currency = BigNumber
const DECIMAL_FORMAT = 2
Currency.config({
    FORMAT: configRuLocale
})

export const numberFormatter = (content) => {
    if (!_.isFinite(parseFloat(content))) {
        return ''
    }
    return new Currency(parseFloat(content)).toFormat(DECIMAL_FORMAT)
}

export const currencySymbol = (x) => {
    if (_.isNil(x)) {
        return ''
    }
    const lowerCaseX = x.toLowerCase()
    if (_.isNil(symbols[lowerCaseX])) {
        return x
    }
    return `<span>${symbols[lowerCaseX]}</span>`
}

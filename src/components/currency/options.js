import _ from 'lodash'

import { symbols } from './locales'

export const options = {
    symbols,
    display: {}
}

export const setCurrencyDisplayName = (currencyCode, currencyNames) => {
    let names = currencyNames

    if (_.isString(currencyNames)) {
        names = [currencyNames, currencyNames, currencyNames]
    }
    
    options.display[_.lowerCase(currencyCode)] = names
}

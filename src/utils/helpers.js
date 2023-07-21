import { format, parseISO, formatRelative, isValid } from 'date-fns'
import _ from 'lodash'

import {
    maximumFractionDigits,
    minimumFractionDigits,
    panSliceCharsNumber,
    ibanFirstCharsNumber,
    ibanSliceCharsNumber,
    CURRENCY_SYMBOLS
} from '../constants/currency'
import { getLanguage } from '../components/auth'

const ruLocale = require('date-fns/locale/ru').default
const enLocale = require('date-fns/locale/en-GB').default
const kkLocale = require('date-fns/locale/kk').default

export const getRelativeLocale = () => {
    const language = getLanguage()

    if (language === 'en') {
        return {
            ...enLocale,
            formatRelative: (token) =>
                ({
                    lastWeek: 'dd MMMM yyyy',
                    yesterday: "'yesterday' • HH:mm",
                    today: "'today' • HH:mm",
                    tomorrow: 'dd MMMM yyyy',
                    nextWeek: 'dd MMMM yyyy',
                    other: 'dd MMMM yyyy'
                }[token])
        }
    } else if (language === 'kk') {
        return {
            ...kkLocale,
            formatRelative: (token) =>
                ({
                    lastWeek: 'dd MMMM yyyy',
                    yesterday: "'кеше' • HH:mm",
                    today: "'бүгін' • HH:mm",
                    tomorrow: 'dd MMMM yyyy',
                    nextWeek: 'dd MMMM yyyy',
                    other: 'dd MMMM yyyy'
                }[token])
        }
    }

    return {
        ...ruLocale,
        formatRelative: (token) =>
            ({
                lastWeek: 'dd MMMM yyyy',
                yesterday: "'вчера' • HH:mm",
                today: "'сегодня' • HH:mm",
                tomorrow: 'dd MMMM yyyy',
                nextWeek: 'dd MMMM yyyy',
                other: 'dd MMMM yyyy'
            }[token])
    }
}

export const getLocale = () => {
    const language = getLanguage()

    if (['en', 'EN'].includes(language)) {
        return enLocale
    } else if (['kk', 'KK'].includes(language)) {
        return kkLocale
    }

    return ruLocale
}

/**
 * @param date - экземпляр объекта Date, если же дата пришла в текстовом формате
 * то идет попытка преобразования в объект
 * @param dateFormat - формат даты
 * @return string - форматированный текст в формате 27 май 2020
 */

export const formatDate = (date, dateFormat = 'dd MMM yyyy') => {
    if (_.isDate(date)) {
        return format(date, dateFormat, { locale: getLocale() })
    }

    if (isValid(new Date(date))) {
        return format(parseISO(date), dateFormat, { locale: getLocale() })
    }

    return date
}

/**
 * @param date - экземпляр объекта Date, если же дата пришла в текстовом формате
 * то идет попытка преобразования в объект
 * @param baseDate - дата для сравнения
 * @param options - дополнительные параметры формата
 * @return string - форматированный текст в формате вчера/сегодня • 18:41 или 27 май 2020
 */

export const formatRelativeDate = (date, baseDate, options) => {
    if (_.isDate(date)) {
        return formatRelative(date, baseDate, { locale: getRelativeLocale(), ...options })
    }

    return formatRelative(parseISO(date), baseDate, { locale: getRelativeLocale(), ...options })
}

export const capitalizeString = (inputString) => {
    if (inputString.length < 1) {
        return inputString
    }

    if (inputString.length === 1) {
        return inputString.toUpperCase()
    }

    return `${inputString.charAt(0).toUpperCase()}${inputString.substr(1).toLowerCase()}`
}

/**
 * @param number - курс валюты цифровом представлении
 * @param options - дополнительные параметры формата
 * @return string - форматированное число в формате 4 444,55 (количество знаков после запятой определяется
 * переменной maximumFractionDigits), если аргумент не является числом, возвращается null
 */

export const formatNumber = (number, options = {}) => {
    try {
        return new Intl.NumberFormat('kk-KZ', {
            minimumFractionDigits,
            maximumFractionDigits,
            ...options
        }).format(number)
    } catch (e) {
        return null
    }
}

/**
 * @param number - число
 * @param options - параметры форматирования
 * @param options.currency - код валюты
 * @return string - форматированный текст в формате 11 911 ₸
 */

export const formatMoney = (number, options = { currency: 'KZT', maximumFractionDigits: 2 }) => {
    return !isNaN(Number(number))
        ? `${formatNumber(number, options)} ${
              CURRENCY_SYMBOLS[options.currency] || options.currency || CURRENCY_SYMBOLS.KZT
          }`
        : '-'
}

export const formatMoneyNoDigits = (number, options = { currency: 'KZT' }) => {
    if (isNaN(Number(number))) {
        return '-'
    }

    return number % 1 === 0
        ? `${formatNumber(number, {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              ...options
          })} ${CURRENCY_SYMBOLS[options.currency] || options.currency || CURRENCY_SYMBOLS.KZT}`
        : formatMoney(number, options)
}

export const isNumeric = (str) => /^\d+$/.test(str)

/**
 * @param phoneNumber - строка номера без цифр 77771234567
 * @return string - форматированный текст в формате +7 777 123 45 57
 */

export const formatPhoneSpaces = (phoneNumber) => {
    if (String(phoneNumber).length < 11 || !isNumeric(phoneNumber)) {
        return phoneNumber
    }

    const match = String(phoneNumber).match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)

    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
}

export const formatPhoneMasked = (phoneNumber) => {
    if (String(phoneNumber).length < 11 || !isNumeric(phoneNumber)) {
        return phoneNumber
    }

    const match = String(phoneNumber).match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)

    return `+${match[1]} (${match[2]}) *** ${match[4]}-${match[5]}`
}

export const handlePending = (state) => {
    state.status = 'loading'
    state.error = null
}

export const handleRejected = (state, action) => {
    if (state.status === 'loading') {
        state.status = 'failed'
        state.error = action.error.message
    }
}

export const formatApiDate = (date) => formatDate(date, 'yyyy-MM-dd')

export const formatPan = (pan) => `•••• ${pan.slice(panSliceCharsNumber)}`

export const formatIban = (iban) =>
    `${iban.slice(0, ibanFirstCharsNumber)} •• ${iban.slice(ibanSliceCharsNumber)}`

export const isCompanyClient = (clientType) => {
    return clientType === 'CR' || clientType === 'CNR'
}

export const prepareOption = (data, key) => {
    const getAmount = (value) => _.get(value, 'balances[0].balAmt')

    if (!data) {
        return {}
    }

    if (key === 'cards') {
        const icon = `icon:core/cards/mc-36-${
            data?.pan[0] === '4' ? 'visa-logo' : 'mastercard-logo'
        }`

        return {
            data,
            value: data.rbs,
            sourceType: 'CARD',
            title: data.alias,
            description: formatPan(data.pan),
            balance: getAmount(data),
            additional: formatMoney(getAmount(data), {
                currency: data.contract.currency
            }),
            icon
        }
    }

    if (key === 'accounts') {
        return {
            data,
            value: data.iban,
            sourceType: 'ACCOUNT',
            title: data.alias,
            description: formatIban(data.iban),
            additional: formatMoney(getAmount(data), {
                currency: data.currency
            }),
            icon: 'icon:core/cards/mc-36-default'
        }
    }

    if (key === 'deposits') {
        return {
            data,
            value: data.iban,
            sourceType: 'DEPOSIT',
            title: data.alias,
            description: formatIban(data.iban),
            additional: formatMoney(getAmount(data), {
                currency: data.currency
            }),
            icon: 'icon:core/common/mc_36_safe_alt1'
        }
    }

    return data
}

export const lastWeekDate = (today) => {
    const oneWeek = 7

    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - oneWeek)
}

export const previousMonthDate = (today) => {
    const oneMonth = 1

    return new Date(today.getFullYear(), today.getMonth() - oneMonth, today.getDate())
}

export const formatApiDateToSeconds = (date) => formatDate(date, "yyyy-MM-dd'T'HH:mm:ss")

/**
 * @param sourceCurrencyRate - значение курса валюты счета списания
 * @param sourceCurrency - валюта счета списания
 * @param destinationCurrencyRate - значение курса валюты счета зачисления
 * @param destinationCurrency - валюта счета зачисления
 * @return string - сравнение валют (за единичное сравнение берется валюта с наибольшим значением)
 */

export const getCurrencyComparison = (
    sourceCurrencyRate,
    sourceCurrency,
    destinationCurrencyRate,
    destinationCurrency
) => {
    if (!sourceCurrencyRate) {
        return `${formatMoney(1, {
            currency: destinationCurrency
        })} = ${formatMoney(destinationCurrencyRate?.sell)}`
    }

    if (!destinationCurrencyRate) {
        return `${formatMoney(1, {
            currency: sourceCurrency
        })} = ${formatMoney(sourceCurrencyRate?.buy)}`
    }

    if (sourceCurrencyRate?.sell > destinationCurrencyRate?.sell) {
        return `${formatMoney(1, {
            currency: sourceCurrency
        })} = ${formatMoney(sourceCurrencyRate?.buy / destinationCurrencyRate?.sell, {
            currency: destinationCurrency
        })}`
    }

    return `${formatMoney(1, {
        currency: destinationCurrency
    })} = ${formatMoney(destinationCurrencyRate.sell / sourceCurrencyRate.buy, {
        currency: sourceCurrency
    })}`
}

/**
 * @param sourceItem - объект селекта счета списания
 * @param destinationItem - объект селекта счета зачисления
 * @param amount - введеная сумма и валюта { value, currency }
 * @return object - параметры для отправки к API
 */

export const getParams = (sourceItem, destinationItem, amount) => {
    let params = {
        amount: +amount.value,
        currency: amount.currency
    }

    if (sourceItem.sourceType === 'CARD') {
        params = { ...params, rbsFrom: _.get(sourceItem, 'data.rbs'), type: 'card2' }
    } else if (sourceItem.sourceType === 'DEPOSIT') {
        params = { ...params, ibanFrom: _.get(sourceItem, 'data.iban'), type: 'deposit2' }
    } else {
        params = { ...params, ibanFrom: _.get(sourceItem, 'data.iban'), type: 'acc2' }
    }

    if (destinationItem.sourceType === 'CARD') {
        params = {
            ...params,
            rbsTo: _.get(destinationItem, 'data.rbs'),
            type: `${params.type}card`
        }
    } else {
        params = {
            ...params,
            ibanTo: _.get(destinationItem, 'data.iban'),
            type: `${params.type}acc`
        }
    }

    return params
}

export function excerptText(str = '', minLength = 25) {
    return str.length > minLength ? `${str.substring(0, minLength)}...` : str
}

export const requestId = () => {
    const random = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return `${
        random() + random()
    }-${random()}-${random()}-${random()}-${random()}${random()}${random()}`
}

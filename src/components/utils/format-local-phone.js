import IMask from 'imask'

import defaultCodes from '../text-field/local-phone/phone-codes.json'

const DEFAULT_MASK_LENGTH = 3
const phonesMasks = {
    3: '+7 (000) ???-??-??',
    4: '+7 (0000) ???-???',
    5: '+7 (00000) ???-??',
    6: '+7 (000000) ??-??',
    7: '+7 (0000000) ??-?'
}

const defaultDefinitions = {
    '?': /[\d|•]/
}

export const makeLocalPhoneMask = (value = '', codes = defaultCodes, definitions = defaultDefinitions) => {
    let maxMask = DEFAULT_MASK_LENGTH
    codes.forEach((code) => {
        if ((value.startsWith(`7${code}`) || value.startsWith(code)) && maxMask < code.length) {
            maxMask = code.length
        }
    })

    return {
        mask: phonesMasks[maxMask] || phonesMasks[DEFAULT_MASK_LENGTH],
        definitions
    }
}

export const formatLocalPhone = (value = '', codes, definitions) =>
    IMask.pipe(value.toString(), makeLocalPhoneMask(value, codes, definitions))

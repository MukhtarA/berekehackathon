import { makeMoneyMask } from '../../utils'

function escapeRegExp (str) {
    return str.replace(/([!$()*+./:=?[\\\]^{|}])/g, '\\$1')
}

export const makeFieldMoneyMask = ({
    radix = ',',
    thousandsSeparator = ' ',
    signed,
    ...rest
} = {}) => {
    const defaultMoneyMask = makeMoneyMask({ radix, thousandsSeparator, signed, ...rest })

    return {
        ...defaultMoneyMask,
        padFractionalZeros: false,
        normalizeZeros: false,
        // override default
        commit (unmaskedValue, masked) {
            if ((signed && unmaskedValue.endsWith('-')) || unmaskedValue.endsWith(radix) || unmaskedValue.endsWith(radix + 0)) {
                return
            }
            // remove thousands separators
            const parts = unmaskedValue.replace(new RegExp(escapeRegExp(thousandsSeparator), 'g'), '').split(radix)

            // remove leading zeros
            parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num)
            // add leading zero
            if (unmaskedValue.length && !/\d$/.test(parts[0])) {
                parts[0] += '0'
            }

            if (parts.length > 1) {
                // remove trailing zeros
                parts[1] = parts[1].replace(/0*$/, '')
                // remove fractional
                if (!parts[1].length) {
                    parts.length = 1
                }
            }
            // insert thousands separators
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)

            masked._value = parts.join(radix)
        }
    }
}

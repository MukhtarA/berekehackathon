import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import { TextFieldMasked } from '../masked'
import { Currency } from '../../currency'
import { withLabel } from '../../labeled'

import { makeFieldMoneyMask } from './make-field-money-mask'

export const TextFieldMoney = ({
    currency: { title, mode = 'symbol', value: currencyValue },
    maskOptions = {},
    ...props
}) => {
    const mask = useMemo(() => makeFieldMoneyMask(maskOptions), [maskOptions])

    const getCurrencyMask = useCallback(() => ({
        mask: [
            { ...mask, mask: Number },
            {
                mask: `num ${Currency.getCurrencyValue(title, mode, currencyValue)}`.trim(),
                lazy: false,
                blocks: {
                    num: mask,
                }
            },
        ],
        dispatch (appended, dynamicMasked) {
            if ((dynamicMasked.value + appended).replace(/\D/g, '')) {
                return dynamicMasked.compiledMasks[1]
            }
            return dynamicMasked.compiledMasks[0]
        }
    }), [title, mode, currencyValue, maskOptions])

    return (
        <TextFieldMasked
            inputMode={maskOptions?.signed ? 'text' : 'decimal'}
            {...props}
            maskOptions={getCurrencyMask()}
        />
    )
}

TextFieldMoney.propTypes = {
    currency: PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string,
        mode: PropTypes.oneOf(['auto', 'symbol', 'word', 'code']),
    }),
    /**
     * Mask of TextField. For details see: react-imask package
     */
    maskOptions: PropTypes.shape({
        // digits after point, 0 for integers
        scale: PropTypes.number,
        // disallow negative
        signed: PropTypes.bool,
        // any single char
        thousandsSeparator: PropTypes.string,
        // fractional delimiter
        radix: PropTypes.string,
        // symbols to process as radix
        mapToRadix: PropTypes.arrayOf(PropTypes.string),
        // additional number interval options (e.g.)
        min: PropTypes.number,
        max: PropTypes.number
    }),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    value: PropTypes.string
}

export const LabeledTextFieldMoney = withLabel(TextFieldMoney)

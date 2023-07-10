import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { TextFieldMasked } from '../masked'
import { makeLocalPhoneMask } from '../../utils/format-local-phone'
import { withLabel } from '../../labeled'

const definitions = {
    '?': /\d/
}

const MASK_SYMBOL = '•'
const EMPTY_STRING = ''

const isMasked = (phone) => phone.includes(MASK_SYMBOL)

export const TextFieldLocalPhone = ({ onChange = noop, suggest, value = '', ...rest }) => {
    const handleOnChange = useCallback((phone) => {
        if (isMasked(phone)) {
            onChange(EMPTY_STRING)
        } else {
            onChange(phone)
        }
    }, [value])

    return (
        <TextFieldMasked
            {...rest}
            value={value}
            onChange={handleOnChange}
            maskOptions={isMasked(value) ?
                makeLocalPhoneMask(value, suggest) :
                makeLocalPhoneMask(value, suggest, definitions)}
            placeholder="+7 (___) ___-__-__"
            type="tel"
        />
    )
}

TextFieldLocalPhone.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    suggest: PropTypes.arrayOf(PropTypes.string)
}

export const LabeledTextFieldLocalPhone = withLabel(TextFieldLocalPhone)

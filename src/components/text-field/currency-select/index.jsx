import React from 'react'
import PropTypes from 'prop-types'

import { Currency } from '../../currency'

import { SegmentedRadioStyled, SegmentedGroupStyled } from './currency-select.style'

export const CurrencySelect = ({ readonly, options, value, onChange, name, disabled }) => {
    if (readonly) {
        return null
    }

    return (
        <SegmentedGroupStyled>
            {options.map((option) => (
                <SegmentedRadioStyled
                    key={option.value}
                    title={option.title}
                    value={option.value}
                    translations={{ title: option.title }}
                    onChange={onChange}
                    a11y={{ title: option.title }}
                    checked={value === option.value}
                    name={name}
                    size="md"
                    disabled={disabled}
                >
                    {Currency.options.symbols[option.value.toLowerCase()] ? (
                        <Currency mode="symbol" title={option.value.toLowerCase()} />
                    ) :
                        option.value
                    }
                </SegmentedRadioStyled>
            ))}
        </SegmentedGroupStyled>
    )
}

CurrencySelect.propTypes = {
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}


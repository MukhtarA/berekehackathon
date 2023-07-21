import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { CurrencySelect } from '../text-field'
import { Caption, Typography } from '../typography'

import MoneyInput from './money-input'
import { CommissionStyled } from './style'

const CurrencyInput = ({
    name,
    label,
    description,
    descriptionAdditional,
    options,
    onChange,
    checked,
    conversion,
    ...props
}) => {
    const [currencyField] = useField(`${name}.currency`)

    const handleOnChange = useCallback(
        (value) => {
            onChange({ value, currency: currencyField.value })
        },
        [currencyField.value, onChange]
    )

    return (
        <>
            <MoneyInput
                name={`${name}.value`}
                label={label}
                currency={{ title: currencyField.value, mode: 'symbol' }}
                additionalChild={
                    options && (
                        <CurrencySelect {...currencyField} value={checked} options={options} />
                    )
                }
                onChange={handleOnChange}
                {...props}
            />
            {conversion && (
                <Caption indent="zero" colorScheme="tertiary">
                    {'~'} {conversion}
                </Caption>
            )}
            {(description || descriptionAdditional) && !props.viewOnly && (
                <CommissionStyled>
                    {description && <Typography verticalMargin="zero">{description}</Typography>}
                    {descriptionAdditional && (
                        <Caption colorScheme="secondary">{descriptionAdditional}</Caption>
                    )}
                </CommissionStyled>
            )}
        </>
    )
}

CurrencyInput.propTypes = {
    viewOnly: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    descriptionAdditional: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            title: PropTypes.string
        })
    ),
    onChange: PropTypes.func,
    checked: PropTypes.string,
    conversion: PropTypes.string
}

CurrencyInput.defaultProps = {
    viewOnly: false,
    description: '',
    descriptionAdditional: '',
    options: null,
    onChange: () => {},
    checked: null,
    conversion: null
}

export default CurrencyInput

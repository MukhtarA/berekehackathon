import React, { useCallback, useReducer } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

import { LabeledTextFieldMoney } from './text-field/money'
import { Currency } from './currency'

import { formatMoneyNoDigits } from '@web_sbol/shared/src/utils'
import ViewLabel from './view-label'

const MoneyInput = ({ label, description, onChange, viewOnly, commission, ...props }) => {
    const [field, meta, helpers] = useField(props)
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    const error = meta.touched ? meta.error : ''
    const { t } = useTranslation('shared')

    // TODO: если где-то сломает, то вернуть на место useEffect
    Currency.setCurrencyDisplayName('kzt', 'tenge')
    Currency.options.symbols.kzt = '₸'

    // useEffect(() => {
    //     Currency.setCurrencyDisplayName('kzt', 'tenge')
    //     Currency.options.symbols.kzt = '₸'
    //     forceUpdate()
    // }, [])

    const handleChange = useCallback(
        (value) => {
            helpers.setTouched()
            helpers.setValue(value)
            onChange(value)
        },
        [helpers, onChange]
    )
    const formattedCommission = commission
        ? formatMoneyNoDigits(commission, { currency: props.currency.title })
        : null
    const conditionalDescription = commission
        ? `${t('field.commission')} ${formattedCommission}`
        : description

    if (viewOnly) {
        return (
            <>
                <ViewLabel label={label} fontWeight="semibold">
                    {field.value
                        ? formatMoneyNoDigits(field.value, { currency: props.currency.title })
                        : '-'}
                </ViewLabel>

                {commission && (
                    <ViewLabel label={t('field.commission')}>{formattedCommission}</ViewLabel>
                )}
            </>
        )
    }

    return (
        <LabeledTextFieldMoney
            label={label}
            description={error ? '' : conditionalDescription}
            error={error}
            {...field}
            {...props}
            onChange={handleChange}
        />
    )
}

MoneyInput.propTypes = {
    viewOnly: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    onChange: PropTypes.func,
    maskOptions: PropTypes.shape({
        // digits after point, 0 for integers
        scale: PropTypes.number,
        // disallow negative
        signed: PropTypes.boolean,
        // any single char
        thousandsSeparator: PropTypes.string,
        // if true, then pads zeros at end to the length of scale
        padFractionalZeros: PropTypes.boolean,
        // appends or removes zeros at ends
        normalizeZeros: PropTypes.boolean,
        // fractional delimiter
        radix: PropTypes.string,
        // symbols to process as radix
        mapToRadix: PropTypes.arrayOf(PropTypes.string),
        // additional number interval options (e.g.)
        min: PropTypes.number,
        max: PropTypes.number
    }),
    currency: PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string,
        mode: PropTypes.oneOf(['auto', 'symbol', 'word', 'code'])
    }),
    commission: PropTypes.number
}

MoneyInput.defaultProps = {
    viewOnly: false,
    description: '',
    onChange: () => {},
    maskOptions: {
        padFractionalZeros: false,
        scale: 2,
        mask: Number,
        radix: '.'
    },
    currency: { title: 'KZT', mode: 'symbol' },
    commission: null
}

export default MoneyInput

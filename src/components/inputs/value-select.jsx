import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import {
    LabeledValueSelect,
    ValueOption,
    ValueSubheader
} from './value-select'
import { Caption } from './typography'

import ViewLabel from './view-label'

const ValueSelect = ({ name, options, onChange, viewOnly, type, requisites, ...props }) => {
    const [field, meta, helpers] = useField({ name })
    const totalPaymentAmount = useField({ name: 'totalPaymentAmount' })
    const commissionField = useField({ name: 'commission' })
    const { t } = useTranslation()

    const actionRoute = _.get(requisites?.data, 'action.route', '')
    const isAutoPayment = ['AUTOPAY_CREATE_SAVE', 'AUTOPAY_EDIT_SAVE'].includes(actionRoute)
    const selectedSource =
        field.name === 'source' && options.find((option) => option.value === field.value)
    const totalAmountValueWithCommission = commissionField[0].value
        ? parseFloat(totalPaymentAmount[0].value) + parseFloat(commissionField[0].value)
        : parseFloat(totalPaymentAmount[0].value)

    const handleChange = useCallback(
        (value) => {
            helpers.setTouched(value)
            helpers.setValue(value)
            onChange(value, _.find(options, { value }))
        },
        [helpers, onChange, options]
    )

    if (viewOnly) {
        const selectedOption = _.find(options, ['value', field.value])
        const displayValue =
            type === 'list'
                ? selectedOption?.title
                : `${selectedOption?.title} ${selectedOption?.description}`

        return (
            <ViewLabel label={props.label} fontWeight="semibold">
                {displayValue || field.value || '-'}
            </ViewLabel>
        )
    }

    return (
        <>
            <LabeledValueSelect
                error={meta.touched ? meta.error : ''}
                translations={{ placeholder: t('common:validation.select') }}
                {...field}
                {...props}
                onChange={handleChange}
            >
                {options.map(({ value, title, isSubheader, ...rest }) =>
                    isSubheader ? (
                        <ValueSubheader key={title} title={t(title)} />
                    ) : (
                        <ValueOption key={value} value={value} title={title} {...rest} />
                    )
                )}
            </LabeledValueSelect>
            {totalAmountValueWithCommission > selectedSource?.amount && !isAutoPayment && (
                <Caption indent="zero" colorScheme="warning">
                    {t('payments:payments.notEnough')}
                </Caption>
            )}
        </>
    )
}

ValueSelect.propTypes = {
    viewOnly: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    requisites: PropTypes.array.isRequired,
    options: PropTypes.array,
    onChange: PropTypes.func,
    type: PropTypes.string
}

ValueSelect.defaultProps = {
    viewOnly: false,
    options: [],
    onChange: () => null,
    type: null
}

export default ValueSelect

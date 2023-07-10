import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { isEmpty } from 'lodash'
import { LabeledTextField } from '@sbol/design-system/core/text-field'

import ViewLabel from './view-label'
import { formatMoney } from '../../utils'

const CommissionInput = ({
    label,
    description,
    viewOnly,
    max,
    comment,
    calculation,
    enteredData,
    ...props
}) => {
    const { t } = useTranslation('shared')
    const [field, meta, helpers] = useField(props)
    const totalPaymentAmount = useField({ name: 'totalPaymentAmount' })
    const error = meta.touched ? meta.error : ''
    const totalPaymentAmountValue = +totalPaymentAmount[0].value

    const conditionalDescription = () => {
        if (max) {
            return t('input.max', { count: max - field.value.length })
        }

        if (comment) {
            return comment
        }

        return description
    }

    const getCommissionValue = () => {
        if (
            totalPaymentAmountValue === 0 &&
            (parseFloat(enteredData.value) <= 0 || !enteredData?.value)
        ) {
            return 0
        }

        if (
            !isEmpty(calculation?.rules) &&
            typeof totalPaymentAmountValue === 'number' &&
            totalPaymentAmountValue !== 0
        ) {
            const calcRule = calculation.rules.find((rule) => {
                return (
                    totalPaymentAmountValue >= rule?.minEnteredValue &&
                    totalPaymentAmountValue <= rule?.maxEnteredValue
                )
            })
            const { minCalculatedValue, maxCalculatedValue, rate } = calcRule || {}
            const calcValue = totalPaymentAmountValue * rate

            if (calcValue > minCalculatedValue && calcValue < maxCalculatedValue) {
                return calcValue
            }

            if (calcValue < minCalculatedValue) {
                return minCalculatedValue
            }

            if (calcValue > maxCalculatedValue) {
                return maxCalculatedValue
            }
        }

        return +field.value
    }

    useEffect(() => {
        if (typeof totalPaymentAmountValue === 'number') {
            helpers.setValue(getCommissionValue())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPaymentAmountValue])

    if (viewOnly) {
        return (
            <ViewLabel label={label} fontWeight="semibold">
                {formatMoney(field.value) || '-'}
            </ViewLabel>
        )
    }

    return (
        <LabeledTextField
            label={label}
            description={!error && conditionalDescription()}
            error={error}
            value={formatMoney(field.value)}
            {...props}
        />
    )
}

CommissionInput.propTypes = {
    viewOnly: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    max: PropTypes.number,
    comment: PropTypes.string,
    calculation: PropTypes.object.isRequired,
    enteredData: PropTypes.object.isRequired
}

CommissionInput.defaultProps = {
    viewOnly: false,
    max: null,
    description: '',
    comment: ''
}

export default CommissionInput

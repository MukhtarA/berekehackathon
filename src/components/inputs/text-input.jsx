import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { LabeledTextField } from '../text-field'

import ViewLabel from './view-label'

const TextInput = ({
    name,
    label,
    description,
    onChange,
    viewOnly,
    max,
    comment,
    calculationResult,
    ...props
}) => {
    const { t } = useTranslation('shared')
    const [field, meta, helpers] = useField({ name, ...props })
    const error = meta.touched ? meta.error : ''
    const conditionalDescription = () => {
        if (max) {
            return t('input.max', { count: max - field.value.length })
        }

        if (comment) {
            return comment
        }

        return description
    }

    const handleChange = useCallback(
        (value) => {
            helpers.setTouched()

            if (!max || (max && value.length <= max)) {
                helpers.setValue(value)
                onChange(value)
            }
        },
        [helpers, max, onChange]
    )

    useEffect(() => {
        if (calculationResult) {
            helpers.setValue(calculationResult.toString())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculationResult])

    if (viewOnly) {
        return (
            <ViewLabel label={label} fontWeight="semibold">
                {field.value || '-'}
            </ViewLabel>
        )
    }

    return (
        <LabeledTextField
            {...props}
            {...field}
            name={name}
            label={label}
            description={!error && conditionalDescription()}
            error={error}
            onChange={handleChange}
        />
    )
}

TextInput.propTypes = {
    viewOnly: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    calculationResult: PropTypes.number,
    description: PropTypes.string,
    max: PropTypes.number,
    comment: PropTypes.string
}

TextInput.defaultProps = {
    viewOnly: false,
    onChange: () => null,
    max: null,
    description: '',
    comment: '',
    calculationResult: null
}

export default TextInput

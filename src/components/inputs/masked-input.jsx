import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { createMask } from 'imask'
import { LabeledTextFieldMasked } from '@sbol/design-system/core/text-field/masked'

import ViewLabel from './view-label'

const defaultMasks = {
    tel: { mask: '+{7} (000) 000-00-00', lazy: false }
}

const MaskedInput = ({
    label,
    description,
    onChange,
    viewOnly,
    isHidden,
    customMask,
    ...props
}) => {
    const [field, meta, helpers] = useField(props)

    const handleChange = useCallback(
        (value) => {
            helpers.setValue(value)
            onChange(value)
        },
        [helpers, onChange]
    )

    if (viewOnly) {
        const mask = createMask(defaultMasks[props.type])

        return isHidden ? null : (
            <ViewLabel label={label} fontWeight="semibold">
                {field.value ? mask.resolve(field.value) : '-'}
            </ViewLabel>
        )
    }

    return (
        <LabeledTextFieldMasked
            label={label}
            description={description}
            error={meta.touched ? meta.error : ''}
            maskOptions={customMask || defaultMasks[props.type]}
            {...field}
            {...props}
            onChange={handleChange}
        />
    )
}

MaskedInput.propTypes = {
    viewOnly: PropTypes.bool,
    isHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(['tel', 'number']),
    customMask: PropTypes.object
}

MaskedInput.defaultProps = {
    viewOnly: false,
    isHidden: false,
    description: '',
    onChange: () => {},
    type: null,
    customMask: null
}

export default MaskedInput

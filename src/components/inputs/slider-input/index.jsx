import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'

import { LabeledSliderStyled } from './style'

export const SliderInput = ({ label, suffix, min, startValue, max, onChange, ...props }) => {
    const [field, _, helpers] = useField(props)

    const handleChange = useCallback(
        (value) => {
            helpers.setValue(value)
            onChange(value)
        },
        [helpers, onChange]
    )

    return (
        <LabeledSliderStyled
            label={label}
            suffix={suffix}
            min={min}
            max={max}
            step={1}
            transitionDuration={0}
            onChange={handleChange}
            value={field.value ?? startValue}
            {...props}
        />
    )
}

SliderInput.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    startValue: PropTypes.number,
    label: PropTypes.string,
    suffix: PropTypes.string,
    onChange: PropTypes.func
}

SliderInput.defaultProps = {
    label: null,
    suffix: null,
    startValue: 0,
    onChange: () => null
}

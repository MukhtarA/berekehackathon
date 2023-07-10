import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import Checkbox from '@sbol/design-system/core/selection/checkbox/checkbox'
import { Caption } from '@sbol/design-system/core/typography'

export const CheckboxInputField = ({ children, ...props }) => {
    const [field, meta, helpers] = useField(props)
    const error = meta.touched ? meta.error : ''

    useEffect(() => {
        helpers.setTouched(false, false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = useCallback(
        (value) => {
            helpers.setValue(value)
            helpers.setTouched(value, true)
        },
        [helpers]
    )

    return (
        <>
            <Checkbox {...field} {...props} type="checkbox" onChange={handleChange} error={error}>
                {children}
            </Checkbox>
            {error && (
                <Caption indent="zero" colorScheme="warning">
                    {error}
                </Caption>
            )}
        </>
    )
}

CheckboxInputField.propTypes = {
    children: PropTypes.node.isRequired
}

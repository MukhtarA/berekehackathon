import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { CalendarTime } from '@sbol/design-system'

import { ViewLabel } from '@web_sbol/shared/src/components/inputs'
import { formatDate } from '../../utils'

export const CalendarTimeInput = ({ label, viewOnly, ...props }) => {
    const [field, meta, helpers] = useField({ ...props })
    const error = meta.touched ? meta.error : ''
    const timeArray = field.value && field.value.split(':')
    const time = field.value ? new Date(0, 0, 0, ...timeArray).toISOString() : null

    const handleChange = useCallback(
        (value) => {
            if (!value) {
                return
            }
            const date = new Date(value)
            helpers.setTouched(value)
            helpers.setValue(formatDate(date, 'HH:mm'))
        },
        [helpers]
    )

    if (viewOnly) {
        return (
            <ViewLabel label={label} fontWeight="semibold">
                {field.value || '-'}
            </ViewLabel>
        )
    }

    return (
        <CalendarTime {...props} date={time} onChange={handleChange} label={label} error={error} />
    )
}

CalendarTimeInput.propTypes = {
    enteredData: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    viewOnly: PropTypes.bool
}

CalendarTimeInput.defaultProps = {
    viewOnly: false
}

import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { LabeledAutocomplete } from '@sbol/design-system/core/autocomplete'
import { ValueOption, ValueSubheader } from '@sbol/design-system/core/value-select'

import ViewLabel from './view-label'

const Autocomplete = ({ name, options, onChange, viewOnly, ...props }) => {
    const [field, meta, helpers] = useField({ name })
    const { t } = useTranslation()
    const [searchText, setSearchText] = useState('')

    const handleChange = useCallback(
        (text, value) => {
            setSearchText(text)

            if (value) {
                helpers.setTouched(value)
                helpers.setValue(value)
                setSearchText(null)
                onChange(value, _.find(options, { value }))
            }
        },
        [helpers, onChange, options]
    )

    if (viewOnly) {
        const selectedOption = _.find(options, ['value', field.value])

        return (
            <ViewLabel label={props.label}>{selectedOption?.title || field.value || '-'}</ViewLabel>
        )
    }

    const filteredOptions = options.filter((option) =>
        option.title.toLowerCase().includes((searchText || '').toLowerCase())
    )

    return (
        <LabeledAutocomplete
            error={meta.touched ? meta.error : ''}
            translations={{ placeholder: t('common:validation.select') }}
            {...field}
            {...props}
            value={
                searchText === null
                    ? _.get(_.find(options, ['value', field.value]), 'title')
                    : searchText
            }
            onChange={handleChange}
        >
            {filteredOptions.map(({ value, title, isSubheader, ...rest }) =>
                isSubheader ? (
                    <ValueSubheader key={title} title={t(title)} />
                ) : (
                    <ValueOption key={value} value={value} title={title} {...rest} />
                )
            )}
        </LabeledAutocomplete>
    )
}

Autocomplete.propTypes = {
    viewOnly: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    onChange: PropTypes.func
}

Autocomplete.defaultProps = {
    viewOnly: false,
    options: [],
    onChange: () => null
}

export default Autocomplete

import React from 'react'
import PropTypes from 'prop-types'

export const AccordionContent = (
    {
        a11y = { label: 'accordion group' },
        ...rest
    }
) => (
    <div
        role="group"
        aria-label={a11y.label}
        {...rest}
    />
)

AccordionContent.propTypes = {
    a11y: PropTypes.shape({
        label: PropTypes.string
    })
}

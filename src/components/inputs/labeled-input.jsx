import React from 'react'
import PropTypes from 'prop-types'

import { StyledLabeledTextField } from './style'

const LabeledInput = ({ label, value, ...rest }) => (
    <StyledLabeledTextField label={label} value={value} {...rest} />
)

LabeledInput.defaultProps = {
    value: void 0,
    readOnly: true
}

LabeledInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string
}

export default LabeledInput

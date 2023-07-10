import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@sbol/design-system/core/typography'

import { ViewLabelStyled, LabelStyled } from './style'

const ViewLabel = ({ label, children, fontWeight }) => (
    <ViewLabelStyled>
        <LabelStyled>{label}</LabelStyled>
        {typeof children === 'string' ? (
            <Typography fontWeight={fontWeight}>{children}</Typography>
        ) : (
            children
        )}
    </ViewLabelStyled>
)

ViewLabel.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    fontWeight: PropTypes.string
}

ViewLabel.defaultProps = {
    fontWeight: ''
}

export default ViewLabel

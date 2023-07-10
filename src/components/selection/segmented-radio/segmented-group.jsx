import React from 'react'
import PropTypes from 'prop-types'

import { SegmentedGroupStyled } from './segmented-group.style'

export const SegmentedGroup = ({
    name,
    size,
    children,
    ariaLabelledby = 'Segmented radio',
    ...passedProps
}) => (
    <SegmentedGroupStyled
        role="radiogroup"
        aria-labelledby={ariaLabelledby}
        size={size}
        {...passedProps}
    >
        {React.Children.map(children, (child) =>
            React.cloneElement(child, { size, name })
        )}
    </SegmentedGroupStyled>
)

SegmentedGroup.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node,
    ariaLabelledby: PropTypes.string
}

import React from 'react'
import PropTypes from 'prop-types'

import { HorizontalScroll } from '../../horizontal-scroll'

import { SegmentedScrollGroupStyled } from './segmented-group.style'

export const SegmentedScrollGroup = ({
    name,
    size,
    children,
    ariaLabelledby = 'Segmented radio',
    ...passedProps
}) => (
    <SegmentedScrollGroupStyled
        role="radiogroup"
        aria-labelledby={ariaLabelledby}
        size={size}
        {...passedProps}
    >
        <HorizontalScroll>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { size, name })
            )}
        </HorizontalScroll>
    </SegmentedScrollGroupStyled>
)

SegmentedScrollGroup.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node,
    ariaLabelledby: PropTypes.string
}

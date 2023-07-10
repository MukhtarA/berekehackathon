import React from 'react'
import PropTypes from 'prop-types'

import { DividerStyled } from './divider.style'

export const Divider = ({
    size = 'sm',
    verticalMargin = 'zero',
    horizontalMargin = 'zero',
    verticalMarginDirection = 'both',
    horizontalMarginDirection = 'both',
}) => (
    <DividerStyled
        size={size}
        verticalMargin={verticalMargin}
        horizontalMargin={horizontalMargin}
        verticalMarginDirection={verticalMarginDirection}
        horizontalMarginDirection={horizontalMarginDirection}
    />
)

Divider.propTypes = {
    size: PropTypes.oneOf(['sm', 'lg']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalMarginDirection: PropTypes.oneOf([
        'both',
        'top',
        'bottom'
    ]),
    horizontalMarginDirection: PropTypes.oneOf([
        'both',
        'left',
        'right'
    ])
}

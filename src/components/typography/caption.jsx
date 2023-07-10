import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './typography'

export const Caption = ({
    fontWeight = 'regular',
    indent = 'open',
    colorScheme = 'primary',
    ...rest
}) => (
    <Typography
        size="sm"
        fontWeight={fontWeight}
        verticalMargin={indent}
        colorScheme={colorScheme}
        {...rest}
    />
)

Caption.propTypes = {
    children: PropTypes.node.isRequired,
    fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular']),
    indent: PropTypes.oneOf([
        'open',
        'inner',
        'micro',
        'nano',
        'zero'
    ]),
    colorScheme: PropTypes.string
}

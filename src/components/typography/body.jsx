import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './typography'

export const Body1 = ({
    fontWeight = 'regular',
    colorScheme = 'primary',
    ...rest
}) => (
    <Typography
        size="body1"
        verticalMargin="open"
        fontWeight={fontWeight}
        colorScheme={colorScheme}
        {...rest}
    />
)

export const Body2 = ({
    fontWeight = 'regular',
    colorScheme = 'primary',
    ...rest
}) => (
    <Typography
        size="body2"
        verticalMargin="open"
        fontWeight={fontWeight}
        colorScheme={colorScheme}
        {...rest}
    />
)

const propTypes = {
    children: PropTypes.node.isRequired,
    fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular']),
    colorScheme: PropTypes.string
}

Body1.propTypes = propTypes
Body2.propTypes = propTypes

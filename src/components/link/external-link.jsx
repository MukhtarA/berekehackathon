import React from 'react'
import PropTypes from 'prop-types'

import { externalBold, externalRegular } from '../icon/common'

import { Link } from './link'

export const ExternalLink = ({ fontWeight = 'regular', ...rest }) => {
    const externalProps = {
        rel: 'noopener noreferrer',
        target: '_blank'
    }
    return (
        <Link
            {...rest}
            {...externalProps}
            icon={fontWeight === 'regular' ? externalRegular : externalBold}
            fontWeight={fontWeight}
            iconReverse
        />
    )
}

ExternalLink.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'h1', 'h2', 'h3', 'h4', 'h5']),
    fontWeight: PropTypes.oneOf(['regular', 'medium', 'semibold']),
    colorScheme: PropTypes.string,
    refWrapper: PropTypes.func,
    /**
     * Может быть Link из react-router(-dom)
     */
    as: PropTypes.elementType
}

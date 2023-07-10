import React from 'react'
import PropTypes from 'prop-types'

import { getDisplayName } from '../utils/get-display-name'

import { MarginWrapper } from './margin-wrapper.style'

export const withWrapper = (Component) => {
    const WrappedComponent = ({
        className,
        verticalMargin = 'micro',
        verticalMarginDirection = 'both',
        ...props
    }) => (
        <MarginWrapper
            className={className}
            verticalMargin={verticalMargin}
            verticalMarginDirection={verticalMarginDirection}
            size={props.size}
        >
            <Component {...props} />
        </MarginWrapper>
    )

    WrappedComponent.displayName = `Wrapped${getDisplayName(Component)}`
    WrappedComponent.propTypes = {
        className: PropTypes.string,
        verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
        verticalMarginDirection: PropTypes.oneOf([
            'both',
            'top',
            'bottom'
        ]),
        size: PropTypes.oneOf(['sm', 'lg', 'md'])
    }

    return WrappedComponent
}

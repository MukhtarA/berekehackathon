import React from 'react'
import PropTypes from 'prop-types'

import { FlexStyled } from './style'

export const Reverse = ({ children, reversed }) => {
    return (
        <FlexStyled>
            {reversed
                ? React.Children.toArray(children)
                      .reverse()
                      .map((child) => child)
                : children}
        </FlexStyled>
    )
}

Reverse.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    reversed: PropTypes.bool
}

Reverse.defaultProps = {
    reversed: false
}

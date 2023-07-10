import React from 'react'
import PropTypes from 'prop-types'

import { BlockTitleStyled } from './style'

export const BlockTitle = ({ children, customColor, ...rest }) => {
    return (
        <BlockTitleStyled {...rest} customColor={customColor} fontWeight="semibold">
            {children}
        </BlockTitleStyled>
    )
}

BlockTitle.propTypes = {
    children: PropTypes.node.isRequired,
    customColor: PropTypes.string
}

BlockTitle.defaultProps = {
    customColor: null
}

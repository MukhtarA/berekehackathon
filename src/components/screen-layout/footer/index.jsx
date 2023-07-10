import React from 'react'
import PropTypes from 'prop-types'

import { FooterWrapperStyled } from './style'

export const Footer = ({ children, noPadding }) => (
    <FooterWrapperStyled noPadding={noPadding}>{children}</FooterWrapperStyled>
)

Footer.propTypes = {
    children: PropTypes.node,
    noPadding: PropTypes.bool
}

Footer.defaultProps = {
    children: null,
    noPadding: false
}

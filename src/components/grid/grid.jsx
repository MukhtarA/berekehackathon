import React from 'react'
import PropTypes from 'prop-types'

import { GridStyled } from './grid.style'

export const Grid = ({ children = void 0, ...props }) => (
    <GridStyled {...props}>{children}</GridStyled>
)

Grid.propTypes = {
    children: PropTypes.node
}

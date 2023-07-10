import React from 'react'
import PropTypes from 'prop-types'

import { CellStyled } from './grid.style'

export const Cell = ({
    lg = 1,
    offsetLg = void 0,
    md = 1,
    offsetMd = void 0,
    sm = 1,
    offsetSm = void 0,
    children = void 0,
    ...props
}) => (
    <CellStyled
        {...props}
        lg={lg}
        offsetLg={offsetLg}
        md={md}
        offsetMd={offsetMd}
        sm={sm}
        offsetSm={offsetSm}
    >
        {children}
    </CellStyled>
)

Cell.propTypes = {
    /**
     * 0-58
     */
    lg: PropTypes.number,
    /**
     * 0-58
     */
    offsetLg: PropTypes.number,
    /**
     * 0-38
     */
    md: PropTypes.number,
    /**
     * 0-38
     */
    offsetMd: PropTypes.number,
    /**
     * 0-23
     */
    sm: PropTypes.number,
    /**
     * 0-23
     */
    offsetSm: PropTypes.number,
    children: PropTypes.node
}

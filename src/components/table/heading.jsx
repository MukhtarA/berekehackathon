import React from 'react'
import PropTypes from 'prop-types'

import { TableContext } from './table'
import { HeadRowStyled, BorderedHeadRowStyled } from './table.style'

export const TableHead = ({
    children,
    size = 'sm',
    className,
    verticalPadding = 'inner'
}) => (
    <TableContext.Provider value={{ size, component: 'div' }}>
        <BorderedHeadRowStyled
            size={size}
            className={className}
            verticalPadding={verticalPadding}
        >
            <HeadRowStyled>{children}</HeadRowStyled>
        </BorderedHeadRowStyled>
    </TableContext.Provider>
)

TableHead.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'body1', 'body2', 'h1', 'h2', 'h3', 'h4', 'h5']),
    className: PropTypes.string,
    verticalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero'])
}

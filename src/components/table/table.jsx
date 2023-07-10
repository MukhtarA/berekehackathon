import React from 'react'
import PropTypes from 'prop-types'

import { TableStyled } from './table.style'

export const TableContext = React.createContext({ size: 'md', isMobileSlim: true })

export const Table = ({ children, size, className }) => {
    let isMobileSlim = true
    React.Children.forEach(children,
        (child) => {
            if (React.isValidElement(child) &&
            child.type?.name === 'TableHead') {
                isMobileSlim = false
            }
        }
    )

    return (
        <TableStyled className={className}>
            <TableContext.Provider value={{ size, isMobileSlim }}>
                {children}
            </TableContext.Provider>
        </TableStyled>
    )
}

Table.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string
}

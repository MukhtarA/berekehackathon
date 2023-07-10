import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { TableContext } from './table'
import { BorderedRowStyled, RowStyled } from './table.style'

export const TableRow = ({ verticalPadding = 'inner', children, className }) => {
    const childrenArray = React.Children.toArray(children)

    const { size, isMobileSlim } = useContext(TableContext)
    if (childrenArray.length < 1) {
        return null
    }


    return (
        <BorderedRowStyled
            size={size}
            className={className}
            verticalPadding={verticalPadding}
        >
            <RowStyled aria-label="Строка таблицы" isMobileSlim={isMobileSlim}>
                {children}
            </RowStyled>
        </BorderedRowStyled>
    )
}

TableRow.propTypes = {
    verticalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

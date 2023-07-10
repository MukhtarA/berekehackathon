import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { extend } from 'lodash'

import { TableContext } from './table'
import { ItemStyled, LabelStyled } from './table.style'

export const TableCell = ({ children, as, align = 'left', className }) => {
    const childrenArray = React.Children.toArray(children)

    const { size, component, isMobileSlim } = useContext(TableContext)

    if (childrenArray.length < 1) {
        return null
    }


    return (
        <ItemStyled
            className={className}
            as={as || component}
            align={align}
            size={size}
            isMobileSlim={isMobileSlim}
        >
            {childrenArray.map((child) =>
                React.isValidElement(child)
                    ? React.cloneElement(
                        child,
                        extend({}, { size, verticalMargin: 'zero' }, child.props)
                    )
                    : child
            )}
        </ItemStyled>
    )
}

const TableCellHeadStyled = LabelStyled.withComponent(TableCell)

export const TableCellHead = (props) => (
    <TableCellHeadStyled {...props} />
)

TableCell.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.elementType,
    align: PropTypes.string,
    className: PropTypes.string
}

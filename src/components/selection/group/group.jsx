import React from 'react'
import PropTypes from 'prop-types'

import { Caption } from '../../typography'

import { GroupFieldsetStyled, ContentStyled } from './group.style'

/**
 * Компонент для группировки и выравнивания checkbox и radio
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const SelectionGroup = ({
    title,
    size,
    children,
    a11y = { label: 'radio group' },
    ...passedProps
}) => (
    <GroupFieldsetStyled {...passedProps} aria-label={a11y.label}>
        {title && <Caption as="legend">{title}</Caption>}
        <ContentStyled size={size}>
            {children}
        </ContentStyled>
    </GroupFieldsetStyled>
)

SelectionGroup.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node,
    title: PropTypes.string,
    a11y: PropTypes.shape({
        label: PropTypes.string
    })
}

import React from 'react'
import PropTypes from 'prop-types'

import { BlockStyled } from './menu.style'

export const MenuBlock = ({ children, a11y, activeDescendant, onClose }) => (
    <li>
        <BlockStyled aria-label={a11y.title}>
            {React.Children.map(children, (child) => React.cloneElement(child, { activeDescendant, onClose }))}
        </BlockStyled>
    </li>
)

MenuBlock.propTypes = {
    onClose: PropTypes.func,
    activeDescendant: PropTypes.string,
    a11y: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    children: PropTypes.node
}

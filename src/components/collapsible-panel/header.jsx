import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { HeaderButton } from './style'

const Header = ({ children, toggleState, isOpen, id, elementRef }) => (
    <HeaderButton onClick={toggleState} aria-expanded={isOpen} aria-controls={id} ref={elementRef}>
        {children}
    </HeaderButton>
)

Header.displayName = 'CollapsiblePanel.Header'

Header.propTypes = {
    toggleState: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    elementRef: PropTypes.func
}

Header.defaultProps = {
    id: '',
    elementRef: noop,
    isOpen: false
}

export default Header

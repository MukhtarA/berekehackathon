import React from 'react'
import PropTypes from 'prop-types'
import { UnmountClosed } from 'react-collapse'

import { passPropsToChildren } from './utils'
import { CollapseWrapperStyled } from './style'

const Content = ({ children, isOpen, toggleState, id, paddingBottom }) => (
    <UnmountClosed id={id} isOpened={isOpen}>
        <CollapseWrapperStyled paddingBottom={paddingBottom}>
            {passPropsToChildren(children, { isOpen, toggleState, id })}
        </CollapseWrapperStyled>
    </UnmountClosed>
)

Content.displayName = 'Content'

Content.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    isOpen: PropTypes.bool,
    id: PropTypes.string,
    paddingBottom: PropTypes.number,
    toggleState: PropTypes.func
}

Content.defaultProps = {
    isOpen: false,
    id: '',
    paddingBottom: 36,
    toggleState: void 0
}

export default Content

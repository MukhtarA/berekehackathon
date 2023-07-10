import React from 'react'
import PropTypes from 'prop-types'

import { ActionsStyled } from './actions.style'

export const AlertActions = (props) => (
    <ActionsStyled {...props} size="md" verticalMargin="inner">
        {props.children}
    </ActionsStyled>
)

AlertActions.propTypes = {
    children: PropTypes.node,
    mode: PropTypes.oneOf(['success', 'info', 'draft', 'warning'])
}

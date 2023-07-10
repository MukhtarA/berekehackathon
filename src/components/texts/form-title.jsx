import React from 'react'
import PropTypes from 'prop-types'

import { FormTitleStyled } from './style'

export const FormTitle = ({ children, ...rest }) => (
    <FormTitleStyled {...rest} fontWeight="semibold" indent="zero">
        {children}
    </FormTitleStyled>
)

FormTitle.propTypes = {
    children: PropTypes.node.isRequired
}

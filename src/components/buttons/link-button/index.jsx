import React from 'react'
import PropTypes from 'prop-types'

import { ButtonSecondaryStyled } from './style'

export const LinkButton = ({ noDecoration, ...rest }) => {
    return (
        <ButtonSecondaryStyled
            verticalMargin="zero"
            horizontalMargin="zero"
            verticalPadding="zero"
            horizontalPadding="micro"
            noDecoration={noDecoration}
            {...rest}
        />
    )
}

LinkButton.propTypes = {
    noDecoration: PropTypes.bool
}

LinkButton.defaultProps = {
    noDecoration: false
}

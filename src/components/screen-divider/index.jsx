import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@sbol/design-system/core/divider'

import { DividerStyled } from './style'

export const ScreenDivider = ({ size, noMargin, ...rest }) => (
    <DividerStyled noMargin={noMargin}>
        <Divider size={size} {...rest} />
    </DividerStyled>
)

ScreenDivider.propTypes = {
    noMargin: PropTypes.bool,
    size: PropTypes.string
}

ScreenDivider.defaultProps = {
    noMargin: false,
    size: 'lg'
}

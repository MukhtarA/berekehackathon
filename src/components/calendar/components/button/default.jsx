import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { ic24ChevronDown } from '../../../icon/common'

import {
    DefaultButtonStyled,
    TypographyStyled,
    ArrowIconStyled,
} from './button.style'

const DefaultButton = ({ children, opened, disabled, onClick = noop }) => (
    <DefaultButtonStyled disabled={disabled} onClick={onClick} type="button">
        {children && <TypographyStyled fontWeight="medium">{children}</TypographyStyled>}
        <ArrowIconStyled
            opened={opened}
            icon={ic24ChevronDown}
            colorScheme="primary"
        />
    </DefaultButtonStyled>
)

const DefaultButtonMemoized = React.memo(DefaultButton)
export { DefaultButtonMemoized as DefaultButton }

DefaultButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    opened: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
}

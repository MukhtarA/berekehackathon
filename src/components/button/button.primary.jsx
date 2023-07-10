import PropTypes from 'prop-types'

import { ButtonBase } from './button.base'
import { ButtonPrimaryStyled } from './button.primary.style'
import { buttonFactory } from './button-factory'

export const ButtonPrimary = buttonFactory(ButtonPrimaryStyled)

ButtonPrimary.propTypes = {
    ...ButtonBase.propTypes,
    colorScheme: PropTypes.string
}

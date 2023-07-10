import { ButtonBase } from './button.base'
import { ButtonSecondaryStyled } from './button.secondary.style'
import { buttonFactory } from './button-factory'

export const ButtonSecondary = buttonFactory(ButtonSecondaryStyled)

ButtonSecondary.propTypes = ButtonBase.propTypes

import { ButtonBase } from './button.base'
import { ButtonTransparentStyled } from './button.transparent.style'
import { buttonFactory } from './button-factory'

export const ButtonTransparent = buttonFactory(ButtonTransparentStyled)

ButtonTransparent.propTypes = ButtonBase.propTypes

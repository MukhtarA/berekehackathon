import { ButtonBase } from './button.base'
import { ButtonTertiaryStyled } from './button.tertiary.style'
import { buttonFactory } from './button-factory'

export const ButtonTertiary = buttonFactory(ButtonTertiaryStyled)

ButtonTertiary.propTypes = ButtonBase.propTypes

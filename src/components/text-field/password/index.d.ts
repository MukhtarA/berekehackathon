import { LabeledProps } from '../../labeled'
import { TextFieldProps } from '../text-field'

export type TextFieldPasswordMode = 'hideOnEmpty' | 'noEye' | 'showOnEmpty'

export interface TextFieldPasswordA11y {
    title?: string;
}

export interface TextFieldPasswordProps extends Omit<TextFieldProps, 'a11y'> {
    mode?: TextFieldPasswordMode;
    a11y?: TextFieldPasswordA11y;
}

export const TextFieldPassword: React.FC<TextFieldPasswordProps>

export const LabeledTextFieldPassword: React.FC<TextFieldPasswordProps & LabeledProps>

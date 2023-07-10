import { LabeledProps } from '../../labeled'
import { TextFieldMaskedProps } from '../masked'

export type TextFieldLocalPhoneValue = string | number

export type TextFieldLocalPhoneOnChange = (phone: TextFieldLocalPhoneValue) => void

export interface TextFieldLocalPhoneProps extends TextFieldMaskedProps {
    onChange?: TextFieldLocalPhoneOnChange;
    value?: TextFieldLocalPhoneValue;
    suggest?: Array<string>;
}

export const TextFieldLocalPhone: React.FC<TextFieldLocalPhoneProps>

export const LabeledTextFieldLocalPhone: React.FC<TextFieldLocalPhoneProps & LabeledProps>

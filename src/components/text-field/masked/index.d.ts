import { LabeledProps } from '../../labeled'
import { TextFieldProps } from '../text-field'

export type TextFieldMaskedValue = string | number

export type TextFieldMaskedOnChange = (value: TextFieldMaskedValue, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void

export type TextFieldMaskedOnBlur = (value: TextFieldMaskedValue, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void

export type TextFieldMaskedOnKeyPress = (event: React.SyntheticEvent<HTMLInputElement>, value: TextFieldMaskedValue, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void

export interface TextFieldMaskedProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur' | 'onKeyPress'> {
    onChange?: TextFieldMaskedOnChange;
    onBlur?: TextFieldMaskedOnBlur;
    onKeyPress?: TextFieldMaskedOnKeyPress;
    value?: TextFieldMaskedValue;
    /**
     * Mask of TextField. For details see: react-imask package
     */
    maskOptions?: IMask.AnyMaskedOptions;
}

export const TextFieldMasked: React.FC<TextFieldMaskedProps>

export const LabeledTextFieldMasked: React.FC<TextFieldMaskedProps & LabeledProps>

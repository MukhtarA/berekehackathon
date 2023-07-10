import { Mode } from '../../..'
import { LabeledProps } from '../../labeled'
import {
    TextFieldMaskedProps,
    TextFieldMaskedOnBlur,
    TextFieldMaskedOnChange,
    TextFieldMaskedOnKeyPress
} from '../masked'

export interface TextFieldMoneyCurrency {
    value?: string;
    title?: string;
    mode?: keyof Mode;
}

export interface TextFieldMoneyProps extends Omit<TextFieldMaskedProps, 'onChange' | 'onChange' | 'onFocus'> {
    currency?: TextFieldMoneyCurrency;
    onChange?: TextFieldMaskedOnChange;
    onFocus?: TextFieldMaskedOnBlur;
    onBlur?: TextFieldMaskedOnBlur;
    onKeyPress?: TextFieldMaskedOnKeyPress;
    value?: string;
}

export const TextFieldMoney: React.FC<TextFieldMoneyProps>

export const LabeledTextFieldMoney: React.FC<TextFieldMoneyProps & LabeledProps>

import { InputRefWrapper, StandartSizes } from '../../..'
import { LabeledProps } from '../../labeled'
import { TextFieldMaskedProps } from '../masked'
import { TextFieldOnChange } from '..'

export interface TextFieldCounterProps extends Omit<TextFieldMaskedProps, 'size' | 'maskOptions' | 'value' | 'onChange'> {
    size?: StandartSizes;
    title?: string;
    error?: string;
    formName?: string;
    refWrapper?: InputRefWrapper;
    onChange?: TextFieldOnChange;
    readonly?: boolean;
    disabled?: boolean;
    value?: string;
    step?: number;
    min?: number;
    max?: number;
    prefix?: string;
    suffix?: string;
}

export const TextFieldCounter: React.FC<TextFieldCounterProps>

export const LabeledTextFieldCounter: React.FC<TextFieldCounterProps & LabeledProps>

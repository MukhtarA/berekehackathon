import { LabeledProps } from '../../labeled'
import { TextFieldProps } from '../text-field'

export interface MultilineTextFieldA11y {
    label?: string;
    title?: string;
}

export interface MultilineTextFieldProps extends Omit<TextFieldProps, 'a11y'> {
    a11y?: MultilineTextFieldA11y;
}

export const MultilineTextField: React.FC<MultilineTextFieldProps>

export const LabeledMultilineTextField: React.FC<MultilineTextFieldProps & LabeledProps>

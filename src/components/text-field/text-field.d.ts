import {
    InputRefWrapper,
    OnClickHTMLInputElement,
    OnFocusOrBlurInput,
    Sizes
} from '../..'
import { LabeledProps } from '../labeled'
import { ContainerProps } from '../indent-wrapper'

export type TextFieldSize = keyof Omit<Sizes, 'sm'>

export interface TextFieldA11y {
    label?: string;
}

export type TextFieldOnChange = (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void
export interface TextFieldProps extends
    Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'onChange'>,
    Pick<ContainerProps, 'verticalMargin' | 'horizontalMargin' | 'verticalPadding' | 'horizontalPadding'> {
    id?: string;
    description?: string;
    additionalText?: string;
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
    icon?: React.ReactNode | string;
    size?: TextFieldSize;
    refWrapper?: InputRefWrapper;
    value?: string;
    onChange?: TextFieldOnChange;
    error?: string;
    formName?: string;
    a11y?: TextFieldA11y;
    additionalChild?: React.ReactNode;
    onFocus?: OnFocusOrBlurInput;
    onBlur?: OnFocusOrBlurInput;
    onClick?: OnClickHTMLInputElement;
}

export const TextField: React.FC<TextFieldProps>
export const LabeledTextField: React.FC<TextFieldProps & LabeledProps>

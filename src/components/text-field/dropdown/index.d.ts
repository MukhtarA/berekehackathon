import { InputOnKeyDown, StandartSizes } from '../../..'

export type OnClickTextFieldDropdown = (value: string) => void
export interface TextFieldDropdownProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'onChange'> {
    readonly?: boolean;
    disabled?: boolean;
    size?: StandartSizes;
    options: Array<unknown>;
    value?: string;
    onChange?: OnClickTextFieldDropdown;
    onKeyDown?: InputOnKeyDown;
    name?: string;
}

export const TextFieldDropdown: React.FC<TextFieldDropdownProps>

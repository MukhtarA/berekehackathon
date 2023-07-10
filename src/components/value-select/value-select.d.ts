import { LabeledProps } from '../labeled'
import { ColorScheme, OnFocusOrBlurButton, Sizes, StandartSizes } from '../..'

export type ValueSelectValue = string | Array<string>

export type ValueSelectOnChange = (value: string | Array<string>) => void

export type ValueSelectMode = 'select' | 'autoselect' | 'multiselect'

export type ValueSelectSize = keyof Omit<Sizes, 'sm'>

export interface ValueSelectTranslations {
    placeholder?: string;
}

export type ValueSelectOnBlur = (value: string | Array<string>) => void
export interface ValueSelectProps {
    children?: React.ReactNode;
    value?: ValueSelectValue;
    onChange?: ValueSelectOnChange;
    onFocus?: OnFocusOrBlurButton;
    onBlur?: ValueSelectOnBlur;
    error?: string;
    id?: string;
    mode?: ValueSelectMode;
    size?: ValueSelectSize;
    disabled?: boolean;
    readonly?: boolean;
    translations?: ValueSelectTranslations;
    ariaLabelledby?: string;
    ariaLabel?: string;
}

export const ValueSelect: React.FC<ValueSelectProps>

export interface ValueOptionProps {
    value?: ValueSelectValue;
    icon?: string;
    title: string;
    description?: string;
    additional?: string;
    additionalDescription?: string;
    size?: StandartSizes;
    iconColorScheme?: ColorScheme;
}

export const ValueOption: React.FC<ValueOptionProps>

export interface ValueSubheaderProps {
    title: string;
    size?: StandartSizes;
}

export const ValueSubheader: React.FC<ValueSubheaderProps>

export const LabeledValueSelect: React.FC<ValueSelectProps & LabeledProps>

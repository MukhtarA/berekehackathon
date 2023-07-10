import { OnFocusOrBlurInput, Sizes } from '../..'
import { LabeledProps } from '../labeled'

export type AutocompleteMode = 'loading' | 'error' | 'noMatches'
export type AutocompleteSize = keyof Omit<Sizes, 'sm'>
export interface AutocompleteTranslations {
    noMatches?: string;
}

export type AutocompleteOnChangeHandler = (value: string, selected: string) => void
export type AutocompleteOnBlurHandler = (value: string) => void
export interface AutocompleteProps {
    id?: string;
    value?: string;
    onChange?: AutocompleteOnChangeHandler;
    onBlur?: AutocompleteOnBlurHandler;
    onFocus?: OnFocusOrBlurInput;
    size?: AutocompleteSize;
    placeholder?: string;
    icon?: React.ReactNode | string;
    children?: React.ReactNode;
    mode?: AutocompleteMode;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    autoComplete?: string;
    ariaLabelledby?: string;
    ariaLabel?: string;
    translations?: AutocompleteTranslations;
}

export const Autocomplete: React.FC<AutocompleteProps>

export const LabeledAutocomplete: React.FC<AutocompleteProps & LabeledProps>

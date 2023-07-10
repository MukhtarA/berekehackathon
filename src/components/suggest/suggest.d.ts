import { MarginWrapperProps } from '../indent-wrapper'

export interface SuggestA11y {
    listLabel?: string;
    buttonLabel?: string;
}

export type SuggestOnClick = (value: string) => void
export interface SuggestProps extends Pick<MarginWrapperProps, 'size' | 'verticalMargin' > {
    id?: string;
    options?: Array<string>;
    disabled?: boolean;
    onClick?: SuggestOnClick;
    a11y?: SuggestA11y;
}

export const Suggest: React.FC<SuggestProps>

export interface SuggestInjectorProps extends Omit<SuggestProps, 'className' | 'verticalMargin' | 'a11y'> {
    children?: React.ReactNode;
    a11y?: SuggestProps & Record<string, unknown>;
}

export const SuggestInjector: React.FC<SuggestInjectorProps>

export interface SuggestWrappedComponentProps extends Omit<SuggestProps, 'onClick'> {
    onSuggestClick?: SuggestOnClick;
}

export const withSuggest: <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => React.FC<SuggestWrappedComponentProps & T>

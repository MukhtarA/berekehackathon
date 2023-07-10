import { FunctionWithoutArguments } from './../..'

export const getDisplayName: (Component: React.ReactNode, fallback?: string) => string | React.ReactNode

export const formatNumber: (number: unknown, mask?: {
    mask: NumberConstructor;
    scale: string;
    radix: string;
    padFractionalZeros: boolean;
    thousandsSeparator: string;
}) => unknown

export const makeMoneyMask: ({
    scale, radix, padFractionalZeros, thousandsSeparator,
}
?: {
    scale?: string;
    radix?: string;
    padFractionalZeros?: boolean;
    thousandsSeparator?: string;
}) => {
    mask: NumberConstructor;
    scale: string;
    radix: string;
    padFractionalZeros: boolean;
    thousandsSeparator: string;
}

export const formatValueByMask: (value: unknown, rawMask: unknown) => unknown

export type FormatLocalPhoneDefinitions = {
    '?': RegExp
}
export const formatLocalPhone: (
    value: string, codes: Array<string>, definitions: FormatLocalPhoneDefinitions
) => unknown

export const propStyles: (styles: unknown) => () => Array<unknown>

export const variantStyles: (styles: unknown) => () => Array<unknown>

export type ScrollToElementOptions = {
    offset?: number
}
export const scrollToElement: (
    element: Element, options?: ScrollToElementOptions, onFinishedCb?: FunctionWithoutArguments
) => void

export type GetFilteredComponentProps = {
    passedProps: unknown
    excludedProps: unknown
}
export const getFilteredComponent: (
    Component: React.ReactNode, { passedProps, excludedProps }: GetFilteredComponentProps
) => (props: unknown) => JSX.Element




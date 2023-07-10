import {
    Indent,
    StandartSizes,
    XDirection,
    YDirection,
    ColorScheme,
    Sizes,
    HSizes,
    FontWeight,
    Status,
    OnClickHTMLButtonElement,
    As,
    ReactRouter
} from '../..'

export interface ButtonBaseProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'as'>, ReactRouter {
    as?: As;
    title?: string;
    loading?: boolean;
    size?: StandartSizes;
    icon?: string;
    iconName?: string;
    iconReverse?: boolean;
    iconIndent?: Indent;
    fullWidth?: boolean;
    verticalMargin?: Indent;
    verticalMarginDirection?: YDirection;
    horizontalMargin?: Indent;
    horizontalMarginDirection?: XDirection;
    verticalPadding?: Indent;
    horizontalPadding?: Indent;
    onClick?: OnClickHTMLButtonElement;
    href?: string;
}

export interface ButtonPrimaryProps extends ButtonBaseProps {
    colorScheme?: ColorScheme;
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps>
export const ButtonSecondary: React.FC<ButtonBaseProps>
export const ButtonTertiary: React.FC<ButtonBaseProps>
export const ButtonTransparent: React.FC<ButtonBaseProps>

export type ButtonDashedSize = keyof Sizes | keyof HSizes

export type ButtonDashedFontWeight = keyof FontWeight


export type ButtonDashedColorScheme = keyof Omit<Status, 'draft'>

export interface ButtonDashedProps extends Omit<ButtonBaseProps, 'size'> {
    size?: ButtonDashedSize;
    fontWeight?: ButtonDashedFontWeight;
    colorScheme?: ButtonDashedColorScheme;
}

export const ButtonDashed: React.FC<ButtonDashedProps>

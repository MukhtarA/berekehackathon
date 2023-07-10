import { ColorScheme, FontWeight, Indent, Size } from '../..'
import { ContainerProps } from '../indent-wrapper'

export type HeadlineFontWeight = keyof FontWeight
export type HeadlineIndent = 'open' | 'zero' | 'inner'

export interface HeadlineProps extends Omit<React.HTMLProps<HTMLHeadingElement>, 'size'> {
    size?: Size;
    children: React.ReactNode;
    fontWeight?: HeadlineFontWeight;
    colorScheme?: ColorScheme;
    indent?: HeadlineIndent;
}

export const Headline1: React.FC<HeadlineProps>
export const Headline2: React.FC<HeadlineProps>
export const Headline3: React.FC<HeadlineProps>
export const Headline4: React.FC<HeadlineProps>
export const Headline5: React.FC<HeadlineProps>

export type TypographyFontWeight = keyof FontWeight

export interface TypographyProps extends Omit<React.HTMLProps<HTMLParagraphElement>, 'size'>, ContainerProps {
    children: React.ReactNode;
    fontWeight?: TypographyFontWeight;
    colorScheme?: ColorScheme;
    as?: keyof JSX.IntrinsicElements;
}

export const Typography: React.FC<TypographyProps>

export interface CaptionProps extends Omit<TypographyProps, 'size' | 'verticalMargin'> {
    indent?: Indent;
}

export const Caption: React.FC<CaptionProps>

export type BodyProps = Omit<TypographyProps, 'size' | 'verticalMargin'>

export const Body1: React.FC<BodyProps>
export const Body2: React.FC<BodyProps>

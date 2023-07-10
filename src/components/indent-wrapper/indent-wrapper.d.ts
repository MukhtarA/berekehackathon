import { CSSObject } from '@emotion/serialize'
import { Indent, Size, WrappedComponentProps, XDirection, YDirection } from '../..'

export const withWrapper: <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => React.FC<WrappedComponentProps & T>

export interface PaddingWrapperProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'> {
    size?: Size;
    verticalPadding?: Indent;
    verticalPaddingDirection?: YDirection;
    horizontalPadding?: Indent;
    horizontalPaddingDirection?: XDirection;
}

export const PaddingWrapper: React.FC<PaddingWrapperProps>

export interface MarginWrapperProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'> {
    size?: Size;
    verticalMargin?: Indent;
    verticalMarginDirection?: YDirection;
    horizontalMargin?: Indent;
    horizontalMarginDirection?: XDirection;
}

export const paddingStyle: (props: PaddingWrapperProps) => CSSObject
export const marginStyle: (props: MarginWrapperProps) => CSSObject

export const verticalMarginStyle: (props: Omit<MarginWrapperProps, 'horizontalMargin' | 'horizontalMarginDirection'>) => CSSObject
export const horizontalMarginStyle: (props: Omit<MarginWrapperProps, 'verticalMargin' | 'verticalMarginDirection'>) => CSSObject

export const verticalPaddingStyle: (props: Omit<PaddingWrapperProps, 'horizontalPadding' | 'horizontalPaddingDirection'>) => CSSObject
export const horizontalPaddingStyle: (props: Omit<PaddingWrapperProps, 'verticalPadding' | 'verticalPaddingDirection'>) => CSSObject

export const MarginWrapper: React.FC<MarginWrapperProps>

export type ContainerProps = PaddingWrapperProps & MarginWrapperProps

export const Container: React.FC<ContainerProps>

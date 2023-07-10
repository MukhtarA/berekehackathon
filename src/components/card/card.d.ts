import {
    Sizes,
    ThemeScheme,
    OnClickHTMLElement,
    FunctionWithoutArguments,
    As,
    ReactRouter,
    MarginWrapperProps
} from '../..'

import { ElevationWrapperProps } from './../elevation-wrapper/elevation-wrapper.d'

export type CardSize = keyof Omit<Sizes, 'sm'>

export type CardIconColorScheme = keyof ThemeScheme

export type CardAdditionalButton = 'plus' | 'cross'

export type CardRefWrapper = (element: React.RefObject<HTMLDivElement>) => void
export interface CardA11y {
    additionalButtonTitle?: string;
}

export interface CardProps extends Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>, Pick<ElevationWrapperProps, 'active' | 'mode'>,
    Pick<MarginWrapperProps,
    'verticalMargin' |
    'verticalMarginDirection' |
    'horizontalMargin' |
    'horizontalMarginDirection'
    >, ReactRouter {

    as?: As;
    children?: React.ReactNode;
    size?: CardSize;
    icon?: string;
    iconName?: string;
    iconColorScheme?: CardIconColorScheme;
    imageSrc?: string;
    srcSet?: string;
    onClick?: OnClickHTMLElement;
    additionalButton?: CardAdditionalButton;
    onAdditionalButtonClick?: OnClickHTMLElement;
    loading?: boolean;
    href?: string;
    external?: boolean;
    story?: boolean;
    viewed?: boolean;
    title?: string;
    description?: string;
    colorScheme?: string;
    refWrapper?: CardRefWrapper;
    a11y?: CardA11y;
}

export const Card: React.FC<CardProps>

export interface TimerCardProps extends CardProps {
    initialValue?: number;
    value: number;
    title: string;
    timerTitle?: string;
    onClick: FunctionWithoutArguments;
}

export const TimerCard: React.FC<TimerCardProps>

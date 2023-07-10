import { As, FontWeight, HSizes, OnClickHTMLElement, Sizes, Status, ReactRouter } from '../..'
import { MarginWrapperProps } from '../indent-wrapper'

export type LinkSize = keyof Sizes | keyof HSizes

export type LinkFontWeight = keyof FontWeight

export type LinkColorScheme = keyof Omit<Status, 'draft'>
export type LinkRefWrapper = (element: React.RefObject<HTMLElement>) => void
export interface LinkProps extends Omit<React.HTMLProps<HTMLElement> & ReactRouter & MarginWrapperProps, 'as' | 'size'> {
    /**
     * Текстовое содержимое ссылки
     */
    title?: string;
    /**
     * Наименование иконки из сформированного namespace с помощью IconLoader.addIcons
     * или готового iconPacka предоставляемого дизайн-системой
     */
    iconName?: string;
    /**
     * svg файл
     */
    icon?: string;
    size?: LinkSize;
    fontWeight?: LinkFontWeight;
    colorScheme?: LinkColorScheme;
    refWrapper?: LinkRefWrapper;
    /**
     * Может быть Link из react-router(-dom)
     */
    as?: As;
    /**
     * Для работы с Link из lib.app
     */
    external?: boolean;
    iconReverse?: boolean;
    disabled?: boolean;
    underlined?: boolean;
    ariaLabel?: string;
    onClick?: OnClickHTMLElement;
    href?: string;
}

export const Link: React.FC<LinkProps>

export type ExternalLinkSize = keyof Sizes | keyof HSizes

export type ExternalLinkFontWeight = keyof FontWeight
export interface ExternalLinkProps extends LinkProps {
    external?: boolean;
    children?: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinkProps>

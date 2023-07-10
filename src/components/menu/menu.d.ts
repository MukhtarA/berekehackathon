import {
    FunctionWithoutArguments,
    OnClickHTMLButtonElement,
    StandartSizes
} from '../..'

export interface MenuA11y {
    title?: string;
}

export type MenuMode = 'hover' | 'click'

export type MenuPosition = 'normal' | 'overlay'

export interface MenuProps {
    a11y?: MenuA11y;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
    onOpen?: FunctionWithoutArguments;
    onClose?: FunctionWithoutArguments;
    size?: StandartSizes;
    mode?: MenuMode;
    position?: MenuPosition;
    className?: string;
}

export const Menu: React.FC<MenuProps>

export interface MenuBlockA11y {
    title?: string;
}

export interface MenuBlockProps {
    onClose?: FunctionWithoutArguments;
    activeDescendant?: string;
    a11y: MenuBlockA11y;
    children?: React.ReactNode;
}

export const MenuBlock: React.FC<MenuBlockProps>

export interface MenuItemProps {
    onClose?: FunctionWithoutArguments;
    activeDescendant?: string;
    icon?: string;
    title?: string;
    onClick?: OnClickHTMLButtonElement;
}

export const MenuItem: React.FC<MenuItemProps>

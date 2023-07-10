import { ColorScheme, ScrollContainer, Sizes, StandartSizes } from '../..'

export type AnchorHandler = (value: string) => void
export interface AnchorProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size' | 'onChange' | 'onClick'> {
    onChange?: AnchorHandler;
    onClick?: AnchorHandler;
    colorScheme?: ColorScheme;
    initialValue?: string;
    children?: React.ReactNode;
    size?: StandartSizes;
    fullWidth?: boolean;
    sticky?: boolean;
    borderless?: boolean;
    scrollContainer?: ScrollContainer;
}

export const Anchor: React.FC<AnchorProps>

export type AnchorLinkMode = 'default' | 'success' | 'error'

export type AnchorLinkSize = keyof Omit<Sizes, 'md'>

export interface AnchorLinkProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'onChange'> {
    title?: string;
    forceOpened?: boolean;
    onChange?: AnchorHandler;
    /**
     * Дополнительная индикация таба. Не взаимоисключается с colorScheme
     */
    mode?: AnchorLinkMode;
    /**
     * Передается из Tabs.
     */
    colorScheme?: ColorScheme;
    size?: AnchorLinkSize;
}

export const AnchorLink: React.FC<AnchorLinkProps>

import { ScrollContainer, StandartSizes } from '../..'

export type TabOnChange = (value: string) => void
export interface TabProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'onChange'> {
    title: string;
    forceOpened?: boolean;
    onChange?: TabOnChange;
    /**
     * Передается из Tabs. Необходимо для a11y связки
     */
    id?: string;
    size?: StandartSizes;
    colorScheme?: string;
    parentId?: string;
}

export const Tab: React.FC<TabProps>

export interface TabsProps extends Omit<React.HTMLProps<HTMLElement>, 'size' | 'onSelect' | 'onChange'> {
    onChange?: TabOnChange;
    selectedItem?: string;
    onSelect?: TabOnChange;
    initialValue?: string;
    children?: React.ReactNode;
    size?: StandartSizes;
    sticky?: boolean;
    fullWidth?: boolean;
    borderless?: boolean;
    colorScheme?: string;
    scrollContainer?: ScrollContainer;
}

export const Tabs: React.FC<TabsProps>

import { Sizes, ThemeScheme } from '../..'

export type LoaderIconSize = keyof Omit<Sizes, 'md'>

export type LoaderIconMode = keyof ThemeScheme

export interface LoaderIconProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size' > {
    /**
     * Размер отображаемого лоадера
     */
    size?: LoaderIconSize;
    /**
     * Светлый или темный цвет лоадера
     */
    mode?: LoaderIconMode;
}

export const LoaderIcon: React.FC<LoaderIconProps>

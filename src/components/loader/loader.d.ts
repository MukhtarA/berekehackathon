import { ColorScheme, StandartSizes } from '../..'

export interface LoaderProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size' > {
    /**
     * Размер отображаемого лоадера
     */
    size?: StandartSizes;
    /**
     * Светлый или темный цвет лоадера
     */
    colorScheme?: ColorScheme;
    showDelay?: number;
}

export const Loader: React.FC<LoaderProps>

export type ContainedLoaderProps = React.HTMLProps<HTMLDivElement>

export type PageLoaderProps = React.HTMLProps<HTMLDivElement>

export const PageLoader: React.FC<PageLoaderProps>
export const ContainedLoader: React.FC<ContainedLoaderProps>

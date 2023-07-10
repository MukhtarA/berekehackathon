import { ContainerProps, StandartSizes } from '../..'

export interface MarkdownFullProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size' >, Pick<ContainerProps, 'verticalPadding' | 'verticalMargin' | 'horizontalMargin'> {
    content: string;
    size?: StandartSizes;
    className?: string;
    /**
     * Color from Theme
     */
    colorScheme?: string;
}

export const MarkdownFull: React.FC<MarkdownFullProps>

export type MarkdownShortProps = MarkdownFullProps

export const MarkdownShort: React.FC<MarkdownShortProps>

import { Sizes } from '../..'
import { ContainerProps } from '../indent-wrapper'

export type PaginationSizes = Omit<Sizes, 'lg'>

export type OnPageSizeChange = (value: number) => void
export type OnChangePaginator = (value: number) => void

export interface PaginationProps extends Pick<ContainerProps, 'verticalPadding' | 'verticalMargin' | 'horizontalMargin' | 'horizontalPadding'> {
    additionalChild?: React.ReactNode;
    size?: PaginationSizes;
    total?: number;
    defaultPage?: number;
    page?: number;
    pageSize?: number;
    onPageSizeChange?: OnPageSizeChange;
    pageSizeOptions?: Array<string>;
    onChange?: OnChangePaginator;
}

export const Pagination: React.FC<PaginationProps>

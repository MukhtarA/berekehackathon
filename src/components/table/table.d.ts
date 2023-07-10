import { As, StandartSizes } from '../..'
import { PaddingWrapperProps } from '../indent-wrapper'

export interface TableProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'> {
    children?: React.ReactNode;
    size?: StandartSizes;
}

export const Table: React.FC<TableProps>

export interface TableRowProps extends React.HTMLProps<HTMLDivElement>, Pick<PaddingWrapperProps, 'verticalPadding'> {
    children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps>

export interface TableHeadProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size'>, Pick<PaddingWrapperProps, 'verticalPadding' | 'size'> {
    children?: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps>
export type TableCellAlign = 'left' | 'right'
export interface TableCellProps extends Omit<React.HTMLProps<HTMLDivElement>, 'as'> {
    children: React.ReactNode;
    as?: As;
    align?: TableCellAlign;
}

export const TableCell: React.FC<TableCellProps>

export const TableCellHead: React.FC

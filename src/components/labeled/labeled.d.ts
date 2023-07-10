import { As, StandartSizes } from '../..'
import { MarginWrapperProps } from '../indent-wrapper'

export type LabeledTooltipOnCloseOrOpen = (event: React.SyntheticEvent<HTMLDivElement>) => void
export interface LabeledTooltip {
    title?: string;
    description?: string;
    contents?: string;
    onClose?: LabeledTooltipOnCloseOrOpen;
    onOpen?: LabeledTooltipOnCloseOrOpen;
}

export type LabeledValue = string | Array<string> | boolean

export interface LabeledProps extends Omit<MarginWrapperProps, 'as' | 'value'> {
    as?: As;
    size?: StandartSizes;
    label?: string;
    error?: string;
    description?: string;
    tooltip?: LabeledTooltip;
    value?: LabeledValue;
}

export const Labeled: React.FC<LabeledProps & { children: React.ReactNode }>

export const withLabel: <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => React.FC<LabeledProps & T>

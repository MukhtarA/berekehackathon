import { Sizes } from '../..'
import { MarginWrapperProps } from '../indent-wrapper'

export type DividerSize = keyof Omit<Sizes, 'md'>

export interface DividerProps extends MarginWrapperProps{
    size?: DividerSize;
}

export const Divider: React.FC<DividerProps>

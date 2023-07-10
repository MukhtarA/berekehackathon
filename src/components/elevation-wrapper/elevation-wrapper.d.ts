export type ElevationWrapperMode = 'regular' | 'semibold'

export interface ElevationWrapperProps extends React.HTMLProps<HTMLDivElement> {
    active?: boolean;
    mode?: ElevationWrapperMode;
}

export const ElevationWrapperZero: React.FC<ElevationWrapperProps>
export const ElevationWrapperOne: React.FC<ElevationWrapperProps>

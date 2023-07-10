import React from 'react'

import { Status } from '../..'
import { MarginWrapperProps } from '../indent-wrapper'

export type AlertMode = keyof Omit<Status, 'primary'>

export interface AlertA11y {
    title?: string;
    role?: string;
}

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
    mode: AlertMode;
    children?: React.ReactNode;
    noIcon?: boolean;
    a11y?: AlertA11y;
}

export class Alert extends React.PureComponent<AlertProps, unknown> {
    public render (): React.ReactNode;
}

export type AlertActionsMode = keyof Omit<Status, 'primary'>

export interface AlertActionsProps extends MarginWrapperProps {
    children?: React.ReactNode;
    mode?: AlertActionsMode;
}

export const AlertActions: React.FC<AlertActionsProps>

export const AlertTitle: React.FC

export const AlertDescription: React.FC

import React from 'react'

import { ColorScheme } from '../..'

export interface IconProps extends React.HTMLProps<HTMLSpanElement> {
    icon: string;
    name?: string;
    namespace?: string;
    colorScheme?: ColorScheme;
    fullWidth?: boolean;
    className?: string;
}

export const Icon: React.FC<IconProps>

export type IconLoaderOnError = (error: Error) => void
export interface IconLoaderProps extends Omit<IconProps, 'onError' | 'icon'> {
    name: string;
    onError?: IconLoaderOnError;
}

type IconLoaderNamespace = Record<string, string> | (() => Promise<unknown>)

export class IconLoader extends React.Component<IconLoaderProps, unknown> {
    public static addIcons (namespace: string, promise: IconLoaderNamespace): void;
    public static namespaces: Record<string, IconLoaderNamespace>
    public render (): React.ReactNode;
}

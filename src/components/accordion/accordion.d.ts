import React from 'react'

import { ContainerProps } from '../indent-wrapper'
import { HSizes, Status } from '../..'

export type AccordionSize = keyof Omit<HSizes, 'h1' | 'h2'>

export type AccordionOnChange = (active: number, event: React.SyntheticEvent<HTMLButtonElement>, isClosing: boolean) => void
export type AccordionOnKeyDown = (id: number, event: React.KeyboardEvent<HTMLButtonElement>) => void

export interface AccordionProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size' | 'onChange' | 'onKeyDown' > {
    children: React.ReactNode;
    onChange?: AccordionOnChange;
    onKeyDown?: AccordionOnKeyDown;
    /**
     * Если нужно держать открытыми несколько блоков
     */
    collapsible?: boolean;
    size?: AccordionSize;
}

export class Accordion extends React.PureComponent<AccordionProps, unknown> {
    public render (): React.ReactNode;
}

export type AccordionItemStatusIcon = keyof Pick<Status, 'success' | 'info' | 'warning'>
export type AccordionItemSize = keyof Pick<HSizes, 'h3' | 'h4' | 'h5'>

export type AccordionItemRefWrapper = (element: React.RefObject<HTMLDivElement>) => void
export type AccordionItemOnKeyDown = (id: number, event: React.KeyboardEvent<HTMLButtonElement>) => void

export interface AccordionItemProps extends Omit<React.HTMLProps<HTMLDivElement>, 'size' | 'onKeyDown' | 'aria-level'> {
    children?: React.ReactNode
    id: string;
    statusIcon?: AccordionItemStatusIcon;
    size?: AccordionItemSize;
    forceOpened?: boolean;
    onKeyDown?: AccordionItemOnKeyDown;
    'aria-level'?: string;
    collapsible?: boolean;
    refWrapper?: AccordionItemRefWrapper;
    unmountClosed?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps>

export interface AccordionContentA11y extends React.HTMLProps<HTMLDivElement> {
    label?: string;
}

export interface AccordionContentProps {
    a11y?: AccordionContentA11y;
}

export const AccordionContent: React.FC<AccordionContentProps>

export interface AccordionHeadingProps extends ContainerProps {
    children: React.ReactNode;
    isOpened?: boolean;
    statusIcon?: AccordionItemStatusIcon;
}

export const AccordionHeading: React.FC<AccordionHeadingProps>

export type AccordionSummaryStatusIcon = keyof Pick<Status, 'success' | 'info' | 'warning'>

export type AccordionSummarySize = keyof Pick<HSizes, 'h3' | 'h4' | 'h5'>

export interface AccordionSummaryProps extends ContainerProps {
    children?: React.ReactNode;
    title?: string;
    icon?: unknown;
    description?: string;
    statusIcon?: AccordionSummaryStatusIcon;
    isOpened?: boolean;
    size?: AccordionSummarySize;
}

export const AccordionSummary: React.FC<AccordionSummaryProps>

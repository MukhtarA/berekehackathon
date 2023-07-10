import {
    HorizontalScrollModeInterface,
    OnClickHTMLButtonElement,
    ScrollContainer
} from '../..'

export type HorizontalScrollMode = keyof HorizontalScrollModeInterface

export interface HorizontalScrollA11y {
    titleBackward?: string;
    titleForward?: string;
}

export type HorizontalScrollOnScroll = (event: React.SyntheticEvent<HTMLDivElement>) => void
export type HorizontalScrollRefWrapper = (element: React.RefObject<HTMLDivElement>) => void


export type HorizontalScrollGetScrollWidth = (scrollLeft: number, current: React.RefObject<HTMLDivElement>) => void

export interface HorizontalScrollProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    mode?: HorizontalScrollMode;
    onScroll?: HorizontalScrollOnScroll;
    refWrapper?: HorizontalScrollRefWrapper;
    a11y?: HorizontalScrollA11y;
    scrollWidth?: number;
    getScrollWidth?: HorizontalScrollGetScrollWidth;
    scrollContainer?: ScrollContainer;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps>

export type SegmentedHorizontalScrollMode = keyof HorizontalScrollModeInterface

export interface SegmentedHorizontalScrollA11y {
    titleBackward?: string;
    titleForward?: string;
}

export interface SegmentedHorizontalScrollScrollContainer {
    Inner?: React.ComponentType;
    Outer?: React.ComponentType;
}
export type SegmentedHorizontalScrollOnChange = (value: string) => void
export interface SegmentedHorizontalScrollProps {
    children: React.ReactNode;
    mode?: SegmentedHorizontalScrollMode;
    onScroll?: HorizontalScrollOnScroll;
    onChange?: SegmentedHorizontalScrollOnChange;
    a11y?: SegmentedHorizontalScrollA11y;
    scrollWidth?: number;
    getScrollWidth?: HorizontalScrollGetScrollWidth;
    scrollContainer?: SegmentedHorizontalScrollScrollContainer;
    refWrapper?: HorizontalScrollRefWrapper;
}

export const SegmentedHorizontalScroll: React.FC<SegmentedHorizontalScrollProps>

export interface ScrollSegmentProps {
    title?: string;
    onClick?: OnClickHTMLButtonElement;
    active?: boolean;
    disabled?: boolean;
    className?: string;
}

export const ScrollSegment: React.FC<ScrollSegmentProps>

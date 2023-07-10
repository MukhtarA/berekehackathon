export type TooltipsOnClick = (event: React.SyntheticEvent<HTMLDivElement>) => void

export interface TooltipProps {
    children?: React.ReactNode;
    forceOpened?: boolean;
    onClick?: TooltipsOnClick;
}

export const Tooltip: React.FC<TooltipProps>

export type TipDirection = 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter'

export interface TipProps extends React.HTMLProps<HTMLDivElement> {
    /**
     * Направление отображения подсказки относительно родителя
     */
    direction?: TipDirection;
    title?: string;
    description?: string;
    forceOpened?: boolean;
    error?: boolean;
}

export const Tip: React.FC<TipProps>

export type TooltipOnCloseOrOpen = (event: React.SyntheticEvent<HTMLDivElement>) => void

export interface TooltipClickProps extends Omit<TooltipProps, 'forceOpened'> {
    onOpen?: TooltipOnCloseOrOpen;
    onClose?: TooltipOnCloseOrOpen;
}

export const TooltipClick: React.FC<TooltipClickProps>

export type TooltipHoverProps = TooltipClickProps & Pick<TooltipProps, 'forceOpened'>

export const TooltipHover: React.FC<TooltipHoverProps>

import { FunctionWithoutArguments } from '../..'

export interface CalendarRestriction {
    start?: Record<string, unknown>;
    end?: Record<string, unknown>;
}

export interface CalendarA11y {
    label?: string;
}

export type CalendarOnChange = (value: string | number) => void
export type CalendarOnBlurOrFocus = (value: void) => void

export interface CalendarProps {
    /**
     * ISO строка даты для отображения
     */
    initialViewDate?: string;
    /**
     * ISO строка вабранной даты
     */
    initialDate?: string;
    /**
     * Вызов с ISO строкой даты
     */
    onChange?: CalendarOnChange;
    onBlur?: CalendarOnBlurOrFocus;
    onFocus?: CalendarOnBlurOrFocus;
    /**
     * Допуск временного отрезка
     */
    restriction?: CalendarRestriction;
    /**
     * Лейбл для поля ввода
     */
    label?: string;
    a11y?: CalendarA11y;
    /**
     * Описание для поля ввода
     */
    description?: string;
    /**
     * Заблокировать поле ввода
     */
    disabled?: boolean;
    className?: string;
}

export const Calendar: React.FC<CalendarProps>

export const CalendarMonthYear: React.FC<CalendarProps>

export const CalendarQuarter: React.FC<CalendarProps>

export const CalendarTime: React.FC<CalendarProps>

export interface CalendarRangeProps extends Pick<CalendarProps, 'initialViewDate' | 'onChange' | 'restriction'> {
    initialStart?: string
    initialEnd?: string
    onReset?: FunctionWithoutArguments

}

export const CalendarRange: React.FC<CalendarRangeProps>

export const CalendarYear: React.FC<CalendarProps>

export const CalendarDay: React.FC<CalendarProps>


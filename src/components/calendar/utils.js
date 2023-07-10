import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    eachDayOfInterval,
    eachWeekOfInterval,
    eachMonthOfInterval,
    isSameMonth,
    startOfDecade,
    addYears,
    setMinutes,
    setHours,
    parseISO,
    formatISO,
    parse,
    isWithinInterval,
    format as formatDate,
    isBefore,
    isSameDay
} from 'date-fns'
import { chunk } from 'lodash'

import {
    locale,
    MIN_YEAR_RESTRICTION_DATE,
    MAX_YEAR_RESTRICTION_DATE,
    MONTHS_IN_ROW,
    YEARS_IN_ROW,
    YEARS_IN_DECADE,
    DATE_DEFAULT_HOUR,
    DATE_DEFAULT_MINUTE,
    commonMaskOptions,
    MaskFormat,
    MaskPattern,
    InputMode
} from './constants'

const options = {
    locale,
}

export const setDefaultHHMM = (date) =>
    setMinutes(setHours(date, DATE_DEFAULT_HOUR), DATE_DEFAULT_MINUTE)
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

// Возвращает массив массивов из дней для указанной даты
export const getMonthDates = (date, viewModeLight) => {
    const dateParsed = parseISO(date)
    const monthDates = []

    const weeks = eachWeekOfInterval(
        {
            start: startOfMonth(dateParsed),
            end: endOfMonth(dateParsed),
        },
        options
    )

    weeks.forEach((week, weekIndex) => {
        monthDates[weekIndex] = []

        const days = eachDayOfInterval({
            start: startOfWeek(week, options),
            end: endOfWeek(week, options),
        })

        days.forEach((day, dayIndex) => {
            monthDates[weekIndex][dayIndex] = isSameMonth(dateParsed, day)
                ? formatISO(setDefaultHHMM(day))
                : null
        })
    })

    return monthDates
}

// Возвращает массив массивов из месяцев для указанной даты
export const getYearDates = (date) => {
    const dateParsed = parseISO(date)
    const start = startOfYear(dateParsed)
    const end = endOfYear(dateParsed)
    const yearDates = eachMonthOfInterval({ start, end }).map((month) =>
        formatISO(setDefaultHHMM(month))
    )

    return chunk(yearDates, MONTHS_IN_ROW)
}

// Возвращает массив массивов из десятилетия для указанной даты
export const getDecadeDates = (date) => {
    const dateParsed = parseISO(date)
    const decadeDates = new Array(YEARS_IN_DECADE).fill().map((_, index) => {
        const startDateOfDecade = startOfDecade(dateParsed)
        const nextDateOfDecade = addYears(
            startDateOfDecade,
            parseInt(index, 10)
        )

        return formatISO(setDefaultHHMM(nextDateOfDecade))
    })

    return chunk(decadeDates, YEARS_IN_ROW)
}

export const createMaskOptions = (mode, restriction, mask) => ({
    ...commonMaskOptions,
    pattern: mask || MaskPattern[mode],
    min: Array.isArray(restriction) || !restriction.start ? commonMaskOptions.min : restriction.start,
    max: Array.isArray(restriction) || !restriction.end ? commonMaskOptions.max : restriction.end,
    format: (date) => formatDate(parseISO(date), MaskFormat[mode], { locale }),
    parse: (string) => {
        if (mode === InputMode.DEFAULT) {
            const [day, month, year] = string.split('.')
            return new Date(year, month - 1, day)
        }

        return parse(mode === InputMode.DAY ? string.match(/\d+/g).pop() : string, MaskFormat[mode], new Date(), { locale })
    }
})

export const getInitialError = (date, restriction, validation) => {
    if (!date) {
        return ''
    }

    const dateParsed = parseISO(date)
    const error = Array.isArray(restriction) ? !restriction.some((available) => validation(available, dateParsed)) : !isWithinInterval(dateParsed, restriction)
    
    return error ? ' ' : ''
}

export const getInitialRestriction = (restriction) => {
    if (Array.isArray(restriction) && restriction.length) {
        return restriction
    }

    return {
        start: restriction.start || MIN_YEAR_RESTRICTION_DATE,
        end: restriction.end || MAX_YEAR_RESTRICTION_DATE
    }
}

export const getBackgroundColor = ({ theme, isStartDate, isEndDate, disabled }) => {
    if ((isStartDate || isEndDate) && !disabled) {
        return 'transparent'
    }

    if (disabled) {
        return theme.calendarButtonInvalid
    }

    return theme.calendarButtonWithin
}

export const swapDates = (state) => {
    const { start, end } = state

    // Если дата конца раньше чем дата начала,
    // то свапаем даты местами
    if (isBefore(parseISO(end), parseISO(start))) {
        state.start = end
        state.end = start
    }
}

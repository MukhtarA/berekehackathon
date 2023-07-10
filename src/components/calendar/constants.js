import IMask from 'imask'
import { noop } from 'lodash'
import { startOfDay, endOfDay } from 'date-fns'
import locale from 'date-fns/locale/ru'

export { locale }
export const DATE_DEFAULT_HOUR = 11
export const DATE_DEFAULT_MINUTE = 50
export const MAX_YEAR_RESTRICTION_DATE = endOfDay(new Date(2400, 11, 31))
export const MIN_YEAR_RESTRICTION_DATE = startOfDay(new Date(1900, 0, 1))
export const YEARS_IN_DECADE = 10
export const DAYS_IN_WEEK = 7
export const YEARS_IN_ROW = 3
export const MONTHS_IN_ROW = 3
export const LABEL = 'Выбор даты'
export const SUBMIT_BUTTON_TEXT = 'Применить'
export const RESET_BUTTON_TEXT = 'Сбросить'
// Ровно 4 недели, месяц начинается с понедельника - нужно для идеального календаря с днями
export const IDEAL_FEBRUARY_DATE = '2021-02-01'

export const InputMode = {
    DEFAULT: 'DEFAULT',
    YEAR: 'YEAR',
    'MONTH-YEAR': 'MONTH-YEAR',
    QUARTER: 'QUARTER',
    TIME: 'TIME',
    DAY: 'DAY'
}

export const ViewMode = {
    MONTH: 'MONTH',
    YEAR: 'YEAR',
    DECADE: 'DECADE',
    QUARTER: 'QUARTER',
}

export const DateFormat = {
    MONTH: 'LLLL',
    QUARTER: 'QQQQ',
}

export const MaskFormat = {
    DEFAULT: 'dd.MM.yyyy',
    YEAR: 'yyyy',
    'MONTH-YEAR': 'MM.yyyy',
    QUARTER: 'QQQQ yyyy',
    TIME: 'HH:mm',
    DAY: 'dd'
}

export const MaskPattern = {
    DEFAULT: 'd{.}`m{.}`Y',
    YEAR: 'Y',
    'MONTH-YEAR': 'm{.}`Y',
    QUARTER: 'q{-й квартал }`Y',
    TIME: 'hh{:}`mm',
    DAY: '{Каждое} D{-е число}'
}

export const commonMaskOptions = {
    // Отменяем валидирование даты,
    // есть специфичный кейс (баг в самом imask),
    // при котором 30.02.xxxx просто застопорится из-за невалидной даты
    // В свою очередь останется некоторая валидация на набор даты:
    // Нельзя ввести день больше 31
    // Нельзя ввести месяц больше 12
    // Нельзя ввести год меньше чем restriction.start
    // Нельзя ввести год больше чем restriction.end
    mask: Date,
    min: MIN_YEAR_RESTRICTION_DATE,
    max: MAX_YEAR_RESTRICTION_DATE,
    validate: noop,
    unmask: false,
    lazy: false,
    autofix: true,
    overwrite: true,
    blocks: {
        // Дополнительный блок квартала к уже существующим (d, m, Y)
        q: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 4,
            maxLength: 1,
        },
        hh: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
            maxLength: 2,
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            maxLength: 2,
        },
        D: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 28,
            maxLength: 2,
        },
    },
}

//  Завести issue в date-fns
export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
// export const weekdays = [...new Array(DAYS_IN_WEEK).keys()].map((i) => {
//     return capitalize(locale.localize.day(i, { width: 'short' }))
// })

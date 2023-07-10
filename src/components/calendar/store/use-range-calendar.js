import { useReducer } from 'react'
import { formatISO, isSameDay } from 'date-fns'

import {
    MIN_YEAR_RESTRICTION_DATE,
    MAX_YEAR_RESTRICTION_DATE,
} from '../constants'
import { getInitialError } from '../utils'

import reducer from './reducer'

export const useRangeCalendar = (props) => {
    const {
        initialViewDate = formatISO(new Date()),
        initialStart = '',
        initialEnd = '',
        restriction = {
            start: MIN_YEAR_RESTRICTION_DATE,
            end: MAX_YEAR_RESTRICTION_DATE,
        },
    } = props

    const [state, dispatch] = useReducer(reducer, {
        start: initialStart,
        end: initialEnd,
        viewDate: initialViewDate,
        initialViewDate,
        startError: getInitialError(initialStart, restriction, isSameDay),
        endError: getInitialError(initialEnd, restriction, isSameDay),
        restriction,
    })

    return [state, dispatch]
}

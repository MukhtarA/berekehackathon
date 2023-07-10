import { useEffect, useReducer } from 'react'
import { noop } from 'lodash'
import { formatISO, parseISO, getDate, isSameDay } from 'date-fns'

import {
    MIN_YEAR_RESTRICTION_DATE,
    MAX_YEAR_RESTRICTION_DATE,
    LABEL,
} from '../constants'
import { getInitialError, getInitialRestriction } from '../utils'

import reducer from './reducer'

export const useCalendar = (props) => {
    const {
        onChange = noop,
        initialViewDate = formatISO(new Date()),
        initialDate = '',
        restriction = {
            start: MIN_YEAR_RESTRICTION_DATE,
            end: MAX_YEAR_RESTRICTION_DATE,
        },
        label = LABEL,
        description = '',
        a11y = {
            label: LABEL,
        },
        disabled = false,
        readonly = false,
        day = false,
        error: initialError = '',
        validation = isSameDay
    } = props

    const initialRestriction = getInitialRestriction(restriction)

    const [state, dispatch] = useReducer(reducer, {
        initialDate,
        date: initialDate,
        viewDate: initialViewDate,
        initialViewDate,
        error: initialError || getInitialError(initialDate, initialRestriction, validation),
        restriction: initialRestriction,
        disabled,
        readonly,
        label,
        description,
        a11y,
        validation
    })

    const { initialDate: newInitialDate, date, error } = state

    useEffect(() => {
        if (!error) {
            if (day) {
                const dayNumber = getDate(parseISO(date))
                onChange(dayNumber)
            } else {
                onChange(date)
            }
        }
    }, [newInitialDate, date, error, day])

    return [state, dispatch]
}

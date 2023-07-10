import { isUndefined } from 'lodash'

import { swapDates, getInitialError, getInitialRestriction } from '../../utils'
import { SET_STATE, SET_DATE, REMOVE_DATE, SET_VIEW_DATE } from '../actions/types'
// comment: complexity of 14
export default (state, action) => {
    switch (action.type) {
        case SET_STATE: {
            const { initialDate, error, initialViewDate, initialStart, initialEnd, restriction, validation, ...rest } = action.payload
  
            const newState = {
                ...state,
                ...rest,
                error,
                viewDate: initialViewDate || state.viewDate,
                initialViewDate: initialViewDate || state.initialViewDate,
                ...restriction && { restriction: getInitialRestriction(restriction) }
            }

            if (initialDate) {
                newState.date = initialDate
                newState.error = error || getInitialError(initialDate, newState.restriction, validation)
            }

            if (initialStart) {
                newState.start = initialStart
                newState.startError = getInitialError(initialStart, newState.restriction, validation)
            }

            if (initialEnd) {
                newState.end = initialEnd
                newState.endError = getInitialError(initialEnd, newState.restriction, validation)
            }

            return newState
        }

        case SET_DATE: {
            const { date, validation, field } = action.payload
            const { restriction, start, end } = state

            const error = getInitialError(date, restriction, validation)
            const newState = {
                ...state,
                viewDate: date,
                [field ? `${field}Error` : 'error']: error ? ' ' : '',
            }

            if (!isUndefined(start) && !isUndefined(end)) {
                if (field) {
                    newState[field] = date
                    // Если происходит выбор без явного указания поля (через дропдаун),
                    // и при этом поля инициализированы - значит активен режим выбора диапазона дат
                } else if (!start) {
                    newState.start = date
                } else if (!end) {
                    newState.end = date
                } else {
                    newState.startError = ''
                    newState.endError = ''
                    newState.start = date
                    newState.end = null
                }

                swapDates(newState)
            } else {
                newState.date = date
            }

            return newState
        }

        case REMOVE_DATE: {
            const field = action.payload || 'date'

            if (field === 'both') {
                return {
                    ...state,
                    start: null,
                    end: null,
                    startError: '',
                    endError: ''
                }
            }

            return {
                ...state,
                [field]: '',
                [action.payload ? `${field}Error` : 'error']: '',
            }
        }

        case SET_VIEW_DATE: {
            return {
                ...state,
                viewDate: action.payload,
            }
        }

        default: {
            return state
        }
    }
}

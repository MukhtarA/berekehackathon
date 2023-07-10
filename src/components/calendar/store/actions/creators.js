import { SET_STATE, SET_DATE, REMOVE_DATE, SET_VIEW_DATE } from './types'

export const setState = (state) => ({
    type: SET_STATE,
    payload: state
})

export const setDate = (date, validation, field) => ({
    type: SET_DATE,
    payload: {
        date,
        validation,
        field,
    },
})

export const setViewDate = (viewDate) => ({
    type: SET_VIEW_DATE,
    payload: viewDate,
})

export const removeDate = (field) => ({ type: REMOVE_DATE, payload: field })

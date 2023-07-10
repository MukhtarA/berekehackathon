import { createSlice } from '@reduxjs/toolkit'
import { uniqueId } from 'lodash'

const initialState = []

const toastNotificationsSlice = createSlice({
    name: 'toastNotifications',
    initialState,
    reducers: {
        addToastNotification: (state, action) => {
            state.push({ id: uniqueId(), message: action.payload })
        },
        removeToastNotification: (state, action) => {
            const listItem = state.findIndex((e) => e.id === action.payload.id)
            state.splice(listItem, 1)
        }
    }
})

export const { addToastNotification, removeToastNotification } = toastNotificationsSlice.actions

export default toastNotificationsSlice.reducer

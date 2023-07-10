import React, { useMemo, useEffect } from 'react'
import { isSameMonth } from 'date-fns'

import { setState } from '../store/actions/creators'
import {
    InputMode,
    ViewMode,
} from '../constants'
import { Input } from '../components/input'
import { withDropdown } from '../hoc'
import { Context } from '../store/context'
import { useCalendar } from '../store/use-calendar'

export const CalendarMonthYear = (props) => {
    const { onBlur, onFocus } = props
    const [state, dispatch] = useCalendar({ ...props, validation: isSameMonth })

    const WrappedInput = useMemo(() => withDropdown(Input), [])
    const context = useMemo(() => ({ state, dispatch }), [state, dispatch])

    useEffect(() => {
        dispatch(setState({ ...props, validation: isSameMonth }))
    }, [dispatch, props])

    return (
        <Context.Provider value={context}>
            <WrappedInput className={props.className} mode={InputMode['MONTH-YEAR']} viewMode={ViewMode.YEAR} onBlur={onBlur} onFocus={onFocus} validation={isSameMonth} />
        </Context.Provider>
    )
}

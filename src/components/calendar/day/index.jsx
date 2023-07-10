import React, { useMemo, useEffect } from 'react'

import { setState } from '../store/actions/creators'
import {
    InputMode,
    ViewMode,
} from '../constants'
import { Input } from '../components/input'
import { withDropdown } from '../hoc'
import { Context } from '../store/context'
import { useCalendar } from '../store/use-calendar'

export const CalendarDay = (props) => {
    const [state, dispatch] = useCalendar({ ...props, day: true })

    const WrappedInput = useMemo(() => withDropdown(Input), [])
    const context = useMemo(() => ({ state, dispatch }), [state, dispatch])

    useEffect(() => {
        dispatch(setState(props))
    }, [dispatch, props])

    return (
        <Context.Provider value={context}>
            <WrappedInput className={props.className} mode={InputMode.DAY} viewMode={ViewMode.MONTH} viewModeLight mask={props.mask} />
        </Context.Provider>
    )
}

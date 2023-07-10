import React, { useMemo, useEffect } from 'react'
import { isSameYear } from 'date-fns'

import { setState } from '../store/actions/creators'
import {
    InputMode,
    ViewMode,
} from '../constants'
import { Input } from '../components/input'
import { withDropdown } from '../hoc'
import { Context } from '../store/context'
import { useCalendar } from '../store/use-calendar'

export const CalendarYear = (props) => {
    const { onBlur, onFocus } = props
    const [state, dispatch] = useCalendar({ ...props, validation: isSameYear })

    const WrappedInput = useMemo(() => withDropdown(Input), [])
    const context = useMemo(() => ({ state, dispatch }), [state, dispatch])

    useEffect(() => {
        dispatch(setState({ ...props, validation: isSameYear }))
    }, [dispatch, props])

    return (
        <Context.Provider value={context}>
            <WrappedInput className={props.className} mode={InputMode.YEAR} viewMode={ViewMode.DECADE} onBlur={onBlur} onFocus={onFocus} validation={isSameYear} />
        </Context.Provider>
    )
}

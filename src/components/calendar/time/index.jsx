import React, { useMemo, useEffect } from 'react'

import { setState } from '../store/actions/creators'
import {
    InputMode,
} from '../constants'
import { Input } from '../components/input'
import { Context } from '../store/context'
import { useCalendar } from '../store/use-calendar'

export const CalendarTime = (props) => {
    const { onBlur, onFocus } = props
    const [state, dispatch] = useCalendar(props)

    const context = useMemo(() => ({ state, dispatch }), [state, dispatch])

    useEffect(() => {
        dispatch(setState(props))
    }, [dispatch, props])

    return (
        <Context.Provider value={context}>
            <Input mode={InputMode.TIME} className={props.className} onBlur={onBlur} onFocus={onFocus} />
        </Context.Provider>
    )
}

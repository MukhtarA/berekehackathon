import React, {
    useMemo,
    useEffect
} from 'react'
import PropTypes from 'prop-types'
import { isSameDay } from 'date-fns'

import { Input } from './components/input'
import { withDropdown } from './hoc'
import { setState } from './store/actions/creators'
import { Context } from './store/context'
import { useCalendar } from './store/use-calendar'


export const Calendar = (props) => {
    const { onBlur, onFocus } = props
    const [state, dispatch] = useCalendar({ ...props, validation: isSameDay })

    const WrappedInput = useMemo(() => withDropdown(Input), [])
    const context = useMemo(() => ({ state, dispatch }), [state, dispatch])

    useEffect(() => {
        dispatch(setState({ ...props, validation: isSameDay }))
    }, [dispatch, props])

    return (
        <Context.Provider value={context}>
            <WrappedInput className={props.className} onBlur={onBlur} onFocus={onFocus} />
        </Context.Provider>
    )
}

Calendar.propTypes = {
    /**
     * ISO строка даты для отображения
     */
    initialViewDate: PropTypes.string,
    /**
     * ISO строка вабранной даты
     */
    initialDate: PropTypes.string,
    /**
     * Вызов с ISO строкой даты
     */
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    /**
     * Допуск временного отрезка или массив допустимых дат
     */
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array]),
    /**
     * Лейбл для поля ввода
     */
    label: PropTypes.string,
    a11y: PropTypes.shape({
        label: PropTypes.string
    }),
    /**
     * Описание для поля ввода
     */
    description: PropTypes.string,
    /**
     * Заблокировать поле ввода
     */
    disabled: PropTypes.bool,
    className: PropTypes.string
}

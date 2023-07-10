import React, { useMemo, useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { formatISO, format, parseISO } from 'date-fns'

import { InputMode, MaskFormat } from '../../constants'
import { Context } from '../../store/context'
import { TextFieldMasked } from '../../../text-field'
import { setDate, removeDate, setViewDate } from '../../store/actions/creators'
import { createMaskOptions, setDefaultHHMM } from '../../utils'

export const RangeInput = ({ field }) => {
    const [value, setValue] = useState('')
    const { state, dispatch } = useContext(Context)

    const { restriction, initialViewDate } = state

    const error = state[`${field}Error`]
    const date = state[field]
    const otherDate = field === 'start' ? state.end : state.start

    const maskOptions = useMemo(
        () => createMaskOptions(InputMode.DEFAULT, restriction),
        [restriction]
    )
    
    const handleChange = useCallback(
        (_, { masked, value: newValue }) => {
            const { isComplete, rawInputValue } = masked
            
            setValue(newValue)

            if (isComplete) {
                const { date: newDateParsed } = masked
                const newDate = formatISO(setDefaultHHMM(newDateParsed))


                // Установка нового значения через дропдаун тригерит этот onChange
                // снова с этим значением
                if (date !== newDate) {
                    dispatch(setDate(newDate, null, field))
                }
            } else if (date) {
                // Если пользователь стёр символ,
                // удаляем дату
                dispatch(removeDate(field))
            }

            // Если пользователь стёр оба поля,
            // возвращаем стартовую страницу,
            // иначе переключаем на экран другой даты
            if (!rawInputValue) {
                if (!otherDate) {
                    dispatch(setViewDate(initialViewDate))
                } else {
                    dispatch(setViewDate(otherDate))
                }
            }
        },
        [date, otherDate, field]
    )

    useEffect(() => {
        if (date) {
            // В случае если дата была выбрана через дропдаун
            const newValue = format(parseISO(date), MaskFormat.DEFAULT)
            
            if (newValue !== value) {
                setValue(newValue)
            }
            // null нужен для того, чтобы понимать, что дата была стерта через дропдаун,
            // а не руками
        } else if (value && date === null) {
            setValue('')
        }
    }, [date])

    return (
        <TextFieldMasked
            maskOptions={maskOptions}
            value={value}
            onChange={handleChange}
            error={error}
        />
    )
}

RangeInput.propTypes = {
    field: PropTypes.oneOf(['start', 'end'])
}

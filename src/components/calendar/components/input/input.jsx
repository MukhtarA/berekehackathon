import React, { useCallback, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { formatISO, getDate, parseISO } from 'date-fns'
import { noop } from 'lodash'

import { ic36Calendar, ic36Clock } from '../../../icon/common'
import { setDate, setViewDate, removeDate } from '../../store/actions/creators'
import { Context } from '../../store/context'
import { LabeledTextFieldMasked } from '../../../text-field'
import { InputMode } from '../../constants'
import { createMaskOptions, setDefaultHHMM } from '../../utils'

export const Input = ({ onClick = noop, onBlur = noop, onFocus = noop, mode = InputMode.DEFAULT, viewModeLight, mask, className }) => {
    const { state, dispatch } = useContext(Context)

    const {
        id,
        date,
        error,
        readonly,
        initialViewDate,
        restriction,
        label,
        description,
        a11y,
        disabled,
        validation
    } = state

    function handleBlur () {
        onBlur()
    }

    function handleFocus () {
        onFocus()
    }

    const handleChange = useCallback(
        (_, { masked }) => {
            const { isComplete, rawInputValue } = masked

            if (isComplete) {
                const { date: newDateParsed } = masked
                // Если инпут не является типом Time,
                // то выставляем стандартные настройки для часов и минут,
                // чтобы покрывать большинство таймзон
                const newDate = formatISO(
                    mode === InputMode.TIME
                        ? newDateParsed
                        : setDefaultHHMM(newDateParsed)
                )

                // Установка нового значения через дропдаун тригерит этот onChange
                // снова с этим значением
                if ((!viewModeLight && date !== newDate) || (viewModeLight && getDate(newDateParsed) !== getDate(parseISO(date)))) {
                    dispatch(setDate(newDate, validation))
                }
            } else if (date) {
                // Если пользователь стёр символ,
                // удаляем дату
                dispatch(removeDate())
            }

            if (!rawInputValue) {
                // Если пользователь стёр всё,
                // возвращаем стартовую страницу
                dispatch(setViewDate(initialViewDate))
            }
        },
        [date]
    )

    const maskOptions = useMemo(() => createMaskOptions(mode, restriction, mask), [
        restriction
    ])
    
    return (
        <LabeledTextFieldMasked
            id={id}
            disabled={disabled}
            label={label}
            description={description}
            a11y={a11y}
            maskOptions={maskOptions}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={onClick}
            {...(date ? { value: maskOptions.format(date) } : {})}
            error={error}
            readonly={readonly}
            icon={mode === InputMode.TIME ? ic36Clock : ic36Calendar}
            className={className}
            inputMode="numeric"
        />
    )
}

Input.propTypes = {
    mode: PropTypes.oneOf(Object.keys(InputMode)),
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
}

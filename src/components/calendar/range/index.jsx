import React, { useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Dropdown } from '../components/dropdown'
import {
    TypographyStyled,
} from '../components/button/button.style'
import { Context } from '../store/context'
import { useRangeCalendar } from '../store/use-range-calendar'
import { SUBMIT_BUTTON_TEXT, RESET_BUTTON_TEXT } from '../constants'
import { removeDate, setState } from '../store/actions/creators'

import { RangeInput } from './components/input'
import { CalendarStyled, InputsContainerStyled, ControlsStyled, SubmitButtonStyled, ResetButtonStyled } from './range.style'

export const CalendarRange = (props) => {
    const [state, dispatch] = useRangeCalendar(props)

    const { onChange, onReset } = props
    const { start, end, startError, endError } = state

    const error = startError || endError
    const empty = !start || !end

    const context = useMemo(() => ({ state, dispatch }), [state, dispatch])

    const handleChange = useCallback(() => {
        onChange({
            start,
            end,
        })
    }, [start, end, onChange])

    const handleReset = useCallback(() => {
        onReset()
        dispatch(removeDate('both'))
    }, [dispatch, onReset])

    useEffect(() => {
        dispatch(setState(props))
    }, [dispatch, props])

    return (
        <Context.Provider value={context}>
            <CalendarStyled>
                <InputsContainerStyled>
                    <RangeInput field="start" />
                    <RangeInput field="end" />
                </InputsContainerStyled>
                <Dropdown />
                <ControlsStyled>
                    <ResetButtonStyled
                        onClick={handleReset}
                    >
                        <TypographyStyled colorScheme="black">{RESET_BUTTON_TEXT}</TypographyStyled>
                    </ResetButtonStyled>
                    <SubmitButtonStyled
                        onClick={handleChange}
                        disabled={error || empty}
                    >
                        <TypographyStyled colorScheme={error || empty ? 'black' : 'white'}>{SUBMIT_BUTTON_TEXT}</TypographyStyled>
                    </SubmitButtonStyled>
                </ControlsStyled>
            </CalendarStyled>
        </Context.Provider>
    )
}

CalendarRange.propTypes = {
    /**
     * ISO строка даты для отображения
     */
    initialViewDate: PropTypes.string,
    /**
     * ISO строка вабранной даты начала
     */
    initialStart: PropTypes.string,
    /**
     * ISO строка вабранной даты конца
     */
    initialEnd: PropTypes.string,
    /**
     * Вызов с объектом  c ISO строками дат
     */
    onChange: PropTypes.func,
    onReset: PropTypes.func,
    /**
     * Допуск временного отрезка
     */
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array])
}

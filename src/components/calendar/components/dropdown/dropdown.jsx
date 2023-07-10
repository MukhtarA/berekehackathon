import React, { useState, useMemo, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { format, parseISO, formatISO, getYear, setYear } from 'date-fns'
import { noop } from 'lodash'

import { setDate, setViewDate } from '../../store/actions/creators'
import { Context } from '../../store/context'
import { DateFormat, ViewMode, locale } from '../../constants'
import { Month } from '../../views/month'
import { Year } from '../../views/year'
import { Decade } from '../../views/decade'
import { Quarter } from '../../views/quarter'
import { DefaultButton } from '../button'
import { capitalize } from '../../utils'
import { Typography } from '../../../typography'

import { DropdownStyled, HeaderStyled } from './dropdown.style'

export const Dropdown = ({
    onClick = noop,
    viewMode: initialViewMode = ViewMode.MONTH,
    viewModeLight = false
}) => {
    const { state, dispatch } = useContext(Context)
    const { date, start, end, viewDate, restriction, validation } = state

    const [viewMode, setViewMode] = useState(initialViewMode)
    const viewDateParsed = useMemo(() => parseISO(viewDate), [viewDate])
    const viewYearText = useMemo(() => getYear(viewDateParsed), [
        viewDateParsed,
    ])
    const viewMonthText = useMemo(
        () =>
            capitalize(
                format(viewDateParsed, DateFormat[initialViewMode] || DateFormat.MONTH, { locale })
            ),
        [viewDateParsed]
    )

    const handleDateClick = useCallback(
        (newDate) => {
            
            // Если открыта стартовая страница,
            // то выбираем дату и закрываем дропдаун
            if (initialViewMode === viewMode) {
                onClick()
                dispatch(setDate(newDate, validation))
            } else {
                // При выборе года учитываем текущий выбранный месяц
                dispatch(setViewDate(
                    viewMode === ViewMode.DECADE
                        ?
                        formatISO(setYear(viewDateParsed, getYear(parseISO(newDate))))
                        :
                        newDate
                ))
                setViewMode(initialViewMode)
            }
        },
        [initialViewMode, viewMode, onClick]
    )

    const handleMonthSelectionClick = useCallback(() => {
        if (viewMode !== ViewMode.YEAR) {
            setViewMode(ViewMode.YEAR)
        } else {
            setViewMode(ViewMode.MONTH)
        }
    }, [viewMode])

    const handleYearSelectionClick = useCallback(() => {
        if (viewMode !== ViewMode.DECADE) {
            setViewMode(ViewMode.DECADE)
        } else {
            setViewMode(initialViewMode)
        }
    }, [viewMode])

    const passedProps = {
        viewDate,
        date,
        start,
        end,
        restriction,
        onClick: handleDateClick,
    }

    return (
        <DropdownStyled>
            {!viewModeLight && <HeaderStyled>
                {initialViewMode === ViewMode.MONTH ? (
                    <DefaultButton
                        opened={viewMode === ViewMode.YEAR}
                        onClick={handleMonthSelectionClick}
                    >
                        {viewMonthText}
                    </DefaultButton>
                ) : (
                    <Typography fontWeight="medium">
                        {viewMonthText}
                    </Typography>
                )}
                {initialViewMode === ViewMode.DECADE ? (
                    <Typography fontWeight="medium">
                        {viewYearText}
                    </Typography>
                ) : (
                    <DefaultButton
                        opened={viewMode === ViewMode.DECADE}
                        onClick={handleYearSelectionClick}
                    >
                        {viewYearText}
                    </DefaultButton>
                )}
            </HeaderStyled>}
            {/* Вставляем тело календаря, один из views/ компонентов  */}
            {viewMode === ViewMode.MONTH && <Month {...passedProps} viewModeLight={viewModeLight} />}
            {viewMode === ViewMode.YEAR && <Year {...passedProps} />}
            {viewMode === ViewMode.DECADE && <Decade {...passedProps} />}
            {viewMode === ViewMode.QUARTER && <Quarter {...passedProps} />}
        </DropdownStyled>
    )
}

Dropdown.propTypes = {
    initialViewDate: PropTypes.string,
    date: PropTypes.string,
    onClick: PropTypes.func,
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array]),
    viewMode: PropTypes.oneOf(Object.keys(ViewMode)),
    viewModeLight: PropTypes.bool
}

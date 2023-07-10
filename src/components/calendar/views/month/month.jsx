import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import {
    parseISO,
    getDate,
    isSameDay,
    isToday,
    isWithinInterval,
} from 'date-fns'

import { getMonthDates } from '../../utils'
import { IDEAL_FEBRUARY_DATE, weekdays } from '../../constants'
import { DateButton } from '../../components/button'

import {
    TableStyled,
    HeadStyled,
    HeadlineStyled,
    BodyStyled,
    RowStyled,
    CellStyled,
} from './month.style'

export const Month = ({
    viewDate,
    date,
    start: startDate,
    end: endDate,
    restriction,
    onClick = noop,
    viewModeLight
}) => {
    const dateParsed = useMemo(() => parseISO(date), [date])
    const startParsed = useMemo(() => parseISO(startDate), [startDate])
    const endParsed = useMemo(() => parseISO(endDate), [endDate])
    // При mode light нужно чтобы первый день месяца начинался с понедельника и являлся февралем
    const monthDates = useMemo(() => getMonthDates(viewModeLight ? IDEAL_FEBRUARY_DATE : viewDate), [viewDate, viewModeLight])

    return (
        <TableStyled viewModeLight={viewModeLight}>
            {!viewModeLight && <HeadStyled>
                <RowStyled>
                    {weekdays.map((weekday) => (
                        <HeadlineStyled key={weekday}>{weekday}</HeadlineStyled>
                    ))}
                </RowStyled>
            </HeadStyled>}
            <BodyStyled>
                {monthDates.map((week) => (
                    <RowStyled key={week.join('')}>
                        {week.map((day) => {
                            if (day) {
                                const dayParsed = parseISO(day)
                                const number = getDate(dayParsed)
                                const active = viewModeLight ? getDate(dateParsed) === getDate(dayParsed) : isSameDay(dayParsed, dateParsed)
                                const start = isSameDay(dayParsed, startParsed)
                                const end = isSameDay(dayParsed, endParsed)
                                const within =
                                    startDate &&
                                    endDate &&
                                    isWithinInterval(dayParsed, {
                                        start: startParsed,
                                        end: endParsed,
                                    })
                                const current = isToday(dayParsed)
                                const disabled = Array.isArray(restriction)
                                    ?
                                    restriction.every((available) => !isSameDay(available, dayParsed))
                                    :
                                    !isWithinInterval(
                                        dayParsed,
                                        restriction
                                    )

                                return (
                                    <CellStyled
                                        key={day}
                                        isStartDate={start}
                                        isEndDate={end}
                                        within={within}
                                        disabled={disabled}
                                    >
                                        <DateButton
                                            active={active}
                                            isStartDate={start}
                                            isEndDate={end}
                                            current={current}
                                            disabled={disabled}
                                            date={day}
                                            onClick={onClick}
                                            text={number}
                                        />
                                    </CellStyled>
                                )
                            }

                            return null
                        })}
                    </RowStyled>
                ))}
            </BodyStyled>
        </TableStyled>
    )
}

Month.propTypes = {
    viewDate: PropTypes.string,
    date: PropTypes.string,
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array]),
    onClick: PropTypes.func,
}

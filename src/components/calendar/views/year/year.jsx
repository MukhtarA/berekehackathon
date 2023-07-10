import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import {
    parseISO,
    format,
    isSameMonth,
    isThisMonth,
    areIntervalsOverlapping,
    isWithinInterval,
    startOfMonth,
    endOfMonth,
} from 'date-fns'
import locale from 'date-fns/locale/ru'

import { DateFormat } from '../../constants'
import { getYearDates, capitalize } from '../../utils'
import { DateButton } from '../../components/button'

import { TableStyled, BodyStyled, RowStyled, CellStyled } from './year.style'

export const Year = ({
    viewDate,
    date,
    restriction,
    onClick = noop,
    start: startDate,
    end: endDate,
}) => {
    const dateParsed = useMemo(() => parseISO(date), [date])
    const startParsed = useMemo(() => parseISO(startDate), [startDate])
    const endParsed = useMemo(() => parseISO(endDate), [endDate])
    const yearDates = useMemo(() => getYearDates(viewDate), [viewDate])

    return (
        <TableStyled>
            <BodyStyled>
                {yearDates.map((quarter) => {
                    // Разбирмем сначала кварталы, а затем месяцы
                    const quarterDates = quarter.map((month) => {
                        const monthParsed = parseISO(month)
                        const name = capitalize(
                            format(monthParsed, DateFormat.MONTH, { locale })
                        )
                        const active = isSameMonth(dateParsed, monthParsed)
                        const start = isSameMonth(monthParsed, startParsed)
                        const end = isSameMonth(monthParsed, endParsed)
                        const within =
                            startDate &&
                            endDate &&
                            isWithinInterval(monthParsed, {
                                start: startOfMonth(startParsed),
                                end: endOfMonth(endParsed),
                            })
                        const current = isThisMonth(monthParsed)
                        // Проверяем, что месяц попадает под ограничения
                        const disabled = Array.isArray(restriction)
                            ?
                            restriction.every((available) => !isSameMonth(available, monthParsed))
                            :
                            !areIntervalsOverlapping(restriction, {
                                start: monthParsed,
                                end: endOfMonth(monthParsed),
                            })

                        return (
                            <CellStyled
                                key={month}
                                isStartDate={start}
                                isEndDate={end}
                                disabled={disabled}
                                within={within}
                            >
                                <DateButton
                                    date={month}
                                    active={active}
                                    isStartDate={start}
                                    isEndDate={end}
                                    current={current}
                                    disabled={disabled}
                                    onClick={onClick}
                                    text={name}
                                />
                            </CellStyled>
                        )
                    })

                    return (
                        <RowStyled key={quarter.join('')}>
                            {quarterDates}
                        </RowStyled>
                    )
                })}
            </BodyStyled>
        </TableStyled>
    )
}

Year.propTypes = {
    date: PropTypes.string,
    viewDate: PropTypes.string,
    onClick: PropTypes.func,
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array])
}

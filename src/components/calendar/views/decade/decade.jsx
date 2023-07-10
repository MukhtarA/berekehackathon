import React, { useState, useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import {
    parseISO,
    formatISO,
    endOfDecade,
    addYears,
    subYears,
    getYear,
    isSameYear,
    isThisYear,
    startOfYear,
    endOfYear,
    isAfter,
    areIntervalsOverlapping,
    startOfDecade,
    isEqual,
    isWithinInterval
} from 'date-fns'

import { locale, YEARS_IN_DECADE } from '../../constants'
import { getDecadeDates } from '../../utils'
import { DefaultButton, DateButton } from '../../components/button'

import {
    TableStyled,
    HeadStyled,
    BodyStyled,
    RowStyled,
    CellStyled,
    ControlsStyled,
} from './decade.style'

export const Decade = ({
    viewDate: initialViewDate,
    date,
    start: startDate,
    end: endDate,
    restriction,
    onClick = noop,
}) => {
    const [viewDate, setViewDate] = useState(initialViewDate)

    const dateParsed = useMemo(() => parseISO(date), [date])
    const startParsed = useMemo(() => parseISO(startDate), [startDate])
    const endParsed = useMemo(() => parseISO(endDate), [endDate])
    const viewDateParsed = useMemo(() => parseISO(viewDate), [viewDate])

    const handlePreviousDecadeButtonClick = useCallback(() => {
        setViewDate(formatISO(subYears(viewDateParsed, YEARS_IN_DECADE)))
    }, [viewDateParsed])

    const handleNextDecadeButtonClick = useCallback(() => {
        setViewDate(formatISO(addYears(viewDateParsed, YEARS_IN_DECADE)))
    }, [viewDateParsed])

    // Проверка на выход за пределы допустимого интервала дат
    const previousViewDateIsRestricted = useMemo(
        () =>
            restriction &&
            isEqual(
                startOfDecade(viewDateParsed),
                startOfDecade(restriction.start)
            ),
        [viewDateParsed, restriction]
    )

    const nextViewDateIsRestricted = useMemo(
        () =>
            restriction &&
            isAfter(endOfDecade(viewDateParsed), restriction.end),
        [viewDateParsed, restriction]
    )

    const decade = useMemo(
        () =>
            locale.localize.ordinalNumber(
                getYear(startOfDecade(viewDateParsed)),
                { unit: 'date' }
            ),
        [viewDateParsed]
    )
    const decadeDates = useMemo(() => getDecadeDates(viewDate), [viewDate])

    useEffect(() => {
        const isSameDate = isEqual(
            startOfDecade(parseISO(initialViewDate)),
            startOfDecade(parseISO(viewDate))
        )

        if (!isSameDate) {
            setViewDate(initialViewDate)
        }
    }, [initialViewDate])

    return (
        <TableStyled>
            <HeadStyled>
                <ControlsStyled>
                    <CellStyled>
                        <DefaultButton
                            disabled={previousViewDateIsRestricted}
                            onClick={handlePreviousDecadeButtonClick}
                        />
                    </CellStyled>
                    <CellStyled>{decade}</CellStyled>
                    <CellStyled>
                        <DefaultButton
                            disabled={nextViewDateIsRestricted}
                            onClick={handleNextDecadeButtonClick}
                        />
                    </CellStyled>
                </ControlsStyled>
            </HeadStyled>
            <BodyStyled>
                {decadeDates.map((quarter) => {
                    // Разбирмем пачки по 3 года, а затем сами годы
                    const quarterDates = quarter.map((year) => {
                        const yearParsed = parseISO(year)
                        const number = getYear(yearParsed)
                        const active = isSameYear(dateParsed, yearParsed)
                        const start = isSameYear(yearParsed, startParsed)
                        const end = isSameYear(yearParsed, endParsed)
                        const within =
                            startDate &&
                            endDate &&
                            isWithinInterval(yearParsed, {
                                start: startOfYear(startParsed),
                                end: endOfYear(endParsed),
                            })
                        const current = isThisYear(yearParsed)
                        // Проверяем, что год попадает под ограничения
                        const disabled = Array.isArray(restriction)
                            ?
                            restriction.every((available) => !isSameYear(available, yearParsed))
                            :
                            !areIntervalsOverlapping(restriction, {
                                start: yearParsed,
                                end: endOfYear(yearParsed),
                            })

                        return (
                            <CellStyled key={year} within={within}>
                                <DateButton
                                    date={year}
                                    active={active}
                                    isStartDate={start}
                                    isEndDate={end}
                                    current={current}
                                    disabled={disabled}
                                    onClick={onClick}
                                    text={number}
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

Decade.propTypes = {
    viewDate: PropTypes.string,
    date: PropTypes.string,
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array]),
    onClick: PropTypes.func,
}

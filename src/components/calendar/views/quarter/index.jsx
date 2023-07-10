import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import {
    parseISO,
    format,
    isThisMonth,
    isSameQuarter,
    areIntervalsOverlapping,
    endOfQuarter,
} from 'date-fns'
import locale from 'date-fns/locale/ru'

import { DateFormat } from '../../constants'
import { getYearDates, capitalize } from '../../utils'
import { DateButton } from '../../components/button'

import {
    TableStyled,
    BodyStyled,
    RowStyled,
    CellStyled,
    TitleStyled,
} from './quarter.style'

export const Quarter = ({
    viewDate,
    date,
    restriction,
    onClick = noop,
}) => {
    const dateParsed = useMemo(() => parseISO(date), [date])
    const yearDates = useMemo(() => getYearDates(viewDate), [viewDate])

    return (
        <TableStyled>
            <BodyStyled>
                {yearDates.map((quarter) => {
                    const [firstMonth] = quarter
                    const firstMonthParsed = parseISO(firstMonth)
                    const active = isSameQuarter(firstMonthParsed, dateParsed)
                    const disabled =
                        restriction &&
                        !areIntervalsOverlapping(restriction, {
                            start: firstMonthParsed,
                            end: endOfQuarter(firstMonthParsed),
                        })

                    return (
                        <RowStyled key={quarter.join('')}>
                            <CellStyled>
                                <DateButton
                                    date={firstMonth}
                                    active={active}
                                    disabled={disabled}
                                    onClick={onClick}
                                >
                                    {quarter.map((month) => {
                                        const monthParsed = parseISO(month)
                                        const name = capitalize(
                                            format(
                                                monthParsed,
                                                DateFormat.MONTH,
                                                { locale }
                                            )
                                        )
                                        const current = isThisMonth(
                                            monthParsed
                                        )

                                        return (
                                            <TitleStyled
                                                key={month}
                                                current={current}
                                            >
                                                {name}
                                            </TitleStyled>
                                        )
                                    })}
                                </DateButton>
                            </CellStyled>
                        </RowStyled>
                    )
                })}
            </BodyStyled>
        </TableStyled>
    )
}

Quarter.propTypes = {
    date: PropTypes.string,
    viewDate: PropTypes.string,
    onClick: PropTypes.func,
    restriction: PropTypes.oneOfType([PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
    }), PropTypes.array])
}

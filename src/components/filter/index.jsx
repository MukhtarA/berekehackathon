/* eslint-disable complexity */
import React, { useCallback, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Typography } from '@sbol/design-system/core/typography'
import { Perimeter } from '@sbol/design-system/core/perimeter'
import { CalendarRange } from '@sbol/design-system/core/calendar'

import { formatDate, lastWeekDate, previousMonthDate } from '@web_sbol/shared/src/utils/helpers'
import {
    ChevronDownStyled,
    DatePickerStyled,
    FilterPeriodStyled,
    RadioButtonStyled,
    RadioGroupStyled,
    CalendarWrapperStyled
} from './style'

export const Filter = ({
    onChange,
    start,
    end,
    verticalPadding,
    noTitle,
    period,
    customPadding
}) => {
    const { t } = useTranslation('shared')
    const params = useParams()
    const [periodType, setPeriodType] = useState(period)
    const [calendarActive, setCalendarActive] = useState(false)
    const [open, setOpen] = useState(false)
    const perimeter = useRef(null)

    const toggleSwitch = useCallback(() => {
        setOpen(!open)
    }, [open])

    const handleClose = useCallback(() => {
        setOpen(false)
        setCalendarActive(false)
    }, [setOpen, setCalendarActive])

    const handleOnChange = useCallback(
        (value, periodValue) => {
            if (periodValue === 'week' || periodValue === 'month') {
                setPeriodType(periodValue)
            } else {
                setPeriodType('custom')
            }

            handleClose()
            onChange(value, periodValue)
        },
        [onChange, handleClose]
    )

    const handleWeek = useCallback(() => {
        handleOnChange({ start: lastWeekDate(new Date()), end: new Date() }, 'week')
    }, [handleOnChange])

    const handleMonth = useCallback(() => {
        handleOnChange({ start: previousMonthDate(new Date()), end: new Date() }, 'month')
    }, [handleOnChange])

    const handleReset = useCallback(() => {
        handleOnChange({ start: previousMonthDate(new Date()), end: new Date() }, period)
    }, [handleOnChange])

    const today = new Date()
    today.setDate(today.getDate() + 1)

    useEffect(() => {
        if (open) {
            perimeter.current.enableOnClickOutside()
        } else {
            perimeter.current.disableOnClickOutside()
        }
    }, [open])

    useEffect(() => {
        if (periodType === 'custom') {
            setCalendarActive(true)
        } else {
            setCalendarActive(false)
        }
    }, [periodType])

    useEffect(() => {
        if (!start && !end) {
            setPeriodType(null)
        }
    }, [setPeriodType, start, end])

    useEffect(() => {
        if (params?.id) {
            setPeriodType(null)
        }
    }, [params?.id])

    const customDateFormat =
        start && end && (start.getFullYear() !== end.getFullYear() ? 'dd.MM.yyy' : 'dd.MM')

    return (
        <FilterPeriodStyled verticalPadding={verticalPadding} customPadding={customPadding}>
            {!noTitle && (
                <Typography colorScheme="secondary" fontWeight="semibold">
                    {t('filterPeriod.label')}
                </Typography>
            )}
            <Perimeter ref={perimeter} onClickOutside={handleClose} disableOnClickOutside>
                <DatePickerStyled>
                    <RadioGroupStyled>
                        <RadioButtonStyled onClick={handleWeek} active={periodType === 'week'}>
                            <Typography
                                colorScheme={periodType === 'week' ? 'whitePrimary' : 'primary'}
                            >
                                {t('filterPeriod.week')}
                            </Typography>
                        </RadioButtonStyled>
                        <RadioButtonStyled onClick={handleMonth} active={periodType === 'month'}>
                            <Typography
                                colorScheme={periodType === 'month' ? 'whitePrimary' : 'primary'}
                            >
                                {t('filterPeriod.month')}
                            </Typography>
                        </RadioButtonStyled>
                        <RadioButtonStyled
                            active={calendarActive || periodType === 'custom'}
                            onClick={toggleSwitch}
                        >
                            <Typography
                                colorScheme={
                                    calendarActive || periodType === 'custom'
                                        ? 'whitePrimary'
                                        : 'primary'
                                }
                            >
                                {periodType === 'custom'
                                    ? `${formatDate(start, customDateFormat)} - ${formatDate(
                                          end,
                                          customDateFormat
                                      )}`
                                    : t('filterPeriod.calendar')}
                            </Typography>
                            <ChevronDownStyled
                                active={calendarActive || periodType === 'custom'}
                                name="icon:core/common/ic_24_chevron_down"
                            />
                        </RadioButtonStyled>
                        <CalendarWrapperStyled>
                            {open && (
                                <CalendarRange
                                    onChange={handleOnChange}
                                    onReset={handleReset}
                                    initialStart={start && start.toISOString()}
                                    initialEnd={end && end.toISOString()}
                                />
                            )}
                        </CalendarWrapperStyled>
                    </RadioGroupStyled>
                </DatePickerStyled>
            </Perimeter>
        </FilterPeriodStyled>
    )
}

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    verticalPadding: PropTypes.bool,
    noTitle: PropTypes.bool,
    period: PropTypes.string,
    customPadding: PropTypes.string
}

Filter.defaultProps = {
    start: null,
    end: null,
    verticalPadding: false,
    noTitle: false,
    period: 'week',
    customPadding: null
}

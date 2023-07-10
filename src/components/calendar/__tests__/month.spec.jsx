import React from 'react'
import { startOfMonth, setDate, setHours } from 'date-fns'
import { mount } from 'enzyme'
import { matchers } from '@emotion/jest'
import { Month } from '../views/month'
import { ThemeProvider } from '@emotion/react'
import * as LIGHT_THEME from '../../styles/light.theme.style'
import { MAX_YEAR_RESTRICTION_DATE, MIN_YEAR_RESTRICTION_DATE } from '../constants'

expect.extend(matchers)

describe('<Month />', () => {
    it('should be defined', () => {
        expect(Month).toBeDefined()
    })

    it('first week should be available', () => {
        const date = new Date()
        const viewDate = date.toISOString()
        const restriction = {
            start: startOfMonth(date),
            end: setHours(setDate(date, 7), 23)
        }
        const month = mount(<Month viewDate={viewDate} restriction={restriction} />)

        const days = month.find('button')
        expect(days.at(0).prop('disabled')).toBe(false)
        expect(days.at(1).prop('disabled')).toBe(false)
        expect(days.at(2).prop('disabled')).toBe(false)
        expect(days.at(3).prop('disabled')).toBe(false)
        expect(days.at(4).prop('disabled')).toBe(false)
        expect(days.at(5).prop('disabled')).toBe(false)
        expect(days.at(6).prop('disabled')).toBe(false)
        expect(days.at(7).prop('disabled')).toBe(true)
    })

    it('today should have current style', () => {
        const date = new Date()
        const currentDayIndex = date.getDate() - 1
        const viewDate = date.toISOString()
        const restriction = {
            start: MIN_YEAR_RESTRICTION_DATE,
            end: MAX_YEAR_RESTRICTION_DATE
        }

        const month = mount(<Month viewDate={viewDate} restriction={restriction} />)

        const days = month.find('button')

        expect(days.at(currentDayIndex ? 0 : 1)).not.toHaveStyleRule('content', '\'\'', {
            target: ':before'
        })

        expect(days.at(currentDayIndex)).toHaveStyleRule('content', '\'\'', {
            target: ':before'
        })
    })

    it('days should have disabled style', () => {
        const date = new Date()
        const viewDate = date.toISOString()
        const restriction = {
            start: startOfMonth(date),
            end: setHours(setDate(date, 7), 23)
        }
        const month = mount(<Month viewDate={viewDate} restriction={restriction} />)

        const days = month.find('button')

        expect(days.at(0)).toHaveStyleRule('cursor', 'pointer')
        expect(days.at(0)).toHaveStyleRule('cursor', 'default', {
            target: ':disabled'
        })
    })

    it('should callback on day click', () => {
        const date = new Date()
        const viewDate = date.toISOString()
        const onClick = jest.fn()
        const restriction = {
            start: MIN_YEAR_RESTRICTION_DATE,
            end: MAX_YEAR_RESTRICTION_DATE
        }
        const month = mount(<Month viewDate={viewDate} onClick={onClick} restriction={restriction} />)

        month.find('button').at(0).simulate('click')
        expect(onClick).toHaveBeenCalled()
    })
})

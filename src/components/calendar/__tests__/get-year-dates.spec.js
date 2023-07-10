import { getYearDates } from '../utils'
import { DATE_DEFAULT_HOUR, DATE_DEFAULT_MINUTE } from '../constants'

const getMonthIncrement = (year) => {
    let month = 0
    return () => `${year}-${String(++month).padStart(2, '0')}-01T11:50:00+03:00`
}

describe('Get year dates', () => {
    test('Is defined', () => {
        expect(getYearDates).toBeDefined()
    })

    test('Returns correct dates for current year', () => {
        const yearDate = new Date()
        const year = yearDate.getFullYear()
        const incrementMonth = getMonthIncrement(year)

        const dates = getYearDates(yearDate.toISOString())
        const expectedDates = [
            [
                incrementMonth(),
                incrementMonth(),
                incrementMonth(),
            ],
            [
                incrementMonth(),
                incrementMonth(),
                incrementMonth(),
              
            ],
            [
                incrementMonth(),
                incrementMonth(),
                incrementMonth(),
            ],
            [
                incrementMonth(),
                incrementMonth(),
                incrementMonth(),
            ],
        ]

        expect(dates).toEqual(expectedDates)
    })
})

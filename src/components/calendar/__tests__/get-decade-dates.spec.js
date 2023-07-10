import { getDecadeDates } from '../utils'
import { DATE_DEFAULT_HOUR, DATE_DEFAULT_MINUTE } from '../constants'

const getYearIncrement = (startingYear) => {
    let year = startingYear

    return () => `${year++}-01-01T11:50:00+03:00`
}

describe('Get decade dates', () => {
    test('Is defined', () => {
        expect(getDecadeDates).toBeDefined()
    })

    test('Returns correct dates for current decade', () => {
        const yearDate = new Date()
        const year = yearDate.getFullYear()
        const startOfDecade = Math.floor(year / 10) * 10
        const incrementYear = getYearIncrement(startOfDecade)

        const dates = getDecadeDates(yearDate.toISOString())
        const expectedDates = [
            [
                incrementYear(),
                incrementYear(),
                incrementYear(),
               
            ],
            [
                incrementYear(),
                incrementYear(),
                incrementYear(),

            ],
            [
                incrementYear(),
                incrementYear(),
                incrementYear(),
            ],
            [
                incrementYear(),
            ],
        ]

        expect(dates).toEqual(expectedDates)
    })
})

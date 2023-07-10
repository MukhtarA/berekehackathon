import { getMonthDates } from '../utils'
import { DATE_DEFAULT_HOUR, DATE_DEFAULT_MINUTE } from '../constants'

const getDayIncrement = () => {
    let day = 0

    return () => `2020-12-${String(++day).padStart(2, '0')}T11:50:00+03:00`
}

describe('Get month dates', () => {
    test('Is defined', () => {
        expect(getMonthDates).toBeDefined()
    })

    test('Returns correct dates for December 2020', () => {
        const incrementDay = getDayIncrement()

        const YEAR = 2020
        const MONTH = 11
        const DAY = 1

        const dates = getMonthDates(new Date(YEAR, MONTH, DAY).toISOString())
        const expectedDates = [
            [
                null,
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay()
            ],
            [
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay()
            ],
            [
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay()
            ],
            [
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay()
            ],
            [
                incrementDay(),
                incrementDay(),
                incrementDay(),
                incrementDay(),
                null,
                null,
                null
            ]
        ]

        expect(dates).toEqual(expectedDates)
    })
})

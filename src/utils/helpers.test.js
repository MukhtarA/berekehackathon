/* eslint-disable line-comment-position */
import {
    capitalizeString,
    excerptText,
    formatDate,
    formatMoney,
    formatPhoneSpaces,
    lastWeekDate,
    previousMonthDate,
    requestId
} from './helpers'

describe('Testing helpers functions', () => {
    it('formatDate ISO full example', () => {
        const date = '2023-02-03T18:50:00+06:00'
        const invalidDate = '25-02-2001'
        expect(formatDate(date, 'dd.MM.yyyy HH:mm')).toBe('03.02.2023 18:50')
        expect(formatDate(invalidDate, 'dd MMMM')).toBe('25-02-2001')
    })

    it('formatDate case full month', () => {
        const date = '2001-02-25T18:50:00+06:00'
        expect(formatDate(date, 'dd MMMM')).toBe('25 February')
    })

    it('capitalizeString', () => {
        expect(capitalizeString('vlAdiMir')).toBe('Vladimir')
    })

    it('formatMoney', () => {
        expect(formatMoney(100)).toBe('100,00 ₸')
        expect(formatMoney(10, { currency: 'USD' })).toBe('10,00 $')
        expect(formatMoney('100')).toBe('100,00 ₸')
        expect(formatMoney(NaN)).toBe('-')
        expect(formatMoney(null)).toBe('0,00 ₸')
    })

    it('formatPhoneSpaces', () => {
        expect(formatPhoneSpaces(77771234567)).toBe('+7 777 123 45 67')
        expect(formatPhoneSpaces('77771234567')).toBe('+7 777 123 45 67')
    })

    it('excerptText', () => {
        expect(
            excerptText(
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                25
            )
        ).toBe('Lorem Ipsum is simply dum...')
    })

    it('lastWeekDate', () => {
        const date = new Date('2023-02-03T18:00:00.000Z')
        expect(lastWeekDate(date)).toEqual(new Date('2023-01-27T18:00:00.000Z'))
    })

    it('previousMonthDate', () => {
        const date = new Date('2023-02-03T18:00:00.000Z')
        expect(previousMonthDate(date)).toEqual(new Date('2023-01-03T18:00:00.000Z'))
    })

    it('requestId', () => {
        expect(requestId()).toBeDefined()
    })
})

import { formatLocalPhone, makeLocalPhoneMask } from '../format-local-phone'

describe('formatLocalPhone util', () => {

    const codes = [
        '3182',
        '4725',
        '42339',
        '42341',
        '423370',
        '482323',
        '4944577',
        '8455533'
    ]
    it('makeLocalPhoneMask make correct mask', () => {
        expect(makeLocalPhoneMask('1234567890', codes).mask).toBe('+7 (000) ???-??-??')
        expect(makeLocalPhoneMask('962•••••66', codes).mask).toBe('+7 (000) ???-??-??')
        expect(makeLocalPhoneMask('3182123456', codes).mask).toBe('+7 (0000) ???-???')
        expect(makeLocalPhoneMask('3182•••456', codes).mask).toBe('+7 (0000) ???-???')
        expect(makeLocalPhoneMask('4725123456', codes).mask).toBe('+7 (0000) ???-???')
        expect(makeLocalPhoneMask('4233912345', codes).mask).toBe('+7 (00000) ???-??')
        expect(makeLocalPhoneMask('4234112345', codes).mask).toBe('+7 (00000) ???-??')
        expect(makeLocalPhoneMask('4233701234', codes).mask).toBe('+7 (000000) ??-??')
        expect(makeLocalPhoneMask('4823231234', codes).mask).toBe('+7 (000000) ??-??')
        expect(makeLocalPhoneMask('4944577123', codes).mask).toBe('+7 (0000000) ??-?')
        expect(makeLocalPhoneMask('8455533123', codes).mask).toBe('+7 (0000000) ??-?')
    })
    it('formatLocalPhone return correct value', () => {
        expect(formatLocalPhone('1234567890', codes)).toBe('+7 (123) 456-78-90')
        expect(formatLocalPhone('962•••••66', codes)).toBe('+7 (962) •••-••-66')
        expect(formatLocalPhone('3182123456', codes)).toBe('+7 (3182) 123-456')
        expect(formatLocalPhone('3182•••456', codes)).toBe('+7 (3182) •••-456')
        expect(formatLocalPhone('4725123456', codes)).toBe('+7 (4725) 123-456')
        expect(formatLocalPhone('4233912345', codes)).toBe('+7 (42339) 123-45')
        expect(formatLocalPhone('4234112345', codes)).toBe('+7 (42341) 123-45')
        expect(formatLocalPhone('4233701234', codes)).toBe('+7 (423370) 12-34')
        expect(formatLocalPhone('4823231234', codes)).toBe('+7 (482323) 12-34')
        expect(formatLocalPhone('4944577123', codes)).toBe('+7 (4944577) 12-3')
        expect(formatLocalPhone('8455533123', codes)).toBe('+7 (8455533) 12-3')
    })
})

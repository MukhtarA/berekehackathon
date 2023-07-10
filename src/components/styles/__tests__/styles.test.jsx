import { describe, expect } from '@jest/globals'

import { hex2rgba } from '../colors.config.style'

describe('hex2rgba', () => {
    it('3-symbol hex goes into hex2rgba', () => {
        expect(hex2rgba('#444', 100)).toBe('rgba(68, 68, 68, 1)')
        expect(hex2rgba('#444', 10)).toBe('rgba(68, 68, 68, 0.1)')
    })

    it('3-symbol hex without alpha to be rgba with alpha 1', () => {
        expect(hex2rgba('#444')).toBe('rgba(68, 68, 68, 1)')
    })

    it('3-symbol hex with incorrect alpha to be rgb', () => {
        expect(hex2rgba('#444', null)).toBe('rgb(68, 68, 68)')
        expect(hex2rgba('#444', 'lol')).toBe('rgb(68, 68, 68)')
        expect(hex2rgba('#444', NaN)).toBe('rgb(68, 68, 68)')
    })

    it('3-symbol hex with alpha equals 0', () => {
        expect(hex2rgba('#444', 0)).toBe('rgba(68, 68, 68, 0)')
    })

    it('6-symbol hex goes into hex2rgba', () => {
        expect(hex2rgba('#444444', 100)).toBe('rgba(68, 68, 68, 1)')
        expect(hex2rgba('#444444', 10)).toBe('rgba(68, 68, 68, 0.1)')
    })
})

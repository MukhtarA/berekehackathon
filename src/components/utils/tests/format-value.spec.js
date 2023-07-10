import { defaultDefinitions, formatValueByMask, maskParser } from '../format-value'

describe('formatValueByMask util', () => {
    it('formatValueByMask', () => {
        expect(formatValueByMask('1234b', '+7([000]) [9]-[SS]')).toBe('+7(123) 4-b')
        expect(formatValueByMask('123b', '+7([000]) [9]-[SS]')).toBe('+7(123) -b')
        expect(formatValueByMask('123г', '+7([000]) [9]-[SS]')).toBe('+7(123) -')
        expect(formatValueByMask('1234г', '+7([000]) [999]-[Ы]')).toBe('+7(123) 4-г')

        expect(formatValueByMask('ab12cd', '[SS]-[99]-[S][s]')).toBe('ab-12-cd')
        expect(formatValueByMask('ab1cd', '[SS]-[99]-[S][s]')).toBe('ab-1-cd')
        expect(formatValueByMask('ab1c', '[SS]-[99]-[S][s]')).toBe('ab-1-c')
        expect(formatValueByMask('1234г', '[00]-[99]-A[Ы]')).toBe('12-34-Aг')

        expect(formatValueByMask('123г', '[00]-[99]-A[Ы]')).toBe('12-3-Aг')
        expect(formatValueByMask('123', '[00]-[99]-A[Ы]')).toBe('12-3')
        expect(formatValueByMask('1234', '[00]-[99]-A[Ы]')).toBe('12-34')
        expect(formatValueByMask('12345', '[00]-[99]-A[Ы]')).toBe('12-34-A')
        expect(formatValueByMask('12345', '[00]-[0][99]-A[Ы]')).toBe('12-345')
        expect(formatValueByMask('1234г', '[00]-[0][99]-A[Ы]')).toBe('12-34-Aг')

        expect(formatValueByMask('abcd1', '[SS]-[ss]-[9]')).toBe('ab-cd-1')
        expect(formatValueByMask('abc1', '[SS]-[ss]-[9]')).toBe('ab-c-1')
        expect(formatValueByMask('ab1', '[SS]-[ss]-[9]')).toBe('ab--1')

        expect(formatValueByMask('a12qw3', '[S]-[____]-[0]')).toBe('a-12qw-3')
        expect(formatValueByMask('a12345', '[S]-[____]-[0]')).toBe('a-1234-5')
        expect(formatValueByMask('aqwer3', '[S]-[____]-[0]')).toBe('a-qwer-3')
        expect(formatValueByMask('aqwe', '[S]-[____]-[0]')).toBe('a-qwe')
        expect(formatValueByMask('a:,.;1', '[S]-[____]-[0]')).toBe('a-:,.;-1')

        expect(formatValueByMask('aqw1', '[S]-[--]-[0]')).toBe('a-qw-1')
        expect(formatValueByMask('aq1', '[S]-[--]-[0]')).toBe('a-q1')
        expect(formatValueByMask('a123', '[S]-[--]-[0]')).toBe('a-12-3')

        expect(formatValueByMask('a123', '<8ab>')).toBe('a')
        expect(formatValueByMask('8ab', '<8ab>')).toBe('8')
        expect(formatValueByMask('cd123', '<8ab>')).toBe('')

        expect(formatValueByMask('Б', '<А-ВД-Ж>')).toBe('Б')
        expect(formatValueByMask('Г', '<А-ВД-Ж>')).toBe('')
        expect(formatValueByMask('Е', '<А-ВД-Ж>')).toBe('Е')
        expect(formatValueByMask('И', '<А-ВД-Ж>')).toBe('')

        expect(formatValueByMask('БД', '<А-В><Д-Ж>')).toBe('БД')
        expect(formatValueByMask('БИ', '<А-В><Д-Ж>')).toBe('Б')
        expect(formatValueByMask('1SИ', '[99]-<A-Z>-<А-Я>')).toBe('1-S-И')

        expect(formatValueByMask('123Abc456BEHЧиЯ', '+7([000]) [SS][s]-[0][99]-<BEH>[ЫЫ] <<А-Я>')).toBe('+7(123) Abc-456-BЧи <Я')
    })

    it('maskParser', () => {
        // simple
        expect(maskParser('[0]').mask).toBe('0')
        expect(maskParser('[9]').mask).toBe('[9]')
        expect(maskParser('[000]').mask).toBe('000')
        expect(maskParser('[999]').mask).toBe('[999]')
        expect(maskParser('[SSS]').mask).toBe('SSS')
        expect(maskParser('[sss]').mask).toBe('[sss]')
        expect(maskParser('[ЫЫЫ]').mask).toBe('ЫЫЫ')
        expect(maskParser('[ыыы]').mask).toBe('[ыыы]')
        expect(maskParser('[___]').mask).toBe('***')
        expect(maskParser('[---]').mask).toBe('[***]')
        expect(maskParser('[ABS]').mask).toBe('[ABS]')

        // complex
        expect(maskParser('+7([000]) [9]-[SS]').mask).toBe('+7(000) [9]-SS')
        expect(maskParser('+7([000]) [9]-[Ы]').mask).toBe('+7(000) [9]-Ы')
        expect(maskParser('[SS]-[99]-[S][s]').mask).toBe('SS-[99]-S[s]')
        expect(maskParser('[00]-[99]-A[Ы]').mask).toBe('00-[99]-AЫ')
        expect(maskParser('[SS]-[ss]-[9]').mask).toBe('SS-[ss]-[9]')
        expect(maskParser('[S]-[____]-[0]').mask).toBe('S-****-0')
        expect(maskParser('[S]-[--]-[0]').mask).toBe('S-[**]-0')

        // regexp
        expect(maskParser('<8аб>')).toEqual({
            mask: '1',
            definitions: {
                ...defaultDefinitions,
                1: /[8аб]/
            }
        })
        expect(maskParser('<А-ВД-Ж>')).toEqual({
            mask: '1',
            definitions: {
                ...defaultDefinitions,
                1: /[А-ВД-Ж]/
            }
        })
        expect(maskParser('<А-В><Д-Ж>')).toEqual({
            mask: '12',
            definitions: {
                ...defaultDefinitions,
                1: /[А-В]/,
                2: /[Д-Ж]/
            }
        })
        expect(maskParser('[000]-<A-Z>-<А-Я>')).toEqual({
            mask: '000-1-2',
            definitions: {
                ...defaultDefinitions,
                1: /[A-Z]/,
                2: /[А-Я]/
            }
        })
    })
})

import { inlineFunction } from '../custom-rules/custom-inline'
import { customTag } from '../custom-rules/custom-tag'
import { customInline } from '../custom-rules'
import { currencySymbol } from '../rules'
import { markdownShort } from '../utils'

const state = {
    pos: 0,
    posMax: 14,
    changes: 0,
}

/** Content for customInline */
const LINE_NO_ERROR = '<currency:RUB>'
const LINE_MISSING_0X3C = 'currency:RUB>'
const LINE_MISSING_0X3A = '<currencyRUB>'
const LINE_MISSING_0X3E = '<currency:RUB'
const ANOTHER_LINE = '<numberFormatting:100>'

const currencyInline = inlineFunction('currency')

describe('Кастомные плагины для Markdown', () => {
    it('inlineFunction - инлайновый тег <*TEMPLATE_NAME*:*CONTENT*>', () => {
        expect(typeof inlineFunction('currency')).toBe('function')
    })
    it('Inline Function - корректный инпут', () => {
        /**
         * mock state for different lines of content
         */

        state.push = (token) => {
            state.content = token.content
        }
        state.src = LINE_NO_ERROR
        state.pos = 0
        state.posMax = LINE_NO_ERROR.length
        expect(currencyInline(state)).toBe(true)
        // check if inlineFunction returns new position
        expect(state.pos).toBe(state.posMax)
        // check correct parsing
        expect(state.content).toBe('RUB')
    })
    it('Inline Function - некорректный инпут currency:RUB>', () => {
        state.src = LINE_MISSING_0X3C
        state.pos = 0
        state.posMax = LINE_MISSING_0X3C.length
        expect(currencyInline(state)).toBe(false)
        // state have to return old position
        expect(state.pos).toBe(state.pos)
    })
    it('Inline Function - некорректный инпут <currency:RUB', () => {
        state.src = LINE_MISSING_0X3E
        state.pos = 0
        state.posMax = LINE_MISSING_0X3E.length
        expect(currencyInline(state)).toBe(false)
        expect(state.pos).toBe(state.pos)
    })
    it('Inline Function - некорректный инпут <currencyRUB>', () => {
        state.src = LINE_MISSING_0X3A
        state.pos = 0
        state.posMax = LINE_MISSING_0X3A.length
        expect(currencyInline(state)).toBe(false)
        expect(state.pos).toBe(state.pos)
    })
    it('Inline Function - посторонний инпут <numberFormatting:100>', () => {
        state.src = ANOTHER_LINE
        state.pos = 0
        state.posMax = ANOTHER_LINE.length
        expect(currencyInline(state)).toBe(false)
        expect(state.pos).toBe(state.pos)
    })
    it('customInline - плагин для рендера инлайновых тегов', () => {
        markdownShort.use(customInline, {
            templateName: 'currency',
            render: (content) => currencySymbol(content)
        })
        expect(markdownShort.render('<currency:usd>')).toBe('<p><span>$</span></p>\n')
    })
    it('customTag - кастомные теги <*TAG*>content</*TAG*>', () => {
        markdownShort.use(customTag, {
            templateName: 'wow',
            tag: 'wow',
            render: (content) => `<span style="color: blue">${content}</span>`
        })
        expect(markdownShort.renderer.rules.wow).toBeDefined()
        expect(markdownShort.render('<wow>1000</wow>')).toBe('<p><span style="color: blue">1000</span></p>\n')
    })
})

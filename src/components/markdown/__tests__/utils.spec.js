import Remarkable from 'remarkable'
import _ from 'lodash'

import {
    markdownFull,
    markdownShort,
    linkOpen,
    linkClose,
    text,
    emOpen,
    emClose
} from '../utils'

describe('<Markdown /> - utils', () => {
    it('linkOpen - формирование открывающего тега <a />', () => {
        expect(linkOpen([{ href: '#', title: 'title' }], 0)).toBe(
            '<a href="#" title="title"><span>'
        )

        expect(
            linkOpen(
                [{ href: 'https://www.1.ru' }, { content: 'External Link' }], 0
            )
        ).toBe(
            '<a href="https://www.1.ru" target="_blank" rel="noopener noreferrer"><span>'
        )

        expect(
            linkOpen(
                [{ href: 'https://www.1.ru' }, { content: 'External' }], 0
            )
        ).toBe(
            '<a href="https://www.1.ru" target="_blank" rel="noopener noreferrer">'
        )
    })

    it('text - формирование контента ссылки', () => {
        expect(text([{ href: '#' }, { content: 'Internal Link' }], 1)).toBe('Internal Link')
        expect(text([{ href: 'https://www.1.ru' }, { content: 'External Link' }], 1)).toBe('External ')
        expect(text([{ href: 'https://www.1.ru' }, { content: 'External' }], 1)).toBe('')
    })

    it('Создаются MD экземпляры для Full формата markdown', () => {
        expect(markdownFull).toBeDefined()
        expect(typeof markdownFull).toBe('object')
        expect(markdownFull instanceof Remarkable).toBe(true)
        expect(markdownFull.renderer.rules.link_open).toBe(linkOpen)
        expect(markdownFull.renderer.rules.link_close).toBe(linkClose)
    })
    it('Создаются MD экземпляры для Short формата markdown', () => {
        expect(markdownShort).toBeDefined()
        expect(typeof markdownShort).toBe('object')
        expect(markdownShort instanceof Remarkable).toBe(true)
        expect(markdownShort.renderer.rules.link_open).toBe(linkOpen)
        expect(markdownShort.renderer.rules.link_close).toBe(linkClose)
        expect(markdownShort.renderer.rules.image).toBe(_.stubString)
    })
    it('markdownFull, markdownShort создают html-строку', () => {
        expect(markdownFull.render('# Заголовок\n\nпараграф')).toBe(
            '<h1>Заголовок</h1>\n<p>параграф</p>\n'
        )
        expect(markdownShort.render('# Заголовок\n\nпараграф')).toBe(
            '<h1>Заголовок</h1>\n<p>параграф</p>\n'
        )
    })
})

import _ from 'lodash'
import { escapeHtml } from 'remarkable/lib/common/utils'

/**
 * @param {Object} md - markdown instance
 * @param {Object} options
 * @param {String} options.templateName
 * @param {String} options.tag
 * @param {Function} options.render
 *
 * Подключение к инстансу Remarkable
 * равному md:
 * md.use(customTag, {
 *   templateName: 'wow',
 *   tag: 'wow',
 *   render: (content) => `<span style="color: blue">${content}</span>`
 *  })
 *
 * Пример использования:
 * <wow>Wow!</wow> => <span style="color: blue">Wow!</span>
 */

export const customTag = (md, { templateName, tag, render }) => {
    Object.assign(md.renderer.rules, {
        [templateName]: (tokens, idx) =>
            render(`${escapeHtml(tokens[idx].content)}`)
    })
    md.core.ruler.push(templateName, ({ tokens }) =>
        tokens.forEach((token) =>
            _.each(token.children, (child) => {
                if (child.type !== 'text') {
                    return
                }

                const exp = new RegExp(`<${tag}>(.*)</${tag}>`, 'i')
                const contentMatch = child.content.match(exp)

                if (contentMatch) {
                    Object.assign(child, {
                        type: templateName,
                        content: contentMatch[1]
                    })
                }
            })
        )
    )
}

const COLON = ':'
const LESS_THAN_SIGN = '<'
const GREATER_THAN_SIGN = '>'

/**
 * make <*templateName*:content> rule
 * @param {String} templateName
 */

export const inlineFunction = (templateName) => (state) => {
    const {
        posMax: max,
        src: text
    } = state
    let position = state.pos

    if (text[position] !== LESS_THAN_SIGN /* < */) {
        // https://github.com/jonschlinkert/remarkable/blob/master/docs/parsing_inline.md
        // >If for any reason, the syntax you are trying to parse is incorrectly formated and
        // >you are unable to parse it, you must abort and return false without
        // >modifying state in any way.
        return false
    }

    position = position + templateName.length + 1

    if (text[position] !== COLON /* : */) {
        return false
    }

    position += 1

    const positionAfterContent = text.slice(position, max).indexOf(GREATER_THAN_SIGN)
    if (positionAfterContent === -1) {
        return false
    }

    const content = text.slice(position, position + positionAfterContent)
    position += positionAfterContent + 1
    // https://github.com/jonschlinkert/remarkable/blob/master/docs/parsing_inline.md
    // Remarkable нужно передать pos и posMax - начало и конец шаблона.
    // pos - начало шаблона с первой позиции ( "c" )
    // posMax - конец шаблона ( ">" )

    state.pos += 1

    state.posMax = position

    // https://github.com/jonschlinkert/remarkable/blob/master/docs/parser.md
    // >To completely parse a block, you will need to push new tokens by calling state.push(token).
    // Сообщаем Remarkable какое правило для view использовать
    state.push({
        type: `${templateName}`,
        level: 1,
        content,
        display: 'inline',
    })
    // https://github.com/jonschlinkert/remarkable/blob/master/docs/parsing_inline.md
    // передаем Remarkable новые pos и posMax для поиска следующего шаблона
    // pos - конец шаблона ( ">" )
    // posMax - оставшаяся часть строки (константа max)

    state.pos = state.posMax
    // https://github.com/jonschlinkert/remarkable/blob/master/docs/parsing_inline.md

    state.posMax = max

    return true
}

/**
 * @param {Object} md - markdown instance
 * @param {Object} options
 * @param {Function} options.render
 * @param {String} options.templateNam
 *
 * Подключение к инстансу Remarkable
 * равному md:
 * md.use(customInline, {
 *   templateName: 'currency',
 *   render: (content) => <span>${content}</span>
 * })
 *
 * Пример использования:
 * <currency:RUB> => <span>RUB</span>
 */

export const customInline = (md, { templateName, render }) => {
    md.inline.ruler.push(
        templateName,
        inlineFunction(templateName),
        { rule: 2 }
    )

    md.renderer.rules[templateName] = (tokens, idx) =>
        render(tokens[idx].content, tokens[idx].options)
}

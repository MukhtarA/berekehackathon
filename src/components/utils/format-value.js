import IMask from 'imask'

// default IMask definitions are:
// 0 - any digit
// a - any letter
// * - any char
// [] - make input optional

// Additional Definitions
export const defaultDefinitions = {
    S: /[A-Za-z]/,
    s: /[A-Za-z]/,
    Ы: /[ЁА-яё]/,
    ы: /[ЁА-яё]/,
    9: /\d/

}


/**
 * Парсер маски в формат IMask
 * Документация на форматирование https://sbtatlas.sigma.sbrf.ru/wiki/pages/viewpage.action?pageId=114328720
 * Документация на IMask - https://imask.js.org/guide.html#masked-pattern
 * @param {String} rawMask Маска в формате, используемом в воркфлоу
 * @param {Object} definitions Правила преобразования блоков символов
 * @return {Object} Объект с ключами mask и definitions для IMask
 */
export const maskParser = (rawMask = '', definitions = defaultDefinitions) => {
    let currIndex = 1
    const additionalDefinitions = {}

    const mask = rawMask
        // Replace [000] to 000, [SSS] to SSS, [ЫЫЫ] to ЫЫЫ
        .replace(/\[[0SЫ]+]/g, (str) => str.replace(/\[|]/g, ''))
        // Replace [___] to ***
        .replace(/\[_+]/g, (str) => str.replace(/\[|]/g, '').replace(/_/g, '*'))
        // Replace [---] to [***]
        .replace(/\[-+]/g, (str) => str.replace(/-/g, '*'))
        // Replace <A-Z> to regExp /[A-Z]/ and add to definitions
        .replace(/<[\wЁА-яё-]+>/g, (str) => {
            const key = currIndex
            additionalDefinitions[key] = new RegExp(str.replace(/</, '[').replace(/>/, ']'))
            currIndex += currIndex

            return key
        })

    return {
        mask,
        definitions: {
            ...definitions,
            ...additionalDefinitions
        }
    }
}

export const formatValueByMask = (value, rawMask) =>
    IMask.pipe(value.toString(), maskParser(rawMask))

import { forEach, isUndefined } from 'lodash'

const COMPONENT_REG_EXP = /^[A-Z]/
const DECORATORS_SHORTCUT = 'WrappedComponent'

export const exportCheck = (exports) => {
    const warnList = []

    forEach(exports, (Component, name) => {
        if (COMPONENT_REG_EXP.test(name) && name !== DECORATORS_SHORTCUT) {
            if (isUndefined(Component)) {
                warnList.push(name)
            }
        }
    })

    if (warnList.length) {
        fail(`Test Error: В следующих экспортируемых элементах присутствуют непридусмотренные undefined:
    ${warnList.join('\n    ')}`)
    }
}

import { findIndex, get } from 'lodash'

export const prevIndex = (options, value, key = 'value') => findIndex(options, (o) => get(o, key) === value) - 1
export const nextIndex = (options, value, key = 'value') => findIndex(options, (o) => get(o, key) === value) + 1
export const cyclicPrevIndex = (options, value, key) => (prevIndex(options, value, key) + options.length) % options.length
export const cyclicNextIndex = (options, value, key) => nextIndex(options, value, key) % options.length

export const prevItem = (options, value, key) => options[prevIndex(options, value, key)]
export const nextItem = (options, value, key) => options[nextIndex(options, value, key)]
export const cyclicPrevItem = (options, value, key) => options[cyclicPrevIndex(options, value, key)]
export const cyclicNextItem = (options, value, key) => options[cyclicNextIndex(options, value, key)]

export const keyCodes = {
    KEY_TAB: 9,
    KEY_ENTER: 13,
    KEY_ESCAPE: 27,
    KEY_SPACE: 32,
    KEY_ARROW_UP: 38,
    KEY_ARROW_DOWN: 40,
    KEY_END: 35,
    KEY_HOME: 36,
    KEY_A: 65
}

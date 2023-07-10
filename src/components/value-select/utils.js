export const currentIndex = (array, value) => array.findIndex((item) => item.props.value === value)

export const currentValue = (array, value) => array[currentIndex(array, value)]?.props.value
export const prevValue = (array, value) => array[currentIndex(array, value) - 1]?.props.value
export const nextValue = (array, value) => array[currentIndex(array, value) + 1]?.props.value

export const makeArray = (value) => Array.isArray(value) ? value : [value || '']
export const getValues = (values = [], value) => values.includes(value)
    ? values.filter((val) => val !== value)
    : [...values, value]


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

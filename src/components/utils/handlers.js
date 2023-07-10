import { has, flow, get } from 'lodash'

export const handlePreventDefault = (event) => {
    if (typeof event.preventDefault === 'function') {
        event.preventDefault()
    }
    return event
}

export const handleStopPropagation = (event) => {
    if (typeof event.stopPropagation === 'function') {
        event.stopPropagation()
    }
    return event
}

export const handleSelectAll = (event) => {
    if (has(event, 'target.value.length') && event.target && event.target.type !== 'number') {
        const input = event.target
        input.selectionStart = 0
        input.selectionEnd = input.value.length
    }
    return event
}

export const addClickHandlers = (element, handleMouseClick) => {
    element.addEventListener('click', handleMouseClick)
}

export const removeClickHandlers = (element, handleMouseClick) => {
    element.removeEventListener('click', handleMouseClick)
}

export const disableHandler = (handler, isDisabled) => isDisabled ? handlePreventDefault : handler

export const preventHandler = (handler) => flow(handlePreventDefault, handler)
export const stopPropagationHandler = (handler) => flow(handleStopPropagation, handler)
export const selectAllHandler = (handler) => flow(handleSelectAll, handler)

export const eventValueHandler = (handler) => (event) => handler(get(event, 'target.value', event), event)
export const eventCheckedHandler = (handler) => (event) => handler(get(event, 'target.checked', event), event)

import _ from 'lodash'

const getTopOffset = (element, offset) =>
    element.getBoundingClientRect().top - offset + window.pageYOffset

export const scrollToElement = (element, options = {}, onFinishedCb = _.noop) => {
    const { offset = 0 } = options
    const top = getTopOffset(element, offset)

    window.scroll({ top, left: 0, behavior: 'smooth' })
    onFinishedCb()
}

import React, { useRef, useEffect } from 'react'
import { isNil } from 'lodash'

import { sizes, dynamicIndent } from '../styles/dynamic-styles'

export const checkPositionForScroll = (wrapper, clickedItem) => {
    if (!isNil(wrapper) && !isNil(clickedItem)) {
        const clickedItemDimensions = clickedItem.getBoundingClientRect()
        const wrapperDimensions = wrapper.getBoundingClientRect()

        if (clickedItemDimensions.x < wrapperDimensions.x) {
            wrapper.scrollTo({
                left: wrapper.scrollLeft - clickedItemDimensions.width,
                behavior: 'smooth'
            })

        }
        if (clickedItemDimensions.right > wrapperDimensions.right) {
            wrapper.scrollTo({
                left: wrapper.scrollLeft + clickedItemDimensions.width,
                behavior: 'smooth'
            })
        }
    }
}

export const getFirstChildTitle = (childrenArgs) => React.Children.toArray(childrenArgs)[0]?.props.title

export const useUpdateEffect = (effect, inputs) => {
    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current) {
            effect()
        }
        isMounted.current = true
    }, inputs)
}

export const getTopOffset = (isSticky, size) => {
    const paddingSize = parseInt(dynamicIndent(size, 'inner'), 10)
    const lineHeight = parseInt(sizes[size].lineHeight, 10)

    return isSticky ? paddingSize + lineHeight + paddingSize : 0
}

export const scrollToElement = (element, options = {}, onFinishedCb) => {
    const { offset = 0 } = options
    const top = Math.round(element.getBoundingClientRect().top - offset + window.pageYOffset)
    if (onFinishedCb) {
        const onScroll = () => {
            if (window.pageYOffset === top) {
                window.removeEventListener('scroll', onScroll)
                onFinishedCb()
            }
        }
        window.addEventListener('scroll', onScroll)
    }

    window.scroll({ top, left: 0, behavior: 'smooth' })
}

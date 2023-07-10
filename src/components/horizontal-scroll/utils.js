export const easeInOutQuad = (time, start, change, duration) => {
    // comment: лучше не скомпоновалось
    /* eslint-disable no-mixed-operators */
    const half = 2
    let halvedTime = time / (duration / half)
    if (halvedTime < 1) {
        return (change / half) * halvedTime * halvedTime + start
    }
    halvedTime -= 1
    return -change / half * (halvedTime * (halvedTime - half) - 1) + start
}

export const smoothScroll = (element, change, duration, cb) => {
    const start = element.scrollLeft
    const el = element
    let currentTime = 0
    const increment = 20

    const animateScroll = () => {
        currentTime += increment
        el.scrollLeft = easeInOutQuad(currentTime, start, change, duration)
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll)
        } else {
            cb()
        }
    }
    animateScroll()
}

export const leftCheck = (scroll) => {
    if (!scroll) {
        return false
    }

    return scroll.scrollLeft > 0
}

export const rightCheck = (scroll) => {
    if (!scroll) {
        return false
    }

    // В IE scrollWidth больше clientWidth на 1px, даже если нет скролла, поэтому  > 1, а не > 0.
    return Math.floor(scroll.scrollWidth - scroll.clientWidth - scroll.scrollLeft) > 1
}

export const scrollToChild = (scroll, target, duration, cb) => {
    const scrollViewPortSize = scroll.clientWidth
    const targetSize = target.scrollWidth
    const scrollDistance = scroll.scrollLeft
    const targetScrollOffset = target.offsetLeft
    
    const scrollEdge = (scrollDistance < targetScrollOffset) && (targetSize < scrollViewPortSize) ? 'right' : 'left'

    const targetOffset = target.getBoundingClientRect()?.[scrollEdge]
    const scrollOffset = scroll.getBoundingClientRect()?.[scrollEdge]

    const distanceToTarget = targetOffset - scrollOffset

    smoothScroll(scroll, distanceToTarget, duration, cb)
}

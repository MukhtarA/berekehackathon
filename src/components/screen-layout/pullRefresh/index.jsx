import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ElStyled } from './style'

export const PullRefresh = ({ children, onPullRefresh }) => {
    const pan = useRef({ startY: 0, endY: 0 })
    const [wrapper, setWrapper] = useState()

    const handleTouchStart = useCallback((event) => {
        if (window.pageYOffset !== 0) {
            return
        }

        pan.current.startY =
            typeof event.targetTouches !== 'undefined'
                ? event.targetTouches[0].screenY
                : event.screenY
    }, [])

    const handleTouchEnd = useCallback(
        (event) => {
            const y =
                typeof event.changedTouches !== 'undefined'
                    ? event.changedTouches[0].screenY
                    : event.screenY

            const { startY } = pan.current

            if (!startY) {
                return
            }

            if (y - startY > 100) {
                console.log('is pull refresh started')
                onPullRefresh?.()
            }

            if (y - startY > 0) {
                wrapper.style.transform = 'translateY(0)'
            }

            pan.current = { startY: 0, endY: 0 }
        },
        [wrapper]
    )

    const handleTouchMove = useCallback(
        (event) => {
            const { startY } = pan.current

            if (!wrapper || !startY) {
                return
            }
            let y

            if (typeof event.changedTouches === 'undefined') {
                y = event.screenY
            } else {
                y = event.targetTouches[0].screenY
            }
            const diff = y - startY

            if (diff > 0 && diff < 100) {
                wrapper.style.transform = `translateY(${diff / 2.5}px)`
            }
        },
        [wrapper]
    )

    const wrapperRef = useCallback((node) => {
        if (node !== null) {
            setWrapper(node)
        }
    }, [])

    const init = useCallback(() => {
        if (wrapper) {
            wrapper.addEventListener('touchstart', handleTouchStart)
            wrapper.addEventListener('touchend', handleTouchEnd)
            wrapper.addEventListener('touchmove', handleTouchMove)
            wrapper.addEventListener('mousedown', handleTouchStart)
            wrapper.addEventListener('mousemove', handleTouchMove)
            wrapper.addEventListener('mouseup', handleTouchEnd)
        }
    }, [wrapper, handleTouchEnd, handleTouchMove, handleTouchStart])

    const unmount = useCallback(() => {
        if (wrapper) {
            wrapper.removeEventListener('touchstart', handleTouchStart)
            wrapper.removeEventListener('touchend', handleTouchEnd)
            wrapper.removeEventListener('touchmove', handleTouchMove)
            wrapper.removeEventListener('mousedown', handleTouchStart)
            wrapper.removeEventListener('mousemove', handleTouchMove)
            wrapper.removeEventListener('mouseup', handleTouchEnd)
        }
    }, [wrapper, handleTouchEnd, handleTouchMove, handleTouchStart])

    useEffect(() => {
        init()

        return unmount
    }, [init, unmount])

    if (!onPullRefresh) {
        return children
    }

    return <ElStyled ref={wrapperRef}>{children}</ElStyled>
}

PullRefresh.propTypes = {
    children: PropTypes.node,
    onPullRefresh: PropTypes.func
}

PullRefresh.defaultProps = {
    children: null,
    onPullRefresh: null
}

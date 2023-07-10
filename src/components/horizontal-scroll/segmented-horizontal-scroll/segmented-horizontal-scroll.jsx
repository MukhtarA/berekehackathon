import React, { useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { uniqueId, flow, noop, debounce } from 'lodash'

import { HorizontalScroll } from '../horizontal-scroll'
import { scrollToChild } from '../utils'
import { getFirstChildTitle } from '../../tabs/tab-utils'
import { isMobilePlatform } from '../../utils/adaptive'

import { SegmentContainerStyled } from './segmented-horizontal-scroll.styles'

const SCROLL_TIME = 1000
const VIEWPORT_CHECK_DELAY = 300

const MOBILE_SCROLL_ZONE_ID = 0
const DESKTOP_SCROLL_ZONE_ID = 1

export const SegmentedHorizontalScroll = ({
    children,
    mode,
    onScroll = noop,
    onChange = noop,
    a11y,
    scrollWidth,
    getScrollWidth,
    refWrapper = noop
}) => {
    const [controlsLocked, setControlsLocked] = useState(false)
    const [activeSegment, setActiveSegment] = useState(getFirstChildTitle(children))
    const [segmentsList, setSegmentsList] = useState([])
    const [scrollRef, setScrollRef] = useState(null)

    const getScrollRef = useCallback((element) => {
        if (isMobilePlatform()) {
            setScrollRef(element?.children[MOBILE_SCROLL_ZONE_ID])

        } else {
            setScrollRef(element?.children[DESKTOP_SCROLL_ZONE_ID])
        }

        return element
    }, [])

    const refWrapperHandler = useMemo(() => flow(getScrollRef, refWrapper), [getScrollRef, refWrapper])

    const isInViewPort = debounce(() => {
        const scrollOffset = scrollRef.scrollLeft

        const referencesKeys = Object.keys(segmentsList).reverse()

        const segmentId = referencesKeys.find((key) => {
            const targetOffset = segmentsList[key]?.offsetLeft

            if (targetOffset - scrollOffset <= 0) {
                return true
            }
            return false
        })

        if (segmentId) {
            setActiveSegment(segmentId)
        }
    }, VIEWPORT_CHECK_DELAY)

    const lock = () => setControlsLocked(true)
    const unlock = () => setControlsLocked(false)

    const handleScroll = flow(onScroll, isInViewPort)

    const scrollToSegment = useCallback((segmentId) => {
        lock()

        scrollToChild(scrollRef, segmentsList?.[segmentId], SCROLL_TIME, unlock)

        if (activeSegment !== segmentId) {
            onChange(segmentId)
        }
    }, [activeSegment, scrollRef, segmentsList, onChange])

    const renderControls = useMemo(() =>
        React.Children.map(children, (child) => {
            if (!child || !child.props.title) {
                return null
            }

            return React.cloneElement(child, {
                ...child.props,
                onClick: () => scrollToSegment(child.props.title),
                active: child.props.title === activeSegment ? true : void 0,
                disabled: controlsLocked
            })
        }), [scrollToSegment, activeSegment, controlsLocked, children])

    const renderScrollContent = useMemo(() => {
        const references = {}

        const renderChildren = React.Children.map(children, (child) => {
            if (!child) {
                return null
            }

            const getRef = (element) => {
                references[child.props.title] = element
            }

            return (
                <SegmentContainerStyled ref={getRef} key={`scroll-segment-id-${uniqueId()}`} tabIndex="-1">
                    {child.props.children}
                </SegmentContainerStyled>
            )
        })

        setSegmentsList(references)
        return renderChildren
    }, [children])

    return (
        <>
            { renderControls &&
                <HorizontalScroll>
                    {renderControls}
                </HorizontalScroll>
            }

            <HorizontalScroll
                refWrapper={refWrapperHandler}
                mode={mode}
                onScroll={handleScroll}
                a11y={a11y}
                scrollWidth={scrollWidth}
                getScrollWidth={getScrollWidth}
            >
                {renderScrollContent}
            </HorizontalScroll>
        </>
    )
}

SegmentedHorizontalScroll.propTypes = {
    children: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(['inline', 'block', 'banner']),
    onScroll: PropTypes.func,
    onChange: PropTypes.func,
    a11y: PropTypes.shape({
        titleBackward: PropTypes.string,
        titleForward: PropTypes.string
    }),
    scrollWidth: PropTypes.number,
    getScrollWidth: PropTypes.func,
    scrollContainer: PropTypes.shape({
        Inner: PropTypes.func,
        Outer: PropTypes.func,
    }),
    refWrapper: PropTypes.func
}

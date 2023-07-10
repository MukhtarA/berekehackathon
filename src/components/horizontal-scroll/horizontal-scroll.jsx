import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import { isMobilePlatform } from '../utils/adaptive'
import { disableHandler } from '../utils/handlers'

import { leftCheck, rightCheck, smoothScroll } from './utils'
import {
    ScrollStyled,
    ScrollZoneStyled,
    ContentsStyled,
    NavigationStyled,
    DotsStyled
} from './horizontal-scroll.style'
import { Control } from './control'

const SCROLL_WIDTH = 300
const SCROLL_TIME = 1000
// comment: некорректный парсинг jsdoc
/* eslint-disable valid-jsdoc */
/**
 * Технический компонент для управления горизонтальным скроллом в списке карточек
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */

export const HorizontalScroll = ({
    children,
    onScroll = () => {},
    mode = 'inline',
    refWrapper = () => {},
    a11y: {
        titleBackward = 'Листать назад',
        titleForward = 'Листать вперед'
    } = {},
    parentId,
    scrollWidth = SCROLL_WIDTH,
    getScrollWidth,
    navigation = false,
    scrollContainer: {
        Inner,
        Outer
    } = {}
}) => {
    const mobile = isMobilePlatform()

    const [controlsLocked, setControlsLocked] = useState(false)
    const [activeOffer, setActive] = useState(0)
    const [, setMounted] = useState(false)
    const scroll = useRef(null)
    const [activeState, setState] = useState({
        left: false,
        right: false
    })
    const blocks = children?.props?.children || children

    const checkContent = () => {
        setState({
            left: leftCheck(scroll.current),
            right: rightCheck(scroll.current)
        })
    }

    useEffect(() => {
        setMounted()
        checkContent()

        if (activeOffer === blocks.length && activeOffer > 0) {
            setActive((activeDot) => activeDot - 1)
        }
    }, [activeState.left, activeState.right, activeOffer, blocks.length])

    const takeSteps = useCallback((step) => {
        if (activeOffer + step >= 0 && activeOffer + step !== blocks.length) {
            setActive((activeDot) => activeDot + step)
        }
    }, [activeOffer, blocks.length])

    const handleScrollEnd = useCallback(() => {
        setControlsLocked(false)

        checkContent()
    }, [])

    const nextValue = useCallback((steps) => {
        const { current } = scroll

        return (
            getScrollWidth
                ? steps * getScrollWidth(current.scrollLeft, current)
                : steps * scrollWidth
        )
    }, [])

    const handleLeftClick = useCallback((event) => {
        const id = event.target?.id.split('nav')[1]
        const steps = navigation && id ? activeOffer - id : 1

        setControlsLocked(true)
        
        takeSteps(-steps)
        smoothScroll(scroll.current, -nextValue(steps), SCROLL_TIME, handleScrollEnd)
    }, [activeOffer, nextValue, takeSteps, handleScrollEnd])

    const handleRightClick = useCallback((event) => {
        const id = event.target?.id.split('nav')[1]
        const steps = navigation && id ? id - activeOffer : 1

        setControlsLocked(true)
        
        takeSteps(steps)
        smoothScroll(scroll.current, nextValue(steps), SCROLL_TIME, handleScrollEnd)
    }, [activeOffer, nextValue, takeSteps, handleScrollEnd])

    const OuterScrollStyled = mobile && Outer ? ScrollStyled.withComponent(Outer) : ScrollStyled
    const InnerScrollStyled = mobile && Inner ? ContentsStyled.withComponent(Inner) : ContentsStyled

    return (
        <>
            <OuterScrollStyled
                ref={refWrapper}
                mobile={mobile}
                mode={mode}
            >
                {!mobile && (
                    <Control
                        side="left"
                        onClick={disableHandler(handleLeftClick, controlsLocked)}
                        title={titleBackward}
                        active={activeState.left}
                        mode={mode}
                    />
                )}
                <ScrollZoneStyled
                    id={parentId}
                    ref={scroll}
                    onScroll={onScroll}
                    mobile={mobile}
                    mode={mode}
                    leftControlHidden={!activeState.left}
                    rightControlHidden={!activeState.right}
                    onMouseEnter={disableHandler(checkContent, mobile)}
                >
                    <InnerScrollStyled>
                        {children}
                    </InnerScrollStyled>
                </ScrollZoneStyled>
                {!mobile && (
                    <Control
                        side="right"
                        onClick={disableHandler(handleRightClick, controlsLocked)}
                        title={titleForward}
                        active={activeState.right}
                        mode={mode}
                    />
                )}
            </OuterScrollStyled>
            {!mobile && navigation && Array.isArray(blocks) && blocks.length > 1 &&
            <NavigationStyled>
                {blocks.map(({ key }, index) => (
                    <DotsStyled
                        active={activeOffer === index}
                        aria-hidden
                        id={`${key}-scroll-nav${index}`}
                        key={key}
                        onClick={activeOffer > index ? handleLeftClick : handleRightClick}
                        disabled={controlsLocked}
                    />
                ))}
            </NavigationStyled>}
        </>
    )
}

HorizontalScroll.propTypes = {
    children: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(['inline', 'block', 'banner']),
    onScroll: PropTypes.func,
    refWrapper: PropTypes.func,
    a11y: PropTypes.shape({
        titleBackward: PropTypes.string,
        titleForward: PropTypes.string
    }),
    scrollWidth: PropTypes.number,
    getScrollWidth: PropTypes.func,
    navigation: PropTypes.bool,
    scrollContainer: PropTypes.shape({
        Inner: PropTypes.func,
        Outer: PropTypes.func,
    })
}

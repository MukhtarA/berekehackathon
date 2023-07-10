import React, { useState, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop, uniqueId, throttle } from 'lodash'

import { Header } from '../tabs/header'
import { getFirstChildTitle, getTopOffset, useUpdateEffect, scrollToElement } from '../tabs/tab-utils'
import { TabsContentSectionStyled, TabsStyled } from '../tabs/tabs.style'

const THROTTLE_DELAY = 300

const parentId = uniqueId('anchor-link-wrapper-')

/**
 * Компонент прокрутки блоков верстки
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const Anchor = ({
    size = 'lg',
    onChange = noop,
    onClick = noop,
    children,
    colorScheme,
    initialValue,
    fullWidth,
    sticky,
    borderless,
    scrollContainer
}) => {

    const [selectedTitle, setSelectedTitle] = useState(initialValue || getFirstChildTitle(children))
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])
    const topOffset = useMemo(() => getTopOffset(sticky, size), [sticky, size])

    useUpdateEffect(() => {
        onChange(selectedTitle)
    }, [selectedTitle])

    const references = useRef({})
    const scrolling = useRef(false)

    const handleScroll = () => {
        if (scrolling.current) {
            return
        }
        const referencesKeys = Object.keys(references.current)

        const selectedTitleKey = referencesKeys.find((key) => {
            const rect = references.current[key].getBoundingClientRect()

            return Math.round(rect.bottom) - topOffset > 0
        })

        if (selectedTitleKey) {
            setSelectedTitle(selectedTitleKey)
            return
        }

        const lastRef = referencesKeys[referencesKeys.length - 1]

        if (references.current[lastRef].getBoundingClientRect().top < 0) {
            setSelectedTitle(lastRef)
        }
    }

    const throttleScroll = throttle(handleScroll, THROTTLE_DELAY)

    const getSelectedChild = () => childrenArray.map((child, i) => {
        const setRef = (ref) => {
            if (child.props.title) {
                references.current[child.props.title] = ref
            }
        }
        const key = `${child.props.title}-${i}`

        return (
            <div id={`anchor-link-id-${i}`} ref={setRef} key={key} tabIndex="-1" style={{ outline: 'none' }}>
                {child.props.children}
            </div>
        )
    })

    const handleChange = (value) => {
        const ref = references.current[value]
        onClick(value)

        if (ref) {
            scrolling.current = true
            scrollToElement(ref, { offset: topOffset }, () => {
                scrolling.current = false
                ref.focus({ preventScroll: true })
                setSelectedTitle(value)
            })
        }
    }

    const mapChildren = () =>
        childrenArray.map((child) =>
            React.cloneElement(child, {
                forceOpened: child.props.forceOpened || selectedTitle === child.props.title,
                onChange: handleChange,
                colorScheme,
                parentId,
                size,
            })
        )

    const containerRef = useRef()

    const isInViewPort = () => {
        if (containerRef) {
            const rect = containerRef.current.getBoundingClientRect()
            if ((rect.top < 0 && rect.bottom < 0) ||
                (rect.top > window.innerHeight && rect.bottom > window.innerHeight)) {
                window.removeEventListener('scroll', throttleScroll)
                return
            }
            window.addEventListener('scroll', throttleScroll)
        }
    }

    const throttleViewPort = throttle(isInViewPort, THROTTLE_DELAY)

    useEffect(() => {
        window.addEventListener('scroll', throttleViewPort)
        return () => {
            window.removeEventListener('scroll', throttleViewPort)
            window.removeEventListener('scroll', throttleScroll)
        }
    }, [])

    if (!children) {
        return null
    }

    return (
        <TabsStyled ref={containerRef}>
            <Header
                parentId={parentId}
                sticky={sticky}
                fullWidth={fullWidth}
                borderless={borderless}
                scrollContainer={scrollContainer}
            >
                <div>
                    {mapChildren()}
                </div>
            </Header>
            <TabsContentSectionStyled>
                {getSelectedChild()}
            </TabsContentSectionStyled>
        </TabsStyled>
    )
}

Anchor.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    /**
     * Общая цветовая схема
     */
    colorScheme: PropTypes.string,
    initialValue: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullWidth: PropTypes.bool,
    sticky: PropTypes.bool,
    borderless: PropTypes.bool,
    scrollContainer: PropTypes.shape({
        Inner: PropTypes.func,
        Outer: PropTypes.func,
    })
}

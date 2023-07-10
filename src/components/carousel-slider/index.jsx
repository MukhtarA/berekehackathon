import React, { useCallback, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { CarouselItemStyled, CarouselStyled, DotStyled, Indicators, InnerStyled } from './style'

export const CarouselItem = ({ children, width }) => {
    return <CarouselItemStyled width={width}>{children}</CarouselItemStyled>
}

export const Carousel = ({
    children,
    showIndicator,
    className,
    defaultActiveIndex,
    onChange,
    autoplay,
    ...props
}) => {
    const notNullChildren = React.Children.toArray(children).filter(Boolean)
    const childrenCount = React.Children.count(notNullChildren)
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
    const mouseEventRef = useRef([0, 0])
    const [isMoved, setIsMoved] = useState(false)

    const updateIndex = useCallback(
        (newIndex) => {
            if (newIndex < 0) {
                newIndex = 0
            } else if (newIndex >= childrenCount) {
                newIndex = childrenCount - 1
            }

            setActiveIndex(newIndex)

            if (onChange) {
                onChange(newIndex)
            }
        },
        [onChange, childrenCount]
    )

    const handleTouchStart = useCallback((e) => {
        mouseEventRef.current[0] = e.targetTouches[0].clientX
    }, [])

    const handleTouchMove = useCallback((e) => {
        setIsMoved(true)
        mouseEventRef.current[1] = e.targetTouches[0].clientX
    }, [])

    function handleTouchEnd() {
        if (isMoved) {
            const [touchStart, touchEnd] = mouseEventRef.current
            const direction = touchStart - touchEnd > 0 ? 1 : -1

            if (Math.abs(touchStart - touchEnd) > 100) {
                updateIndex(activeIndex + direction)
            }

            setIsMoved(false)
        }
    }

    useEffect(() => {
        let interval

        if (autoplay) {
            interval = setInterval(() => {
                updateIndex(activeIndex + 1 >= childrenCount ? 0 : activeIndex + 1)
            }, props.duration)
        }

        return () => interval && clearInterval(interval)
    }, [activeIndex, autoplay, updateIndex, childrenCount, props.duration])

    return (
        <CarouselStyled activeIndex={activeIndex} className={className} {...props}>
            {showIndicator && childrenCount > 1 && (
                <Indicators>
                    {React.Children.map(notNullChildren, (child, index) => {
                        return (
                            <DotStyled
                                active={index === activeIndex}
                                onClick={() => updateIndex(index)}
                            />
                        )
                    })}
                </Indicators>
            )}
            <InnerStyled
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                activeIndex={activeIndex}
            >
                {React.Children.map(notNullChildren, (child) => {
                    return React.cloneElement(child, { width: '100%' })
                })}
            </InnerStyled>
        </CarouselStyled>
    )
}

CarouselItem.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.node])
}

CarouselItem.defaultProps = {
    width: '100%',
    children: null
}

Carousel.propTypes = {
    showIndicator: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node]),
    className: PropTypes.string,
    defaultActiveIndex: PropTypes.number,
    autoplay: PropTypes.bool,
    duration: PropTypes.number,
    onChange: PropTypes.func
}

Carousel.defaultProps = {
    showIndicator: true,
    children: null,
    className: null,
    defaultActiveIndex: 0,
    autoplay: false,
    duration: 3000,
    onChange: () => {}
}

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react'

import { preventHandler } from '../utils/handlers'

import { usePagination, getMediaListeners } from './utils'
import { PaginationStyle, PagesStyle, PaginatorStyle, FastForwardStyled, PaginationItem, DoubleStyled, EllipsisStyled } from './pagination.style'
import ic16DotsHorizontal from './ic-16-dots-horizontal.svg'
import ic16DoubleChevronLeft from './ic-16-double-chevron-left.svg'
import ic16DoubleChevronRight from './ic-16-double-chevron-right.svg'
import { ic24ChevronLeft, ic24ChevronRight } from './../icon/common'

const getIcon = (type) => {
    switch (type) {
        case 'next':
            return ic24ChevronRight
        case 'doubleNext':
            return ic16DoubleChevronRight
        case 'previous':
            return ic24ChevronLeft
        case 'doublePrevious':
        case 'first':
            return ic16DoubleChevronLeft
        default:
            return null
    }
}

export const Pagination = ({
    additionalChild = null,
    size = 'md',
    total = 1,
    defaultPage = 1,
    onChange = null,
    verticalPadding = 'zero',
    verticalMargin = 'inner',
    horizontalMargin = 'zero',
    horizontalPadding = 'zero',
    page,
    pageSize = 20,
    onPageSizeChange,
    pageSizeOptions = [20, 40, 60]
}) => {
    const mediaThemeSm = useTheme().media?.sm
    const mediaThemeMd = useTheme().media?.md

    const mediaMobileViewport = window.matchMedia(mediaThemeSm)
    const mediaTabletViewport = window.matchMedia(mediaThemeMd)

    const [mobileViewport, setMobileViewport] = useState(mediaMobileViewport.matches)
    const [tabletViewport, setTabletViewport] = useState(mediaTabletViewport.matches)

    const mobileViewportListener = (event) => {
        setMobileViewport(event.matches)
    }
    const tabletViewportListener = (event) => {
        setTabletViewport(event.matches)
    }

    const mobileMediaListeners = getMediaListeners(mediaMobileViewport, mobileViewportListener)
    const tabletMediaListeners = getMediaListeners(mediaTabletViewport, tabletViewportListener)

    useEffect(() => {
        mobileMediaListeners.addMediaListener()
        tabletMediaListeners.addMediaListener()

        return () => {
            mobileMediaListeners.removeMediaListener()
            tabletMediaListeners.removeMediaListener()
        }
    }, [])
    
    const modes = pageSizeOptions.sort((a, b) => a - b)

    const [countSize, setCountSizeState] = useState(pageSize)

    const { items } = usePagination({
        defaultPage: defaultPage < Math.ceil(total / countSize) ? defaultPage : 1,
        page,
        count: Math.ceil(total / countSize),
        onChange,
        size,
        mobile: mobileViewport
    })

    const handleClick = useCallback(
        (value) => {
            setCountSizeState(value)
            if (onPageSizeChange) {
                onPageSizeChange(value)
            }
        },
        [onPageSizeChange]
    )

    return (
        <PaginationStyle
            size={size}
            verticalMargin={verticalMargin}
            verticalPadding={verticalPadding}
            horizontalPadding={horizontalPadding}
            horizontalMargin={horizontalMargin}
        >
            <PaginatorStyle>
                {modes.map((mode) =>
                    (
                        <PaginationItem
                            onClick={preventHandler(() => handleClick(mode))}
                            selected={countSize === mode}
                            size={size}
                            title={`${mode}`}
                            key={mode}
                            horizontalMargin={size === 'sm' ? 'micro' : 'nano'}
                            verticalMargin={mobileViewport || tabletViewport ? 'inner' : 'zero'}
                            verticalMarginDirection="bottom"
                        />
                    )
                )}
            </PaginatorStyle>
            <PaginatorStyle>
                <nav>
                    <PagesStyle>
                        {items.map(({ pageItem, selected, type, ...item }, index) => {
                            let children = null

                            switch (type) {
                                case 'doublePrevious':
                                case 'doubleNext':
                                    children = (<FastForwardStyled
                                        role="button"
                                        size={size}
                                        horizontalMargin={size === 'sm' ? 'micro' : 'nano'}
                                        verticalMargin="zero"
                                    >
                                        <EllipsisStyled
                                            size={size}
                                            icon={ic16DotsHorizontal}
                                            height={16}
                                            width={16}
                                        />
                                        <DoubleStyled
                                            {...item}
                                            size={size}
                                            icon={getIcon(type)}
                                            colorScheme="brand"
                                            height={16}
                                            width={16}
                                        />
                                    </FastForwardStyled>)
                                    break
                                case 'page':
                                    children = (<PaginationItem
                                        {...item}
                                        selected={selected}
                                        title={`${pageItem}`}
                                        size={size}
                                        horizontalMargin={size === 'sm' ? 'micro' : 'nano'}
                                        verticalMargin="zero"
                                    />)
                                    break
                                case 'previous':
                                case 'first':
                                    children = (<PaginationItem
                                        {...item}
                                        icon={getIcon(type)}
                                        size={size}
                                        horizontalMargin={size === 'sm' ? 'open' : 'inner'}
                                        horizontalMarginDirection="right"
                                        verticalMargin="zero"
                                    />)
                                    break
                                case 'next':
                                    children = (<PaginationItem
                                        {...item}
                                        icon={getIcon(type)}
                                        size={size}
                                        horizontalMargin={size === 'sm' ? 'micro' : 'nano'}
                                        horizontalMarginDirection="left"
                                        verticalMargin="zero"
                                    />)
                                    break
                                default:
                                    break
                            }
                            return <li key={`List-${index}-element`}>{children}</li>
                        })}
                    </PagesStyle>
                </nav>
                {additionalChild}
            </PaginatorStyle>
        </PaginationStyle>
    )
}

Pagination.propTypes = {
    additionalChild: PropTypes.node,
    size: PropTypes.oneOf(['md', 'sm']),
    total: PropTypes.number,
    defaultPage: PropTypes.number,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    onPageSizeChange: PropTypes.func,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func,
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero'])
}

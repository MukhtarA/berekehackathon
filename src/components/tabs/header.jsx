import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { HorizontalScroll } from '../horizontal-scroll'
import { getFilteredComponent } from '../utils'

import { TabsHeaderStyled, TabsScrollStyled } from './tabs.style'

const passedProps = [
    'className',
    'children'
]

export const Header = ({
    children,
    fullWidth,
    sticky,
    borderless,
    parentId = '',
    scrollContainer: {
        Outer,
        Inner
    } = {}
}) => {
    const TabsHeaderComponent = useMemo(() =>
        fullWidth && Outer
            ? TabsHeaderStyled.withComponent(getFilteredComponent(Outer, { passedProps }))
            : TabsHeaderStyled
    , [fullWidth, Outer])

    const TabsScrollComponent = useMemo(() =>
        fullWidth && Inner
            ? TabsScrollStyled.withComponent(getFilteredComponent(Inner, { passedProps }))
            : TabsScrollStyled
    , [fullWidth, Inner])

    return (
        <TabsHeaderComponent sticky={sticky}>
            <TabsScrollComponent isBorderless={borderless}>
                <HorizontalScroll parentId={parentId}>
                    {children}
                </HorizontalScroll>
            </TabsScrollComponent>

        </TabsHeaderComponent>
    )
}

Header.propTypes = {
    children: PropTypes.node,
    fullWidth: PropTypes.bool,
    sticky: PropTypes.bool,
    borderless: PropTypes.bool,
    parentId: PropTypes.string,
    scrollContainer: PropTypes.shape({
        Outer: PropTypes.func,
        Inner: PropTypes.func
    })
}

import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { omit, extend } from 'lodash'

import { checkPositionForScroll } from './tab-utils'
import { TabButtonStyled, TypographyStyled } from './tabs.style'

/**
 * [Zeplin](https://app.zeplin.io/project/59312e1ebdf1da6fc8d37ffb/dashboard?q=Blocks%20Tabs)
 * Якорь блока верстки для отображения в параллели Tabs
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const Tab = React.forwardRef((props, ref) => {
    const {
        forceOpened,
        title,
        id,
        onChange,
        size = 'lg',
        colorScheme,
        parentId
    } = props

    const scrollItemsAndChange = useCallback((e) => {
        const clickedItem = e.target
        const wrapper = document.getElementById(parentId)

        checkPositionForScroll(wrapper, clickedItem)
        onChange(title)
    }, [forceOpened])

    const passedProps = extend(omit(props, [
        'onChange',
        'forceOpened',
        'tabsId',
        'mode',
        'colorScheme',
        'disabled',
        'title',
        'parentId'
    ]), {
        id: forceOpened ? `tab-${id}` : void 0,
        tabIndex: forceOpened ? void 0 : -1,
        role: 'tab',
        'aria-selected': forceOpened,
        'aria-controls': forceOpened ? `panel-${id}` : void 0,
        onClick: scrollItemsAndChange
    })

    return (
        <TabButtonStyled
            {...passedProps}
            type="button"
            ref={ref}
            selected={forceOpened}
            colorScheme={colorScheme}
        >
            <TypographyStyled size={size} fontWeight="medium">{title}</TypographyStyled>
        </TabButtonStyled>
    )
})

Tab.propTypes = {
    title: PropTypes.string.isRequired,
    forceOpened: PropTypes.bool,
    onChange: PropTypes.func,
    /**
     * Передается из Tabs. Необходимо для a11y связки
     */
    id: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    colorScheme: PropTypes.string,
    parentId: PropTypes.string
}

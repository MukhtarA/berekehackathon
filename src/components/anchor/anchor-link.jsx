import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { TabButtonStyled, TypographyStyled } from '../tabs/tabs.style'

export const AnchorLink = ({
    size = 'lg',
    mode = 'default',
    title,
    onChange = noop,
    colorScheme,
    forceOpened = false
}) => {
    const handleClick = useCallback(() => {
        onChange(title)
    }, [title])

    return title ? (
        <TabButtonStyled
            size={size}
            role="link"
            mode={mode}
            onClick={handleClick}
            selected={forceOpened}
            colorScheme={colorScheme}
        >
            <TypographyStyled size={size}>
                {title}
            </TypographyStyled>
        </TabButtonStyled>
    ) : null
}

AnchorLink.propTypes = {
    title: PropTypes.string,
    forceOpened: PropTypes.bool,
    onChange: PropTypes.func,
    /**
     * Дополнительная индикация таба. Не взаимоисключается с colorScheme
     */
    mode: PropTypes.oneOf([
        'default',
        'success',
        'error'
    ]),
    /**
     * Передается из Tabs.
     */
    colorScheme: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

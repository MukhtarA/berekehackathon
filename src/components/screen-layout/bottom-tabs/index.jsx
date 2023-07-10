import React from 'react'
import PropTypes from 'prop-types'
import { IconLoader } from '@sbol/design-system/core/icon'

import { BottomTabsStyled, BottomTabStyled, IconWrapperStyled, TitleStyled } from './style'

export const BottomTab = ({ title, iconName, renderBadge, ...rest }) => (
    <BottomTabStyled key={title} {...rest}>
        <IconWrapperStyled>
            {renderBadge && renderBadge()}
            <IconLoader name={iconName} colorScheme="tertiary" />
        </IconWrapperStyled>
        <TitleStyled>{title}</TitleStyled>
    </BottomTabStyled>
)

BottomTab.propTypes = {
    title: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    renderBadge: PropTypes.func
}

export const BottomTabs = ({ fullWidth, children, className }) => (
    <BottomTabsStyled fullWidth={fullWidth} className={className}>
        {children}
    </BottomTabsStyled>
)

BottomTabs.propTypes = {
    children: PropTypes.node.isRequired,
    fullWidth: PropTypes.bool
}
BottomTabs.defaultProps = {
    fullWidth: false,
    renderBadge: () => {}
}

export default BottomTabs

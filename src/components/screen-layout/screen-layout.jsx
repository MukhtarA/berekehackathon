import React from 'react'
import PropTypes from 'prop-types'

import HeaderSection from './header'
import BottomTabsSection, { BottomTab } from './bottom-tabs'
import { LayoutStyled, ContentStyled } from './style'
import { Footer } from './footer'
import { ShowSmsDialogFallbacks } from './mobile-fallbacks'
import { PullRefresh } from './pullRefresh'

const ContentSection = ({ children, onPullRefresh, ...rest }) => (
    <PullRefresh onPullRefresh={onPullRefresh}>
        <ContentStyled {...rest}>
            <>{children}</>
            <ShowSmsDialogFallbacks />
        </ContentStyled>
    </PullRefresh>
)

ContentSection.propTypes = {
    children: PropTypes.node.isRequired,
    noPadding: PropTypes.bool
}

ContentSection.defaultProps = {
    noPadding: false
}

const ScreenLayout = ({ children }) => {
    return <LayoutStyled>{children}</LayoutStyled>
}

ScreenLayout.propTypes = {
    children: PropTypes.node.isRequired
}

ScreenLayout.Header = HeaderSection
ScreenLayout.Content = ContentSection
ScreenLayout.Footer = Footer
ScreenLayout.BottomTabs = BottomTabsSection
ScreenLayout.BottomTab = BottomTab

export default ScreenLayout

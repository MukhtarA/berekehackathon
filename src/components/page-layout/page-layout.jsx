import React from 'react'
import { Global } from '@emotion/react'
import PropTypes from 'prop-types'

import '@web_sbol/shared/src/utils/focus-visible'

import { Grid, Cell } from '../grid'
import { Header } from './header'
import { Footer } from './footer'
import { globalStyled, ContentStyled, LayoutStyled, HeaderStyled } from './page-layout.style'
import ToastNotifications from '../toast-notifications'

const Container = ({ children }) => (
    <Grid>
        <Cell lg={58} md={38} sm={23}>
            {children}
        </Cell>
    </Grid>
)

Container.propTypes = {
    children: PropTypes.node.isRequired
}

const ContentSection = ({ children }) => (
    <ContentStyled>
        <Container>{children}</Container>
    </ContentStyled>
)

ContentSection.propTypes = {
    children: PropTypes.node.isRequired
}

const HeaderSection = ({ children, noPadding, heightMaxContent }) => (
    <HeaderStyled noPadding={noPadding} heightMaxContent={heightMaxContent}>
        <Container>{children}</Container>
    </HeaderStyled>
)

HeaderSection.propTypes = {
    children: PropTypes.node.isRequired,
    noPadding: PropTypes.bool,
    heightMaxContent: PropTypes.bool
}

HeaderSection.defaultProps = {
    noPadding: false,
    heightMaxContent: false
}

const PageLayout = ({ children, status, withOutProfile }) => {
    return (
        <LayoutStyled status={status}>
            <Global styles={globalStyled} />
            <Header withOutProfile={withOutProfile} />
            {children}
            <Footer />
            <ToastNotifications />
        </LayoutStyled>
    )
}

PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
    status: PropTypes.string,
    withOutProfile: PropTypes.bool
}

PageLayout.defaultProps = {
    status: '',
    withOutProfile: false
}

PageLayout.Header = HeaderSection
PageLayout.Content = ContentSection

export default PageLayout

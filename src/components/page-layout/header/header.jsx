import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Translation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { selectorUserIsVip } from '@web_sbol/index/src/features/profile/profile-slice'
import { Grid, Cell } from '../../grid'
import { Navigation } from './navigation'
// import Search from './search'
import LanguageMenu from '../../language-menu'
import ProfileMenu from './profile-menu'
import {
    HeaderStyled,
    HeaderWrapperStyled,
    LogoIconStyled,
    EnvLabelStyled,
    LeftMenuStyled,
    NavItemStyled,
    IconStyled
} from './header.style'

import logoIcon from '../assets/logo.svg'
import rightMenuIcon from '../assets/right-menu.svg'

const Header = ({ withOutProfile }) => {
    const width = window.innerWidth
    const history = useHistory()
    const vip = useSelector(selectorUserIsVip)

    const push = useCallback(
        (value) => () => {
            history.push(value)
        },
        [history]
    )

    return (
        <Translation ns="shared">
            {(t) => (
                <HeaderStyled>
                    <Grid>
                        <Cell lg={58} md={38} sm={23}>
                            <HeaderWrapperStyled>
                                <LeftMenuStyled
                                    position="overlay"
                                    title=""
                                    a11y={{ title: 'navigation-menu' }}
                                    id="navigation-menu"
                                    mode="click"
                                    icon={rightMenuIcon}
                                >
                                    <NavItemStyled title={t('link.main')} onClick={push('/')} />
                                    <NavItemStyled
                                        title={t('link.operations')}
                                        onClick={push('/operations')}
                                    />
                                    <NavItemStyled
                                        title={t('link.assignments')}
                                        onClick={push('/assignments')}
                                        hidden={!vip}
                                    />
                                    <NavItemStyled
                                        title={t('payments.main')}
                                        onClick={push('/payments-kz')}
                                    />
                                    <NavItemStyled
                                        title={t('link.history')}
                                        onClick={push('/history')}
                                    />
                                </LeftMenuStyled>

                                {(width > 1312 || width < 732) && (
                                    <LogoIconStyled
                                        to="/"
                                        title={t('layout.pageTitle')}
                                        aria-label={t('layout.pageTitle')}
                                        dangerouslySetInnerHTML={{ __html: logoIcon }}
                                    />
                                )}
                                {process.env.ENVIRONMENT !== 'prom' && (
                                    <EnvLabelStyled>
                                        {process.env.ENVIRONMENT === 'development'
                                            ? '.dev'
                                            : `.${process.env.ENVIRONMENT}`}
                                    </EnvLabelStyled>
                                )}
                                <Navigation vip={vip} />
                                <LanguageMenu isWhite={false} />
                                {process.env.ENVIRONMENT !== 'prom' && (
                                    <IconStyled
                                        onClick={push('/notifications')}
                                        name="icon:core/common/ic-36-bell"
                                        colorScheme="brandPrimary"
                                    />
                                )}
                                {withOutProfile ? null : <ProfileMenu />}
                            </HeaderWrapperStyled>
                            {/* <Search*/}
                            {/*    id="global-search"*/}
                            {/*    placeholder={t('layout.searchPlaceholder')}*/}
                            {/* />*/}
                        </Cell>
                    </Grid>
                </HeaderStyled>
            )}
        </Translation>
    )
}

Header.propTypes = {
    withOutProfile: PropTypes.bool
}

Header.defaultProps = {
    withOutProfile: false
}

export default Header

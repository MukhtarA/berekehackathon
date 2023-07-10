import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { NavStyled, NavLinkStyled } from './header.style'

export const Navigation = ({ vip }) => {
    const { t } = useTranslation('shared')

    return (
        <NavStyled>
            <NavLinkStyled to="/" exact>
                {t('link.main')}
            </NavLinkStyled>
            <NavLinkStyled to="/operations">{t('link.operations')}</NavLinkStyled>
            {vip && <NavLinkStyled to="/assignments">{t('link.assignments')}</NavLinkStyled>}
            <NavLinkStyled to="/payments-kz">{t('payments.main')}</NavLinkStyled>
            <NavLinkStyled to="/history">{t('link.history')}</NavLinkStyled>
        </NavStyled>
    )
}

Navigation.propTypes = {
    vip: PropTypes.bool.isRequired
}

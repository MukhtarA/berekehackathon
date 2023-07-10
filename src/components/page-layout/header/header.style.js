import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, MenuItem } from '@sbol/design-system/core/menu'
import { IconLoader } from '@sbol/design-system/core/icon'

import { mediaSm, mediaMd } from '@web_sbol/shared/src/utils/media.config.style'

export const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    z-index: 10;
`

export const HeaderWrapperStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
`

export const LeftMenuStyled = styled(Menu)`
    display: none;
    background: none;

    ul {
        left: 10%;
        top: 100% !important;
    }

    ${mediaSm} {
        display: block;
    }
`

export const UserMenuWrapperStyled = styled.div`
    div > button > span {
        height: 24px !important;
        width: 24px !important;
    }

    div > button > p {
        padding-left: 6px !important;
        white-space: nowrap;
    }
`

export const LogoIconStyled = styled(Link)(
    ({ theme, loginPage }) => css`
        path {
            fill: ${loginPage ? theme.whitePrimary : theme.brandPrimary};
        }

        ${mediaSm} {
            width: 36px;
            overflow: hidden;
            margin-left: 36px;
        }

        ${mediaMd} {
            width: 36px;
            overflow: hidden;
            margin-left: 16px;
        }
    `
)

export const NavStyled = styled.nav`
    flex: 1 1 auto;
    margin-left: 25px;
    display: flex;

    ${mediaSm} {
        display: none;
    }

    ${mediaMd} {
        margin-left: 16px;
    }
`

export const NavLinkStyled = styled(NavLink)(
    ({ theme }) => css`
        padding: 6px 0;
        list-style: none;
        color: ${theme.primary};
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: -0.02em;
        white-space: nowrap;
        cursor: pointer;
        border-bottom: 3px solid ${theme.transparent};
        border-radius: 1.5px;
        transition: all 0.2s ease;

        &:not(:last-of-type) {
            margin-right: 16px;
        }

        &:last-of-type {
            margin-right: 10px;
        }

        &:hover {
            border-bottom-color: ${theme.successTransparent40};
        }

        &.active {
            border-bottom-color: ${theme.successPrimary};
        }
    `
)

export const NavItemStyled = styled(MenuItem)`
    display: ${({ hidden }) => (hidden ? 'none' : '')};
    p {
        font-weight: 600;
    }
`

export const MenuItemStyled = styled(MenuItem)(
    ({ theme, exit, isVisible = true, alignLeft = false, inEdit }) => css`
        display: ${isVisible ? 'flex' : 'none'};

        button {
            ${alignLeft ? 'display: flex' : null}
        }

        path {
            ${exit ? `fill: ${theme.warningPrimary};` : `fill: ${theme.successPrimary};`}
        }

        span {
            margin-left: -8px;
            ${inEdit ? 'opacity: 0.2; cursor: not-allowed;' : null}
        }

        p {
            ${inEdit ? 'opacity: 0.2; cursor: not-allowed;' : null}
            white-space: normal;
        }
    `
)

export const SearchWrapperStyled = styled.div`
    position: relative;
`

export const SearchInputStyled = styled.input(
    ({ theme }) => css`
        margin-top: 32px;
        margin-bottom: 16px;
        cursor: pointer;
        width: 100%;
        padding: 14px 42px 14px 16px;
        border-radius: 4px;
        outline: none;
        font-size: 14px;
        transition: box-shadow 0.3s;
        line-height: 0;
        background-color: ${theme.whitePrimary};

        &::placeholder {
            letter-spacing: -0.3px;
            color: ${theme.secondary};
        }

        &::-ms-clear {
            display: none;
        }

        &:hover {
            box-shadow: 0 25px 31px 0 ${theme.firstShadow};
        }
    `
)

export const SearchIconStyled = styled.span`
    position: absolute;
    right: 12px;
    top: 44px;
`

export const EnvLabelStyled = styled.p`
    margin: 0 0 -9px 0;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme, login }) => (login ? theme.whitePrimary : theme.brandPrimary)};
`

export const IconStyled = styled(IconLoader)`
    margin: 0 4px;

    :hover {
        cursor: pointer;
    }
`

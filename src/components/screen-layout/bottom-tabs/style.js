import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { NavLink } from 'react-router-dom'

import { mdShadow } from '../../styles/shadows.config.style'
import { Typography } from '../../typography'

export const BottomTabsStyled = styled.nav(
    ({ theme, fullWidth }) => css`
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 68px;
        min-height: 68px;
        box-shadow: ${mdShadow(theme)};
        position: sticky;
        bottom: 0;
        margin: ${fullWidth && '0 -23px'};
    `
)

export const BottomTabStyled = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;

    svg {
        width: 24px;
        height: 24px;
    }

    &.active {
        svg {
            fill: ${({ theme }) => theme.brandPrimary};
        }

        p {
            color: ${({ theme }) => theme.brandPrimary};
        }
    }
`

export const TitleStyled = styled(Typography)(
    ({ theme }) => css`
        color: ${theme.tertiary};
        font-size: 10px;
        margin: auto;
    `
)

export const IconWrapperStyled = styled.div`
    position: relative;
`

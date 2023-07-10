import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicBackgroundColor } from '../styles/dynamic-styles'

const loaderPointStyled = {
    sm: {
        height: '4px',
        width: '4px',
        marginLeft: '8px'
    },
    md: {
        height: '8px',
        width: '8px',
        marginLeft: '16px'
    },
    lg: {
        height: '16px',
        width: '16px',
        marginLeft: '32px'
    }
}

const dynamicLoaderPointStyle = ({ size = 'md' }) => css`
    height: ${loaderPointStyled[size].height};
    width: ${loaderPointStyled[size].width};
    &:not(:first-child) {
        margin-left: ${loaderPointStyled[size].marginLeft};
    }
`

export const LoaderPointStyled = styled.span`
    background-color: ${({ theme }) => theme.loaderBodyPrimary};
    display: block;
    border-radius: 50%;
`

export const LoaderStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${LoaderPointStyled} {
        ${({ animationTheme }) => animationTheme};
        ${dynamicLoaderPointStyle};
        ${({ colorScheme, theme }) => dynamicBackgroundColor(theme.primary)({ colorScheme, theme })};
    };
`

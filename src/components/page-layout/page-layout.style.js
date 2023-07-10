import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
    gray0,
    gray4A,
    gray24A,
    gray40A,
    gray60A
} from '@sbol/design-system/core/styles/colors.config.style'

const narniaColor = '#f3f4f8'
const infoColor = '#f8f6fb'

const getStatusBackground = ({ status, theme }) => {
    if (status === 'success') {
        return css`
            background: linear-gradient(
                180deg,
                ${gray0} 0%,
                ${theme.successTransparent16} 46.31%
            ) !important;
        `
    }

    if (status === 'info') {
        return css`
            background: linear-gradient(180deg, ${gray0} 0%, ${infoColor} 46.31%) !important;
        `
    }

    if (status === 'error' || status === 'failed') {
        return css`
            background: linear-gradient(
                180deg,
                ${gray0} 0%,
                ${theme.warningTransparent16} 46.31%
            ) !important;
        `
    }

    return css`
        background-color: ${narniaColor} !important;
    `
}

export const globalStyled = css`
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: ${gray4A};
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${gray24A};
        border-radius: 6px;
        border: 2px solid ${gray4A};
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${gray40A};
    }

    ::-webkit-scrollbar-thumb:active {
        background: ${gray60A};
    }
`

export const LayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    ${getStatusBackground}
`

export const HeaderStyled = styled.div(
    ({ noPadding, heightMaxContent }) => css`
        padding-bottom: ${noPadding ? 0 : '64px'};
        ${heightMaxContent ? 'height: max-content;' : 'flex: 1;'}
    `
)

export const ContentStyled = styled.div(
    ({ theme }) => css`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        height: 100%;
        width: 100%;
        justify-content: space-around;
        padding-bottom: 64px;
        background-color: ${theme.white};
    `
)

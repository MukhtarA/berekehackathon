import styled from "@emotion/styled/macro"
import { css, keyframes } from '@emotion/react'

const twistSm = keyframes`
    0% {
        stroke-dasharray: 1, 45;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 27, 45;
    }

    100% {
        stroke-dasharray: 27, 45;
        stroke-dashoffset: -37;
    }
`

const twistLg = keyframes`
    0% {
        stroke-dasharray: 1, 75;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 45, 75;
    }

    100% {
        stroke-dasharray: 45, 75;
        stroke-dashoffset: -61;
    }
`

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }

    13% {
        transform: rotate(90deg);
    }

    25% {
        transform: rotate(90deg);
    }

    38% {
        transform: rotate(180deg);
    }

    50% {
        transform: rotate(180deg);
    }

    63% {
        transform: rotate(270deg);
    }

    75% {
        transform: rotate(270deg);
    }

    88% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(360deg);
    }
`

const ieTwist = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`

const loaderIconStyle = {
    sm: {
        size: '24px',
        sizeCircle: '13px',
        strokeWidth: '4px',
        ieIndent: '6px',
        animation: twistSm
    },
    lg: {
        size: '36px',
        sizeCircle: '20px',
        strokeWidth: '4px',
        ieIndent: '8px',
        animation: twistLg
    }
}

const loaderModeStyle = (theme, mode) => {
    switch (mode) {
        case 'dark':
            return {
                strokeLoader: theme.loaderIconLoaderPrimary,
                strokeBorder: theme.loaderIconBorderPrimary,
            }
        case 'light':
            return {
                strokeLoader: theme.loaderIconLoaderSecondary,
                strokeBorder: theme.loaderIconBorderSecondary,
            }
        default:
            return {
                strokeLoader: theme.loaderIconLoader,
                strokeBorder: theme.loaderIconBorder,
            }
    }
}

const dynamicLoaderModeStyle = ({ mode, theme }) => css`
    stroke: ${loaderModeStyle(theme, mode).strokeLoader};
`

const dynamicBorderModeStyle = ({ mode, theme }) => css`
    stroke: ${loaderModeStyle(theme, mode).strokeBorder};
`

const dynamicLoaderStyle = ({ size = 'lg' }) => css`
    stroke-linecap: round;
    stroke-width: ${loaderIconStyle[size].strokeWidth};
`

const ieDynamicBorderModeStyle = ({ mode, theme }) => css`
    border-color: ${loaderModeStyle(theme, mode).strokeBorder};
`

const ieDynamicLoaderModeStyle = ({ mode, theme }) => css`
    border-color: ${loaderModeStyle(theme, mode).strokeLoader} ${theme.ieLoaderIconLoaderPrimary}
        ${theme.ieLoaderIconLoaderPrimary} ${theme.ieLoaderIconLoaderPrimary};
`

const ieDynamicLoaderStyle = ({ size = 'lg' }) => css`
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-style: solid;
    border-radius: 50%;
    margin: ${loaderIconStyle[size].ieIndent};
    height: ${loaderIconStyle[size].sizeCircle};
    width: ${loaderIconStyle[size].sizeCircle};
    border-width: ${loaderIconStyle[size].strokeWidth};
`

const dynamicLoaderIconStyle = ({ size = 'lg' }) => css`
    height: ${loaderIconStyle[size].size};
    width: ${loaderIconStyle[size].size};
`

export const LoaderStyled = styled.circle`
    ${dynamicLoaderStyle};
    ${dynamicLoaderModeStyle};
    animation: ${({ size }) => loaderIconStyle[size].animation} 2s cubic-bezier(0.72, 0.05, 0.3, 1.02) infinite;
`

export const BorderStyled = styled.circle`
    ${dynamicLoaderStyle};
    ${dynamicBorderModeStyle};
`

export const CircleStyled = styled.svg`
    ${dynamicLoaderIconStyle};
    animation: ${rotate} 8s linear infinite;
`

export const IeLoaderStyled = styled.div`
    ${ieDynamicLoaderStyle};
    ${ieDynamicLoaderModeStyle};
    animation: ${ieTwist} 2s cubic-bezier(0.72, 0.05, 0.3, 1.02) infinite;
    &:nth-child(1) {
        animation-delay: -0.45s;
    }
    &:nth-child(2) {
        animation-delay: -0.3s;
    }
    &:nth-child(3) {
        animation-delay: -0.15s;
    }
`

export const IeBorderStyled = styled.div`
    ${ieDynamicLoaderStyle};
    ${ieDynamicBorderModeStyle};
`

export const IeCircleStyled = styled.div`
    height: 100%;
    width: 100%;
    animation: ${rotate} 8s linear infinite;
`

export const LoaderIconStyled = styled.div`
    box-sizing: border-box;
    display: block;
    position: relative;
    ${dynamicLoaderIconStyle};
`

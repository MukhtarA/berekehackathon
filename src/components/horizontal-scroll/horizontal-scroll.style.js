import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Icon } from '../icon'
import { zIndexTooltip } from '../styles/z-index.config.style'
import { baseX } from '../styles/semantic.config.style'
import { mdShadow, smShadow } from '../styles/shadows.config.style'
import { focusBorder } from '../styles/dynamic-styles'

const SHADOW_OFFSET = 6
const BUTTON_BLOCK_SIZE = 12
const BUTTON_INLINE_SIZE = 6

export const ScrollStyled = styled.div(({ mode }) => css`
    position: relative;

    ${mode === 'inline' && css`
        display: flex;
    `}
`)

export const ScrollZoneStyled = styled.div(({ mobile, mode, leftControlHidden, rightControlHidden }) => css`
    white-space: nowrap;
    display: flex;
    overflow-x: hidden;

    ${mode === 'block' && css`
        margin: -${SHADOW_OFFSET * baseX}px 0;
        padding: ${SHADOW_OFFSET * baseX}px 0;

        ${(leftControlHidden || mobile) && css`
                margin-left: -${SHADOW_OFFSET * baseX}px;

                &::before {
                    content: '';
                    padding-left: ${SHADOW_OFFSET * baseX}px;
                }
            `}

        ${(rightControlHidden || mobile) && css`
                margin-right: -${SHADOW_OFFSET * baseX}px;

                &::after {
                    content: '';
                    padding-right: ${SHADOW_OFFSET * baseX}px;
                }
            `}
    `}

    ${mobile && css`
        overflow-x: auto;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
            display: none;
        }
    `}
`)

export const ContentsStyled = styled.div`
    display: inline-flex;
    flex-shrink: 0;
`

export const ControlStyled = styled.div(({ mode, side, active, theme }) => css`
    flex-shrink: 0;
    z-index: ${zIndexTooltip - 1};
    transition: width 0.17s ease-in-out;
    position: absolute;
    height: 100%;
    top: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    ${mode === 'block' && side === 'left' && css`
        left: -${BUTTON_BLOCK_SIZE * baseX / 2}px;

        & svg {
            transform: rotate(180deg);
        }
    `}
    ${mode === 'block' && side === 'right' && css`
        right: -${BUTTON_BLOCK_SIZE * baseX / 2}px;
    `}
    ${mode === 'banner' && side === 'left' && css`
        left: -${BUTTON_BLOCK_SIZE * baseX / 2}px;

        & svg {
            transform: rotate(180deg);
        }
    `}
    ${mode === 'banner' && side === 'right' && css`
        right: -${BUTTON_BLOCK_SIZE * baseX / 2}px;
    `}
    ${mode === 'inline' && side === 'left' && css`
        left: 0;
    `}
    ${mode === 'inline' && side === 'left' && active && css`
        &::after {
            content: '';
            width: 36px;
            height: 100%;
            background-image: linear-gradient(to right, ${theme.horizontalScrollGradientFrom}, ${theme.horizontalScrollGradientTo});
        }
    `}
    ${mode === 'inline' && side === 'right' && css`
        right: 0;
    `}
    ${mode === 'inline' && side === 'right' && active && css`
        &::before {
            content: '';
            width: 36px;
            height: 100%;
            background-image: linear-gradient(to left, ${theme.horizontalScrollGradientFrom}, ${theme.horizontalScrollGradientTo});
        }
    `}
`)

const blockButtonStyle = ({ mode, active, theme }) => (mode === 'block' || mode === 'banner') && css`
    width: ${BUTTON_BLOCK_SIZE * baseX}px;
    height: ${BUTTON_BLOCK_SIZE * baseX}px;
    border: 1px solid ${theme.buttonElevationBoderNormal};
    border-radius: 50%;
    box-shadow: ${smShadow(theme)};
    background-color: ${theme.buttonElevationBody};

    &:hover {
        box-shadow: ${mdShadow(theme)};
        border: 1px solid ${theme.buttonElevationBoderHover};
    }

    ${active && css`
        ${ScrollStyled}:hover & {
            opacity: 1;
        }

        body:not(.pointer-events) &:focus {
            opacity: 1;

            ${focusBorder(theme.focusColor, '1px')};

            border-color: ${theme.focusColor};
        }
    `}
`

const inlineButtonStyle = ({ mode, active, theme }) => mode === 'inline' && css`
    width: ${BUTTON_INLINE_SIZE * baseX}px;
    height: 100%;
    background-color: ${theme.horizontalScrollGradientFrom};

    ${active && css`
        opacity: 1;

        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.focusColor)};
        }
    `}
`

export const ButtonStyled = styled.button(({ theme, active }) => css`
    padding: 0;
    margin: 0;
    opacity: 0;
    outline: none;
    position: relative;
    transition:
        opacity 0.17s ease-in-out,
        box-shadow 0.17s ease-in-out;

    svg {
        transition: fill 0.17s ease-in-out;
        fill: ${theme.buttonElevationText};
    }
    
    ${active && css`
        cursor: pointer;
        pointer-events: visible;
    `}
`,
blockButtonStyle,
inlineButtonStyle
)

export const IconShadowStyled = styled.span(({ side, active }) => css`
    position: absolute;
    top: 0;
    opacity: 0;
    height: 100%;
    transition: opacity 0.17s linear;
    ${side === 'left' && css`
        left: 50%;

        svg {
            transform: rotate(180deg);
        }
    `}
    ${side === 'right' && css`
        right: 50%;
    `}
    ${active && css`
        opacity: 1;
    `}
`).withComponent(Icon)

export const NavigationStyled = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 16px;
    padding-bottom: 10px;
`

export const DotsStyled = styled.button(({ active, theme }) => css`
    margin-right: 6px;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        transition: background-color 0.37s ease-in-out;
        background-color: ${theme.bannerNavigationButtonHover};
    }

    background-color: ${theme.bannerNavigationButtonNormal};
    transition: all 0.77s ease-in-out;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    overflow: visible;
    padding: 0;
    cursor: pointer;

    ${active && css`
        transition: all 0.77s ease-in-out;
        background-color: ${theme.bannerNavigationButtonClick};
        width: 18px;
    `}
`)

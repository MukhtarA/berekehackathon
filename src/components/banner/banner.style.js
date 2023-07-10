import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Container } from '../indent-wrapper/container'
import { smBorderRadius } from '../styles/radius.config.style'
import { smShadow } from '../styles/shadows.config.style'
import { dynamicIndent } from '../styles/dynamic-styles'

const dynamicBackground = (colorScheme, theme) => {
    switch (colorScheme) {
        case 'success':
            return theme.bannerSuccess
        case 'info':
            return theme.bannerInfo
        case 'warning':
            return theme.bannerWarning
        case 'draft':
            return theme.bannerDraft
        default:
            return theme.noColor
    }
}

export const ContainerStyled = styled.div(({ theme, colorScheme }) => css`
    display: flex;
    background-color: ${dynamicBackground(colorScheme, theme)};
    min-height: 156px;
    padding-left: ${dynamicIndent('h3', 'inner')};
    border-radius: ${smBorderRadius};
    box-shadow: ${smShadow(theme)};

    ${theme.media?.sm && css`
        @media ${theme.media.sm} {
            min-height: auto;
            padding-right: ${dynamicIndent('h3', 'inner')};
        }
    `}
`)

export const ContentStyled = styled(Container)(({ theme }) => css`
    width: 344px;
    flex-shrink: 0;

    ${theme.media?.sm && css`
        @media ${theme.media.sm} {
            width: 100%;
        }
    `}
`)

export const ImageWrapperStyled = styled.div(({ theme }) => css`
    position: relative;
    overflow: hidden;
    width: 100%;

    ${theme.media?.sm && css`
        @media ${theme.media.sm} {
            display: none;
        }
    `}
`)

export const ImgStyled = styled.img`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    height: 100%;
    width: auto;
    pointer-events: none;
`

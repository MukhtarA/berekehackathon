import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../typography'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'
import { baseX } from '../styles/semantic.config.style'
import { dynamicBackgroundColor, focusBorder } from '../styles/dynamic-styles'

export const TabsStyled = styled.div``
export const TabsContentSectionStyled = styled.section`
    outline: none;

    body:not(.pointer-events) &:focus {
        ${({ theme }) => focusBorder(theme.focusColor)};
    }
`

export const TypographyStyled = styled(Typography)(({ theme }) => css`
    color: ${theme.tabTextNormal};
`)

const stickyStyle = ({ theme, sticky }) => sticky && css`
    position: sticky;
    top: 0;
    background-color: ${theme.tabsStickyBody};
    z-index: 35;
`

export const TabsHeaderStyled = styled.div(
    stickyStyle
)

export const TabsScrollStyled = styled.div(({ theme, isBorderless }) => css`
    width: 100%;

    ${!isBorderless && css`
        border-bottom: 1px solid ${theme.tabsBorder};
    `}
`)

const dynamicTabIndent = ({ size }) => {
    const padding = paddingStyle({ size, verticalPadding: 'inner' })
    const margin = marginStyle({ size, horizontalMargin: 'inner' })
    return css`
        &:not(:last-of-type) {
            ${margin};
        }
        ${padding};
    `
}

const selectedStyle = ({ colorScheme, selected, theme }) => selected && css`
        ${TypographyStyled} {
            color: ${theme.tabSelectedText};
        }

        &::before {
            transition: background-color 0.33s ease-out;
            ${dynamicBackgroundColor(theme.tabSelectedIndicator)({ colorScheme, theme })};
        }

        &:hover {
            &::before {
                ${dynamicBackgroundColor(theme.tabSelectedIndicator)({ colorScheme, theme })};
            }

            ${TypographyStyled} {
                color: ${theme.tabSelectedText};
            }
        }
    `

export const TabButtonStyled = styled.button(({ theme }) => css`
    cursor: pointer;
    padding: 0;
    background-color: ${theme.tabBody};
    overflow: visible;
    position: relative;
    outline: none;
    
    &:first-child {
        margin-left: 0;
    }

    &::before {
        content: ''; 
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        background-color: ${theme.tabIndicatorNormal};
        transition: background-color 0.3s ease;
    }
    
    body:not(.pointer-events) &:focus {
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: ${baseX}px;
            ${focusBorder(theme.focusColor)};

            box-sizing: border-box;
        }
    }

    &:hover {
        &::before {
            background-color: ${theme.tabIndicatorHover};
        }

        ${TypographyStyled} {
            color: ${theme.tabTextHover};
        }
    }
`, dynamicTabIndent, selectedStyle)

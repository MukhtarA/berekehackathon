import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography, HEADERS } from '../typography'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'
import { IconLoaderViewBox, IconViewBox } from '../icon/icon-view'
import { baseX } from '../styles/semantic.config.style'
import {
    lineHeightLg,
    lineHeightMd,
    lineHeightSm,
    lineHeightHeadline1,
    lineHeightHeadline2,
    lineHeightHeadline3,
    lineHeightHeadline4,
    lineHeightHeadline5,
    letterSpacingHeadline
} from '../styles/font-sizes.config.style'
import { focusBorder } from '../styles/dynamic-styles'

const iconSizes = {
    sm: lineHeightSm,
    md: lineHeightMd,
    lg: lineHeightLg,
    h1: lineHeightHeadline1,
    h2: lineHeightHeadline2,
    h3: lineHeightHeadline3,
    h4: lineHeightHeadline4,
    h5: lineHeightHeadline5
}

const successTheme = (theme) => ({
    linkNormal: theme.linkSuccessNormal,
    linkHover: theme.linkSuccessHover,
    linkClick: theme.linkSuccessClick,
    linkDisabled: theme.linkDisabled
})

const infoTheme = (theme) => ({
    linkNormal: theme.linkInfoNormal,
    linkHover: theme.linkInfoHover,
    linkClick: theme.linkInfoClick,
    linkDisabled: theme.linkDisabled
})

const warningTheme = (theme) => ({
    linkNormal: theme.linkWarningNormal,
    linkHover: theme.linkWarningHover,
    linkClick: theme.linkWarningClick,
    linkDisabled: theme.linkDisabled
})

const primaryTheme = (theme) => ({
    linkNormal: theme.linkPrimaryNormal,
    linkHover: theme.linkPrimaryHover,
    linkClick: theme.linkPrimaryClick,
    linkDisabled: theme.linkDisabled
})

const themeByColorScheme = (theme, colorScheme) => {
    switch (colorScheme) {
        case 'success':
            return successTheme(theme)
        case 'info':
            return infoTheme(theme)
        case 'warning':
            return warningTheme(theme)
        default:
            return primaryTheme(theme)
    }
}

const dynamicTypographyHorizontalIndent = ({ iconReverse }) => {
    if (iconReverse) {
        return css`
            margin-left: ${baseX}px;
        `
    }
    return css`
        margin-right: ${baseX}px;
    `
}

export const TypographyStyled = styled(Typography)(({ size }) => css`
    display: inline;

    ${HEADERS.includes(size) && css`
        font-family: SBSansDisplay, Arial, Helvetica, sans-serif;
        letter-spacing: ${letterSpacingHeadline};

    `}
`)

export const IconStyled = styled(IconViewBox)(({ size, hasTitle, iconReverse }) => {
    const iconWidth = iconSizes[size]

    return css`
        box-sizing: content-box;
        vertical-align: top;
        flex: none;
        width: ${iconWidth};
        height: ${iconWidth};
        ${hasTitle && dynamicTypographyHorizontalIndent({ iconReverse })}
    `
})

export const IconLoaderStyled = IconStyled.withComponent(IconLoaderViewBox)

// text-decoration-color не поддерживается в IE, вернуть когда выпилим IE
export const LinkStyled = styled.a(({ theme, colorScheme, underlined, disabled, iconReverse }) => {
    const linkTheme = themeByColorScheme(theme, colorScheme)

    return css`
        display: ${iconReverse ? 'inline-block' : 'inline-flex'};
        align-items: flex-start;
        flex-direction: row-reverse;
        padding: 0px;
        cursor: pointer;
        outline: none;
        text-decoration: ${underlined ? 'underline' : 'none'};
        color: ${linkTheme.linkNormal};
        background-color: transparent;
        vertical-align: top;
        max-width: 100%;

        &:hover {
            color: ${linkTheme.linkHover};

            ${TypographyStyled} {
                color: ${linkTheme.linkHover};
            }

            ${IconStyled} svg {
                fill: ${linkTheme.linkHover};
            }

            ${IconLoaderStyled} svg {
                fill: ${linkTheme.linkHover};
            }
        }

        &:active {
            color: ${linkTheme.linkClick};

            ${TypographyStyled} {
                color: ${linkTheme.linkClick};
            }

            ${IconStyled} svg {
                fill: ${linkTheme.linkClick};
            }

            ${IconLoaderStyled} svg {
                fill: ${linkTheme.linkClick};
            }
        }

        body:not(.pointer-events) &:focus {
            border-radius: ${baseX}px;
            ${focusBorder(theme.focusColor)};
        }

        ${TypographyStyled} {
            color: ${linkTheme.linkNormal};
        }

        ${IconStyled} svg {
            fill: ${linkTheme.linkNormal};
        }

        ${IconLoaderStyled} svg {
            fill: ${linkTheme.linkNormal};
        }

        ${disabled && css`
            pointer-events: none;

            color: ${linkTheme.linkDisabled};

            ${TypographyStyled} {
                color: ${linkTheme.linkDisabled};
            }

            ${IconStyled} svg {
                fill: ${linkTheme.linkDisabled};
            }

            ${IconLoaderStyled} svg {
                fill: ${linkTheme.linkDisabled};
            }
        `}
    `
}, marginStyle
)

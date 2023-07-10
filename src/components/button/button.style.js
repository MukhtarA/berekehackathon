import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../typography'
import { IconLoaderViewBox, IconViewBox } from '../icon/icon-view'
import { ContainedLoader } from '../loader'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'
import { dynamicIndent } from '../styles/dynamic-styles'
import { xsBorderRadius, mdBorderRadius, smBorderRadius } from '../styles/radius.config.style'

const iconSizes = {
    sm: '24px',
    md: '28px',
    lg: '32px'
}

const getButtonBorderRadius = (size) => {
    switch (size) {
        case 'lg':
            return mdBorderRadius

        case 'sm':
            return xsBorderRadius

        case 'md':
        default:
            return smBorderRadius
    }
}


export const ButtonLoadingStyled = styled(ContainedLoader)`
    display: none;
`

const dynamicTypographyHorizontalIndent = ({ size = 'md', icon, iconReverse, iconIndent = 'micro' }) => {
    const margin = dynamicIndent(size, iconIndent)

    if (icon) {
        if (iconReverse) {
            return css`
                margin-left: ${margin};
            `
        }
        return css`
            margin-right: ${margin};
        `
    }
    return ''
}

export const ButtonTypographyStyled = styled(Typography)`
    display: inline-block;
`

export const IconStyled = styled(IconViewBox)(({ size = 'md' }) => {
    const iconWidth = iconSizes[size]
    return css`
        width: ${iconWidth};
        height: ${iconWidth};
    `
})

export const IconLoaderStyled = styled(IconLoaderViewBox)(({ size = 'md' }) => {
    const iconWidth = iconSizes[size]
    return css`
        width: ${iconWidth};
        height: ${iconWidth};
    `
})

const iconReverseStyle = ({ iconReverse }) => iconReverse && css`
    flex-direction: row-reverse;
`

export const ButtonContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    ${iconReverseStyle}
`

const fullWidthStyle = ({ fullWidth }) => fullWidth && css`
    width: 100%;
    text-align: center;
    display: block;
`

export const ButtonBaseStyled = styled.button(({ size, icon, iconReverse, iconIndent, isLoading }) => css`
    position: relative;
    cursor: pointer;
    border-radius: ${getButtonBorderRadius(size)};
    text-decoration: none;
    transition:
        border-color 0.17s,
        background-color 0.17s,
        color 0.17s,
        box-shadow 0.17s;
    outline: none;
    overflow: hidden;
    user-select: none;
    line-height: 1;
    -kit-tap-highlight-color: transparent;
    display: inline-block;

    ${ButtonTypographyStyled} {
        ${dynamicTypographyHorizontalIndent({ size, icon, iconReverse, iconIndent })};
    }

    ${isLoading && css`
        cursor: default;
        pointer-events: none;

        ${ButtonLoadingStyled} {
            display: block;
        }

        ${ButtonContainerStyled} {
            opacity: 0;
        }
   `}
`,
fullWidthStyle,
({ size, icon, iconIndent = 'micro', verticalPadding = 'inner', horizontalPadding = 'inner' }) =>
    paddingStyle({
        verticalPadding: icon ? iconIndent : verticalPadding,
        horizontalPadding,
        size
    }),
({ size, verticalMargin = 'inner', horizontalMargin = 'inner', fullWidth, verticalMarginDirection, horizontalMarginDirection }) =>
    marginStyle({
        verticalMargin,
        verticalMarginDirection,
        horizontalMargin: fullWidth ? 'zero' : horizontalMargin,
        horizontalMarginDirection,
        size
    }),
)

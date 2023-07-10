import { css } from '@emotion/react'
import { memoize } from 'lodash'

import {
    fontSizeLg,
    lineHeightLg,
    fontSizeMd,
    lineHeightMd,
    fontSizeSm,
    lineHeightSm,
    lineHeightHeadline1,
    lineHeightHeadline2,
    lineHeightHeadline3,
    lineHeightHeadline4,
    lineHeightHeadline5,
    fontSizeHeadline1,
    fontSizeHeadline2,
    fontSizeHeadline3,
    fontSizeHeadline4,
    fontSizeHeadline5,
    fontSizeBody1,
    lineHeightBody1,
    fontSizeBody2,
    lineHeightBody2
} from '../font-sizes.config.style'
import { baseX } from '../semantic.config.style'

export const sizes = {
    sm: {
        fontSize: fontSizeSm,
        lineHeight: lineHeightSm
    },
    md: {
        fontSize: fontSizeMd,
        lineHeight: lineHeightMd
    },
    lg: {
        fontSize: fontSizeLg,
        lineHeight: lineHeightLg
    },
    body1: {
        fontSize: fontSizeBody1,
        lineHeight: lineHeightBody1
    },
    body2: {
        fontSize: fontSizeBody2,
        lineHeight: lineHeightBody2
    },
    h1: {
        fontSize: fontSizeHeadline1,
        lineHeight: lineHeightHeadline1
    },
    h2: {
        fontSize: fontSizeHeadline2,
        lineHeight: lineHeightHeadline2
    },
    h3: {
        fontSize: fontSizeHeadline3,
        lineHeight: lineHeightHeadline3
    },
    h4: {
        fontSize: fontSizeHeadline4,
        lineHeight: lineHeightHeadline4
    },
    h5: {
        fontSize: fontSizeHeadline5,
        lineHeight: lineHeightHeadline5
    }
}

export const dynamicIndent = memoize((size = 'md', mode) => {
    const lineHeightSrt = (sizes[size] || sizes.md).lineHeight
    const lineHeight = Number.parseInt(lineHeightSrt, 10)

    switch (mode) {
        case 'open': {
            return `${lineHeight}px`
        }
        case 'inner': {
            return `${lineHeight - baseX}px`
        }
        case 'micro': {
            return `${lineHeight - (2 * baseX)}px`
        }
        case 'nano': {
            return `${lineHeight - (3 * baseX)}px`
        }
        case 'zero': {
            return '0px'
        }
        default: {
            return '0px'
        }
    }
}, (size = 'md', mode) => `${size}_${mode}`)

export const dynamicSize = memoize(({ size = 'md' }) => {
    const { fontSize, lineHeight } = sizes[size] || sizes.md
    return css`
       font-size: ${fontSize};
       line-height: ${lineHeight};
    `
}, ({ size = 'md' }) => size)

export const getColor = (theme, colorScheme, defaultColorScheme) => theme?.[colorScheme] || defaultColorScheme

export const dynamicColor = (defaultColorScheme) => ({ colorScheme, theme }) => css`
    color: ${getColor(theme, colorScheme, defaultColorScheme)}
`

export const dynamicBackgroundColor = (defaultColorScheme) => ({ colorScheme, theme }) => css`
    background-color: ${getColor(theme, colorScheme, defaultColorScheme)}
`

export const dynamicSvgColor = (defaultColorScheme) => ({ colorScheme, theme }) => css`
    fill: ${getColor(theme, colorScheme, defaultColorScheme)}
`

export const focusBorder = memoize(
    (color, borderWidth = '2px') => css`box-shadow: inset 0px 0px 0px ${borderWidth} ${color}`,
    (color, borderWidth) => `${color}_${borderWidth}`
)

export const dynamicHeight = memoize(({ size = 'md', verticalMargin = 'inner' }) => {
    const lineHeight = parseInt(sizes[size].lineHeight, 10)
    const indent = parseInt(dynamicIndent(size, verticalMargin), 10)

    return indent + lineHeight + indent
}, ({ size = 'md', verticalMargin = 'inner' }) => `${size}_${verticalMargin}`)

/**
 * [Zeplin](https://app.zeplin.io/project/5c74ef0d753f3ebccdf8f33d?seid=5ca73031b14aee19ff3f343a)
 * Заголовок приложения
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicIndent, dynamicColor } from '../styles/dynamic-styles'
import {
    fontSizeHeadline1,
    fontSizeHeadline2,
    fontSizeHeadline3,
    fontSizeHeadline4,
    fontSizeHeadline5,
    lineHeightHeadline1,
    lineHeightHeadline2,
    lineHeightHeadline3,
    lineHeightHeadline4,
    lineHeightHeadline5,
    letterSpacingHeadline
} from '../styles/font-sizes.config.style'

const openspaceConst = 'open'

const variantStyle = {
    h1: {
        fontSize: fontSizeHeadline1,
        lineHeight: lineHeightHeadline1,
        paddingBottom: '16px'
    },
    h2: {
        fontSize: fontSizeHeadline2,
        lineHeight: lineHeightHeadline2,
        paddingBottom: '12px'
    },
    h3: {
        fontSize: fontSizeHeadline3,
        lineHeight: lineHeightHeadline3,
        paddingBottom: '8px'
    },
    h4: {
        fontSize: fontSizeHeadline4,
        lineHeight: lineHeightHeadline4,
        paddingBottom: '4px'
    },
    h5: {
        fontSize: fontSizeHeadline5,
        lineHeight: lineHeightHeadline5,
        paddingBottom: 0
    }
}

const fontWeightStyle = {
    regular: 400,
    semibold: 600
}

export const modeStyles = ({ variant = 'h1', fontWeight = 'semibold', indent = 'open' }) => {
    const modeStyle = variantStyle[variant]

    return css`
        font-size: ${modeStyle.fontSize};
        line-height: ${modeStyle.lineHeight};
        letter-spacing: ${letterSpacingHeadline};
        font-weight: ${fontWeightStyle[fontWeight] || fontWeightStyle.semibold};
        font-family: SBSansDisplay, Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
        padding-top: ${dynamicIndent(variant, indent)};
        padding-bottom: ${indent === openspaceConst ? modeStyle.paddingBottom : dynamicIndent(variant, indent)};
    `
}

export const HeadlineStyled = styled.h1(modeStyles, ({ theme }) => dynamicColor(theme.primary))


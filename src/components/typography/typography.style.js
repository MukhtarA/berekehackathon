import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import {
    letterSpacing
} from '../styles/font-sizes.config.style'
import { dynamicSize, dynamicColor } from '../styles/dynamic-styles'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'

const fontWeightStyle = ({ fontWeight }) => {
    switch (fontWeight) {
        case 'semibold':
            return css`font-weight: 600;`
        case 'medium':
            return css`font-weight: 500;`
        default:
            return css`font-weight: 400;`
    }
}

export const typographyCommonStyled = () => css`
    letter-spacing: ${letterSpacing};
    text-align: left;
`

export const TypographyStyled = styled.p(
    typographyCommonStyled,
    fontWeightStyle,
    dynamicSize,
    ({ theme }) => dynamicColor(theme.primary),
    marginStyle,
    paddingStyle
)

import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicSvgColor } from '../styles/dynamic-styles'

const fullWidthCss = css`
    height: 100%;
    width: 100%;
`

export const WrapperStyled = styled.span(({ theme, colorScheme, fullWidth }) => css`
    display: inline-block;
    text-decoration: none;
    vertical-align: middle;
    ${fullWidth && fullWidthCss};

    svg {
        display: block;
        ${dynamicSvgColor(theme.primary)({ colorScheme, theme })};
        ${fullWidth && fullWidthCss};
    }
`)

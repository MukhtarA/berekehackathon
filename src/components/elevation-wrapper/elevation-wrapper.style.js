import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { variantStyles } from '../utils'
import { smShadow, mdShadow } from '../styles/shadows.config.style'
import { focusBorder } from '../styles/dynamic-styles'

export const ElevationWrapperZero = styled.div(({ theme, active }) => css`
    background: ${theme.elevationZeroBody};
    border: 1px solid ${theme.elevationZeroBorderNormal};
    outline: 0;
    
    &:hover {
        border-color: ${theme.elevationZeroBorderHover};
    }
      
    &:focus:active {
        border-color: ${theme.elevationZeroBorderClick};
    }
        
    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor)};
    }
        
    ${active && css`
        border-color: ${theme.elevationZeroBorderActiveNormal};
        box-shadow: ${smShadow(theme)};
        
        &:hover {
            border-color: ${theme.elevationZeroBorderActiveHover};
        }
      
        &:focus:active {
            border-color: ${theme.elevationZeroBorderActiveClick};
        }
        
        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.focusColor)};
        }
    `}
`,
variantStyles({
    mode: {
        regular: css`
                border-width: 1px;
            `,
        semibold: css`
                border-width: 2px;
            `
    }
}))

export const ElevationWrapperOne = styled.div(({ theme, active }) => css`
    border: 1px solid ${theme.elevationOneBorderNormal};
    background: ${theme.elevationOneBody};
    outline: 0;
    box-shadow: ${smShadow(theme)};
    
    &:hover {
        border-color: ${theme.elevationOneBorderHover};
        box-shadow: ${mdShadow(theme)};
    }
      
    &:focus:active {
        border-color: ${theme.elevationOneBorderClick};
        box-shadow: ${smShadow(theme)};
    }
    
    body:not(.pointer-events) &:focus {
        box-shadow: ${smShadow(theme)},
            inset 0 0 0 2px ${theme.focusColor};
    }
    
    ${active && css`
        border-color: ${theme.elevationOneBorderActiveNormal};
        box-shadow: ${mdShadow(theme)};
        
        &:hover {
            border-color: ${theme.elevationOneBorderActiveHover};
        }
      
        &:focus:active {
            border-color: ${theme.elevationOneBorderActiveClick};
        }
        
        body:not(.pointer-events) &:focus {
            box-shadow: ${smShadow(theme)},
                inset 0 0 0 2px ${theme.focusColor};
        }
    `}
`,
variantStyles({
    mode: {
        regular: css`
                border-width: 1px;
            `,
        semibold: css`
                border-width: 2px;
            `
    }
}))


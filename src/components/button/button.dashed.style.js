import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { marginStyle } from '../indent-wrapper'
import { Typography } from '../typography'
import { focusBorder } from '../styles/dynamic-styles'

export const WrapperStyled = styled.button(({ theme }) => css`
    max-width: 100%;
    padding: 0;
    cursor: pointer;
    outline: none;
    vertical-align: top;
    background: none;
    display: flex;
    align-items: flex-start;
    
    border-bottom: 1px dashed ${theme.buttonDashedNormal};
   
    ${Typography} {
        color: ${theme.buttonDashedNormal};
    }
    
    &:hover ${Typography} {
        color: ${theme.buttonDashedHover};
    }
    
    &:active ${Typography} {
        color: ${theme.buttonDashedClick};
    }
    
    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor)};
    }   
`, marginStyle)

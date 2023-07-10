import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { focusBorder } from '../styles/dynamic-styles'

import {
    ButtonBaseStyled,
    ButtonTypographyStyled
} from './button.style'

const borderWidth = '1px'
const focusWidth = '1px'

export const ButtonTertiaryStyled = styled(ButtonBaseStyled)(({ theme }) => css`
    border: solid ${borderWidth} ${theme.buttonStrokeBorderNormal};
    background-color: ${theme.buttonStrokeBody};

    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor, focusWidth)};

        border-color: ${theme.focusColor};
    }

    &:hover {
        border-color: ${theme.buttonStrokeBorderHover};
        outline: none;
    }

    &:active {
        outline: none;
        border-color: ${theme.buttonStrokeBorderClick};
    }

    ${ButtonTypographyStyled} {
        color: ${theme.buttonStrokeText};
    }
`)

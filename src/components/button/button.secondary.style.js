import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import {
    ButtonBaseStyled,
    ButtonTypographyStyled
} from './button.style'

const borderWidth = '2px'

export const ButtonSecondaryStyled = styled(ButtonBaseStyled)(({ theme }) => css`
    border: solid ${borderWidth} ${theme.buttonStrokeBorderNormal};
    background-color: ${theme.buttonStrokeBody};

    body:not(.pointer-events) &:focus {
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

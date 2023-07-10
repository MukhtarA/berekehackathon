import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { focusBorder } from '../styles/dynamic-styles'
import { IconWrapperStyled } from '../icon/icon-view.style'

import {
    ButtonBaseStyled,
    ButtonTypographyStyled,
    IconStyled,
    IconLoaderStyled
} from './button.style'

const focusWidth = '2px'

export const ButtonTransparentStyled = styled(ButtonBaseStyled)(({ theme }) => css`
    background-color: ${theme.buttonTransparentBodyNormal};

    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor, focusWidth)};
    }

    &:hover {
        background-color: ${theme.buttonTransparentBodyHover};
        outline: none;
    }

    &:active {
        outline: none;
        background-color: ${theme.buttonTransparentBodyClick};
    }

    ${ButtonTypographyStyled} {
        color: ${theme.buttonTransparentText};
    }

    ${IconStyled} svg,
    ${IconLoaderStyled} svg,
    ${IconWrapperStyled} svg {
        fill: ${theme.buttonTransparentText};
    }
`)

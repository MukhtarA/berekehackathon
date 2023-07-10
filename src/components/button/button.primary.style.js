import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { focusBorder, getColor } from '../styles/dynamic-styles'
import { LoaderPointStyled } from '../loader/loader.style'
import { IconWrapperStyled } from '../icon/icon-view.style'

import {
    ButtonBaseStyled,
    ButtonTypographyStyled,
    ButtonLoadingStyled,
    IconStyled,
    IconLoaderStyled,
    ButtonContainerStyled,
} from './button.style'

export const ButtonPrimaryStyled = styled(ButtonBaseStyled)(({ theme, colorScheme }) => {
    const buttonBodyColor = getColor(theme, colorScheme, theme.buttonSolidBodyNormal)

    return css`
        background-color: ${buttonBodyColor};
    
        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.focusColor)};
        }
    
        &:hover {
            ${ButtonContainerStyled}:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: ${theme.buttonSolidBodyHover};
                z-index: 1;
            }
        }
    
        &:active {
            ${ButtonContainerStyled}:after {
                background-color: ${theme.buttonSolidBodyClick};
            }

            outline: none;
        }
    
        ${ButtonLoadingStyled} {
            ${LoaderPointStyled} {
                background-color: ${theme.buttonSolidText};
            };
        }
    
        ${ButtonTypographyStyled} {
            color: ${theme.buttonSolidText};
            z-index: 2;
        }
    
        ${IconStyled} svg,
        ${IconLoaderStyled} svg,
        ${IconWrapperStyled} svg {
            z-index: 2;
            fill: ${theme.buttonSolidText};
        };
    
    `
})

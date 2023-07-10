import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { marginStyle } from '../../indent-wrapper/margin-wrapper.style'
import { paddingStyle } from '../../indent-wrapper/padding-wrapper.style'
import { Icon } from '../../icon'
import { xsBorderRadius } from '../../styles/radius.config.style'
import { AdditionalContentStyled } from '../text-field.style'

const counterIconWidth = '16px'
const counterIconHeight = '16px'

export const IconStyled = styled(Icon)``

export const CounterButtonStyled = styled.button(({ theme }) => css`
    outline: none;
    cursor: pointer;
    border-radius: ${xsBorderRadius};
    border: none;
    width: 36px;
    height: 36px;
    background-color: ${theme.buttonTransparentBodyNormal};
    padding: 0;

    transition: 
        background-color 0.17s ease-in-out,
 
        box-shadow 0.17s ease-in-out,
 
        border-color 0.17s ease-in-out;

    ${IconStyled} svg {
        fill: ${theme.buttonTransparentText};
        width: ${counterIconWidth};
        height: ${counterIconHeight};
    }

    &:hover {
        background-color: ${theme.buttonTransparentBodyHover};
    }

    &:active {
        background-color: ${theme.buttonTransparentBodyClick};
    }

    &:disabled {
        cursor: default;
        background-color: ${theme.buttonTransparentBodyDisabled};

        ${IconStyled} svg {
            fill: ${theme.buttonTransparentTextDisabled};
        }
    } 
`)

export const CounterStyled = styled(AdditionalContentStyled)(({ size }) => css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    ${paddingStyle({ size, horizontalPadding: 'inner' })};

    ${CounterButtonStyled} {
        ${marginStyle({ size, horizontalMargin: 'nano' })};

        &:last-child {
            margin-right: 0;
        }
    }
`)


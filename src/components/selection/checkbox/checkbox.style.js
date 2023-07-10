import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../../styles/radius.config.style'
import { xsShadow } from '../../styles/shadows.config.style'
import { Typography } from '../../typography/typography'
import { Icon } from '../../icon'
import { dynamicIndent } from '../../styles/dynamic-styles'
import { errorColors } from '../utils.style'
import { MarginWrapper } from '../../indent-wrapper/margin-wrapper.style'

import { checkboxSpringAnimation } from './checkbox-spring-animation.keyframe'
import { smCheckedSwitchAnimation } from './sm-checked-switch-animation.keyframe'
import { mdCheckedSwitchAnimation } from './md-checked-switch-animation.keyframe'
import { lgCheckedSwitchAnimation } from './lg-checked-switch-animation.keyframe'
import { smUncheckedSwitchAnimation } from './sm-unchecked-switch-animation.keyframe'
import { mdUncheckedSwitchAnimation } from './md-unchecked-switch-animation.keyframe'
import { lgUncheckedSwitchAnimation } from './lg-unchecked-switch-animation.keyframe'

const parametrs = {
    sm: {
        size: '16px',
        widthSwitch: '28px',
        circleSize: '12px',
        endPoint: '12px',
        borderRadius: '20px',
        checkedSwitchAnimation: smCheckedSwitchAnimation,
        uncheckedSwitchAnimation: smUncheckedSwitchAnimation
    },
    md: {
        size: '20px',
        widthSwitch: '36px',
        circleSize: '16px',
        endPoint: '16px',
        borderRadius: '20px',
        checkedSwitchAnimation: mdCheckedSwitchAnimation,
        uncheckedSwitchAnimation: mdUncheckedSwitchAnimation
    },
    lg: {
        size: '24px',
        widthSwitch: '44px',
        circleSize: '20px',
        endPoint: '20px',
        borderRadius: '24px',
        checkedSwitchAnimation: lgCheckedSwitchAnimation,
        uncheckedSwitchAnimation: lgUncheckedSwitchAnimation

    }
}

const checkboxColorsTransitionDuration = '0.05s'
const checkboxAnimationDuration = '1s'
const checkedSwitchAnimationDuration = '1s'
const uncheckedSwitchAnimationDuration = '1s'

export const CheckboxTypographyStyled = styled(Typography)(({ size }) => css`
    margin-left: ${dynamicIndent(size, 'nano')};
`)

export const IconStyled = styled(Icon)(({ size }) => css`
    display: none;
    position: absolute;
    width: ${parametrs[size].size};
    height: ${parametrs[size].size};
    top: 0;
    left: 0;
    transform-origin: top;
`)

export const SwitchStyled = styled.div(({ theme, size }) => css`
    position: relative;
    width: ${parametrs[size].widthSwitch};
    height: ${parametrs[size].size};
    flex-shrink: 0;
    border-radius: ${parametrs[size].borderRadius};
    transition: background-color 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        left: 2px;
        top: 2px;
        height: ${parametrs[size].circleSize};
        width: ${parametrs[size].circleSize};
        border-radius: 100%;
        box-shadow: ${xsShadow(theme)};
        animation: ${parametrs[size].uncheckedSwitchAnimation} ${uncheckedSwitchAnimationDuration} linear;
    }

    & ~ ${CheckboxTypographyStyled} {
        padding-left: 8px;
    }
`)

export const CheckboxStyled = styled.div(({ size, theme }) => css`
    position: relative;
    height: ${parametrs[size].size};

    &::before {
        content: '';
        display: block;
        width: ${parametrs[size].size};
        height: ${parametrs[size].size};
        background-color: ${theme.checkboxOffBody};
        border-radius: ${xsBorderRadius};
        box-sizing: border-box;
        transition: background-color ${checkboxColorsTransitionDuration} ease-out, border-color ${checkboxColorsTransitionDuration} ease-out;
    }

`)

const checkboxStyle = (checkboxColors) => css`
    & ~ ${CheckboxStyled}::before {
        border: 1px solid ${checkboxColors.checkboxOffNormal};
        background-color: ${checkboxColors.checkboxOffBody};
    }

    &:hover ~ ${CheckboxStyled}::before {
        border-color: ${checkboxColors.checkboxOffHover};
    }

    body:not(.pointer-events) &:focus {
        & ~ ${CheckboxStyled}::before {
            border: 0;
            box-shadow: 0 0 0 2px ${checkboxColors.focusColor};
        }
    }

    &:active ~ ${CheckboxStyled}::before {
        border-color: ${checkboxColors.checkboxOffClick};
    }

    &:disabled ~ ${CheckboxStyled}::before {
        border-color: ${checkboxColors.checkboxOffBodyDisabled};
        background-color: ${checkboxColors.checkboxOffBodyDisabled};
    }

    &:checked {
        & ~ ${CheckboxStyled}::before {
            border: 1px solid ${checkboxColors.checkboxOnNormal};
            background-color: ${checkboxColors.checkboxOnNormal};
        }

        & ~ ${CheckboxStyled} ${IconStyled} {
            display: block;
            animation: ${checkboxSpringAnimation} ${checkboxAnimationDuration} linear;
        }

        &:hover ~ ${CheckboxStyled}::before {
            border-color: ${checkboxColors.checkboxOnHover};
            background-color: ${checkboxColors.checkboxOnHover};
        }

        &:active ~ ${CheckboxStyled}::before {
            border-color: ${checkboxColors.checkboxOnNormal};
            background-color: ${checkboxColors.checkboxOnNormal};
        }

        &:disabled ~ ${CheckboxStyled}::before {
            border-color: ${checkboxColors.checkboxOnDisabled};
            background-color: ${checkboxColors.checkboxOnDisabled};
        }

        &:disabled ~ ${CheckboxStyled} {
            position: relative;
        }

        &:disabled ~ ${CheckboxStyled} ${IconStyled} svg {
            fill: ${checkboxColors.checkboxOnToggleDisabled};
        }
    }
`

const switchStyle = (checkboxColors, size) => css`
    & ~ ${SwitchStyled} {
        background-color: ${checkboxColors.checkboxOffNormal};
    }
    
    & ~ ${SwitchStyled}::before {
        background-color: ${checkboxColors.checkboxToggle};
    }

    &:hover ~ ${SwitchStyled} {
        background-color: ${checkboxColors.checkboxOffHover};
    }

    &:active ~ ${SwitchStyled} {
        background-color: ${checkboxColors.checkboxOffClick};
    }

    &:disabled ~ ${SwitchStyled} {
        background-color: ${checkboxColors.checkboxOffDisabled};
    }

    &:disabled ~ ${SwitchStyled}::before {
        background-color: ${checkboxColors.checkboxOffToggleDisabled};
    }

    body:not(.pointer-events) &:focus {
        & ~ ${SwitchStyled} {
            box-shadow: 0 0 0 2px ${checkboxColors.focusColor};
        }
    }

    &:checked {
        & ~ ${SwitchStyled} {
            background-color: ${checkboxColors.checkboxOnNormal};
        }

        & ~ ${SwitchStyled}::before {
            transform: translateX(${parametrs[size].endPoint});
            animation: ${parametrs[size].checkedSwitchAnimation} ${checkedSwitchAnimationDuration} linear;
        }

        &:hover ~ ${SwitchStyled} {
            background-color: ${checkboxColors.checkboxOnHover};
        }

        &:active ~ ${SwitchStyled} {
            background-color: ${checkboxColors.checkboxOnClick};
        }

        &:disabled ~ ${SwitchStyled} {
            background-color: ${checkboxColors.checkboxOnDisabled};
        }

        &:disabled ~ ${SwitchStyled}::before {
            background-color: ${checkboxColors.checkboxOnToggleDisabled};
        }
    }
`

const textStyle = (checkboxColors) => css`
    & ~ ${CheckboxTypographyStyled} {
        color: ${checkboxColors.checkboxOffTextNormal};
    }

    &:hover ~ ${CheckboxTypographyStyled} {
        color: ${checkboxColors.checkboxOffTextHover};
    }
    
    &:active ~ ${CheckboxTypographyStyled} {
        color: ${checkboxColors.checkboxOffTextClick};
    }

    &:checked ~ ${CheckboxTypographyStyled} {
        color: ${checkboxColors.checkboxOnText};
    }
    
    &:disabled ~ ${CheckboxTypographyStyled} {
        color: ${checkboxColors.checkboxTextDisabled};
    }
`

export const InputStyled = styled.input(({ size }) => css`
    position: absolute;
    opacity: 0;
    top: 0;
    left: ${dynamicIndent(size, 'inner')};
    cursor: pointer;

`, ({ error, theme, size, mode }) => {
    const checkboxColors = error ? errorColors(theme) : theme

    return css`    
        ${mode === 'checkbox' && checkboxStyle(checkboxColors)};
        
        ${mode === 'switch' && switchStyle(checkboxColors, size)};
       
        ${textStyle(checkboxColors)};  
    `
})


export const CheckboxWrapperStyled = styled.label(({ theme, disabled }) => css`
    display: flex;
    position: relative;
    cursor: pointer;
    user-select: none;

    body:not(.pointer-events) &:focus-within {
        border-color: ${theme.primary};
    }

    svg {
        margin: 0 auto;
    }

    ${disabled && css`
        cursor: default;
    `}
`)

export const CheckboxDescriptionStyled = styled(MarginWrapper)(({ theme, error }) => !error && css`
        color: ${theme.secondary};
`)

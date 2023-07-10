import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Icon } from '../../../icon'
import { Typography } from '../../../typography'
import { xsBorderRadius } from '../../../styles/radius.config.style'
import { focusBorder, dynamicIndent } from '../../../styles/dynamic-styles'

export const disabledButtonStyle = ({
    theme,
    active,
    isStartDate,
    isEndDate,
}) => css`
    &:disabled {
        cursor: default;
        opacity: 1;
        color: ${theme.calendarTextDisabled};

        &:hover::after,
        &::after {
            background-color: ${active || isStartDate || isEndDate
        ? theme.calendarButtonWarning : theme.transparent};
        }
    }
`

export const currentButtonStyle = ({
    theme,
    current,
    active,
    isStartDate,
    isEndDate,
}) => {
    if (!current) {
        return ''
    }

    return css`
        font-weight: 600;

        &::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 4px;
            border-radius: 2px;
            left: calc(50% - 4px);
            top: calc(50% + 10px);
            background-color: ${active || isStartDate || isEndDate
        ? theme.calendarButtonCurrentActive
        : theme.calendarButtonCurrent};
        }
    `
}

const activeButtonStyle = ({ theme, active, isStartDate, isEndDate }) => {
    if (active || isStartDate || isEndDate) {
        return css`
            z-index: 2;
            color: ${theme.calendarTextActive};

            &:hover::after,
            &::after {
                background-color: ${theme.calendarButtonActive};
            }
        `
    }

    return ''
}

export const TypographyStyled = styled(Typography)``
export const ArrowIconStyled = styled(Icon)(
    ({ opened, theme }) => css`
        transition: transform 0.3s ease-in-out;

        path {
            fill: ${theme.calendarTextNormal};
        }

        ${opened &&
        css`
            transform: rotate(180deg);
        `}
    `
)

export const ButtonStyled = styled.button(
    ({ theme }) => css`
        position: relative;
        display: block;
        padding: 0;
        border: none;

        font-family: SBSans, Arial, Helvetica, sans-serif;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: ${theme.calendarTextNormal};
        background-color: transparent;
        cursor: pointer;

        body:not(.pointer-events) &:focus {
            outline: none;
            border-radius: ${xsBorderRadius};
            ${focusBorder(theme.focusColor)};
        }

        &:focus,
        &:active {
            outline: none;
        }
    `
)

export const DateButtonStyled = styled(ButtonStyled)`
    z-index: 1;
    width: 100%;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.calendarButtonNormal};
        top: 0;
        left: 0;
        background-color: transparent;
        z-index: -1;
        transition: 0.1s ease-in;
    }

    &:hover {
        &::after {
            background-color: ${({ theme }) => theme.calendarButtonHover};
        }
    }

    &:active {
        &::after {
            background-color: ${({ theme }) => theme.calendarButtonClick};
        }
    }

    ${activeButtonStyle};
    ${currentButtonStyle};
    ${disabledButtonStyle};
`

export const DefaultButtonStyled = styled(ButtonStyled)(
    ({ size = 'md', theme }) => css`
        display: flex;
        align-items: center;
        padding-left: ${dynamicIndent(size, 'nano')};

        &:disabled {
            cursor: default;

            ${TypographyStyled} {
                color: ${theme.calendarTextDisabled};
            }

            ${ArrowIconStyled} {
                path {
                    fill: ${theme.calendarTextDisabled};
                }
            }
        }
    `
)

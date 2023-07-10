import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'
import { memoize } from 'lodash'

import { Typography } from '../typography'
import { xsBorderRadius } from '../styles/radius.config.style'
import { dynamicHeight, dynamicSize, dynamicIndent, focusBorder } from '../styles/dynamic-styles'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'
import { IconWrapper, IconViewBox } from '../icon/icon-view'
import { baseX } from '../styles/semantic.config.style'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'

const iconSizes = {
    sm: baseX * 8,
    md: baseX * 9,
    lg: baseX * 12,
}

const BORDER_WIDTH = 1
const dynamicHeightBorderCoefficient = 2

const getAdditionalTextSize = (size) => size === 'lg' ? '155px' : '132px'

export const textFieldFocusWidth = '1px'

export const textFieldBorderStyle = memoize((color) => css`
    border: solid 1px ${color};
`, (color) => color)

export const errorStyle = ({ error, theme, focused }) => error && css`
    ${textFieldBorderStyle(theme.fieldBorderWarningNormal)};

    &:hover {
        ${textFieldBorderStyle(theme.fieldBorderWarningHover)};
    }

    body:not(.pointer-events) &:focus {
        border-color: ${theme.focusColor};
        ${focusBorder(theme.focusColor, textFieldFocusWidth)};
    }

    ${focused && css`
        border-color: ${theme.focusColor};
        ${focusBorder(theme.focusColor, textFieldFocusWidth)};

        &:hover {
            border-color: ${theme.focusColor};
            ${focusBorder(theme.focusColor, textFieldFocusWidth)};
        }
    `}
`

export const readOnlyTextFieldStyle = ({ readonly, theme }) => readonly && css`
    /* Readonly safari */
    -webkit-text-fill-color: ${theme.fieldValue};
`

export const disabledTextFieldStyle = ({ disabled, theme }) => disabled && css`
    /* Readonly safari */
    -webkit-text-fill-color: ${theme.fieldValueDisabled};
`

export const TextFieldStyled = styled.input(({ theme }) => css`
    -webkit-tap-highlight-color: transparent;
    border-radius: ${xsBorderRadius};
    width: 100%;
    outline: none;
    display: block;
    font-weight: 500;
    color: ${theme.fieldValue};

    background-color: transparent;

    /* Отменяем поведение кастомных типов для Mozilla */
    appearance: textfield;
    appearance: none;

    &::placeholder {
        color: ${theme.fieldPlaceholder};
    }

    &::-ms-clear {
        display: none;
    }

    /* Отменяем поведение кастомных типов для Chrome */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button,
    &::-webkit-clear-button,
    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
        display: none;
    };

    /* Отменение стилей на автокомплит для Chrome */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-text-fill-color: inherit;
        box-shadow: 0 0 0 1000px transparent inset;
        transition: background-color 5000s ease-in-out 0s;
    }
`,
marginStyle,
dynamicSize,
disabledTextFieldStyle,
readOnlyTextFieldStyle
)

export const AdditionalContentStyled = styled.span(({ size, theme }) => css`
    padding-left: ${dynamicIndent(size, 'micro')};
    border-left: 1px solid ${theme.fieldBorderNormal};
`)

export const AdditionalTextWrapperStyled = styled.div(({ size }) => css`
    max-width: ${getAdditionalTextSize(size)};
    flex-shrink: 0;
`)

export const AdditionalTextStyled = styled(Typography)`
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const IconStyled = styled(IconViewBox)(({ size = 'md' }) => {
    const iconWidth = iconSizes[size]

    return css`
        width: ${iconWidth}px;
        height: ${iconWidth}px;
        overflow: initial;
    `
})

export const IconWrapperStyled = styled(IconWrapper)`
        overflow: initial;
`

export const WrapperButtonStyled = styled.button(
    ({ size = 'md' }) => css`
        padding: 0;
        margin-left: ${dynamicIndent(size, 'open')};
`,
    ({ bordered, size = 'md', theme }) => {
        const iconWidth = iconSizes[size]
        const indentSize = parseInt(dynamicIndent(size, 'micro'), 10)

        return bordered && css`
        cursor: pointer;
        background-color: ${theme.buttonTransparentBodyNormal};
        border-radius: ${xsBorderRadius};
        outline: none;
        width: ${iconWidth}px;
        height: ${iconWidth}px;
        position: relative;
        flex-shrink: 0;

        transition:
            background-color 0.17s ease-in-out,
            box-shadow 0.17s ease-in-out,
            border-color 0.17s ease-in-out;

        &::before {
            position: absolute;
            height: ${iconWidth}px;
            width: 1px;
            background-color: ${theme.fieldBorderNormal};
            content: '';
            right: ${baseX * indentSize}px;
        }

        &:hover {
            background-color: ${theme.buttonTransparentBodyHover};
        }

        &:active {
            background-color: ${theme.buttonTransparentBodyClick};
        }

        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.focusColor)};
        }
    `
    }
)

export const readOnlyStyle = ({ readonly, theme, focused }) => readonly && css`
    background-color: ${theme.fieldBody};
    border: 1px dashed ${theme.fieldBorderReadOnly};
    box-shadow: none;
    color: ${theme.fieldValue};
    pointer-events: none;

    ${focused && css`
        border-style: solid;
        border-color: ${theme.focusColor};
        ${focusBorder(theme.focusColor, textFieldFocusWidth)};

        &:hover {
            ${focusBorder(theme.focusColor, textFieldFocusWidth)};
        }
    `}
`

export const disabledStyle = ({ disabled, theme }) => disabled && css`
    background-color: ${theme.fieldBodyDisabled};
    border-style: solid;
    ${textFieldBorderStyle(theme.fieldBorderDisabled)};
    color: ${theme.fieldValueDisabled};
    pointer-events: none;

    ${IconStyled} svg {
        fill: ${theme.fieldValueDisabled};
    }
`

export const WrapperStyled = styled.span(({ focused, theme, size, verticalPadding, horizontalPadding }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${textFieldBorderStyle(theme.fieldBorderNormal)};
    background-color: ${theme.fieldBody};
    border-radius: ${xsBorderRadius};
    transition: 0.17s ease box-shadow;

    height: ${dynamicHeight({ size, verticalMargin: verticalPadding }) + (BORDER_WIDTH * dynamicHeightBorderCoefficient)}px;

    ${!focused && css`
        &:hover {
            ${textFieldBorderStyle(theme.fieldBorderHover)};
        }
    `};

    ${focused && css`
        transition: 0.17s ease;
        border-color: ${theme.focusColor};
        ${focusBorder(theme.focusColor, textFieldFocusWidth)};
    `}
`,
disabledStyle,
readOnlyStyle,
errorStyle,
({ size, horizontalPadding }) => paddingStyle({ size, horizontalPadding })
)

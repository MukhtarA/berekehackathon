import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../styles/radius.config.style'
import { Typography } from '../typography'
import { textFieldBorderStyle, textFieldFocusWidth } from '../text-field/text-field.style'
import { sizes, dynamicIndent, focusBorder } from '../styles/dynamic-styles'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'
import { IconViewBox } from '../icon/icon-view'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'
import { IconLoader } from '../icon/icon-loader'

import { ItemStyled } from './value-select.dropdown.style'

const ARROW_PADDING = '26px'
const BORDERS_WIDTH = '2px'
const CROSS_ICON_WIDTH = '10px'

const innerIndent = (size = 'md') => dynamicIndent(size, 'inner')
export const dynamicHeight = (size = 'md') => {
    const lineHeight = parseInt(sizes[size].lineHeight, 10)
    const indent = parseInt(dynamicIndent(size, 'inner'), 10)

    return `${indent + lineHeight + indent}px`
}

export const WrapperStyled = styled.div`
    position: relative;
`

export const IconLoaderStyled = styled(IconLoader)(({ theme, size, iconColorScheme }) => css`
    ${marginStyle({ size, horizontalMargin: 'nano' })};

    svg {
        fill: ${theme[iconColorScheme]};
    }
`)

export const ArrowStyled = styled.div`
    position: absolute;
    right: 9px;
    top: 50%;
    transform: translate(0, -50%);
    transition: transform 0.3s ease-in-out;

    ${({ open }) => open && css`
        transform: translate(0, -50%) rotate(180deg);
    `}
`

export const ItemNotChosenStyled = styled(Typography)(({ theme }) => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.fieldPlaceholder};
`)

export const ItemColumnStyled = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;

    & + & {
        margin-left: auto;
        flex-shrink: 0;
    }
`

export const ItemTitleStyled = styled(Typography)(({ theme, ellipsis }) => css`
    overflow: hidden;
    ${ellipsis && css`
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
    color: ${theme.fieldValue};
`)

export const ItemAsideStyled = styled(Typography)(({ theme, size }) => css`
    color: ${theme.fieldValue};
    text-align: right;
    margin-left: ${innerIndent(size)}
`)

export const ItemDescriptionStyled = styled(Typography)(({ theme }) => css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${theme.fieldDescription};
`)

export const ItemAsideDescriptionStyled = styled(Typography)(({ theme }) => css`
    color: ${theme.fieldDescription};
    text-align: right;
`)

export const GroupTitleStyled = styled(ItemTitleStyled)(({ theme }) => css`
    color: ${theme.fieldAdditional};
`)

export const MultiSelectedListStyled = styled.ul`
    margin: 0;
    margin-top: ${dynamicIndent('md', 'nano')};
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
`

export const MultiSelectedItemStyled = styled.li(({ theme, size, disabled }) => css`
    position: relative;
    max-width: 100%;
    white-space: pre-wrap;
    background-color: ${theme.tagBodyNormal};
    ${textFieldBorderStyle(theme.tagBorderNormal)};
    border-radius: ${xsBorderRadius};
    ${paddingStyle({ size, verticalPadding: 'nano', horizontalPadding: 'nano' })};
    ${marginStyle({ size, horizontalMargin: 'nano' })};
    ${!disabled && css`padding-right: calc(${dynamicIndent(size, 'nano')} * 2 + ${CROSS_ICON_WIDTH})`};
    margin-bottom: ${dynamicIndent('md', 'nano')};
`)

export const MultiSelectedTitleStyled = styled(Typography)(({ theme, disabled }) => css`
    color: ${theme.fieldValue};

    ${disabled && css`color: ${theme.tagTextDisabled}`};
`)

export const MultiSelectedButtonStyled = styled.div(({ theme, size }) => css`
        position: absolute;
        top: ${dynamicIndent(size, 'nano')};
        right: ${dynamicIndent(size, 'nano')};
        cursor: pointer;
        background-color: ${theme.transparent};
        border-radius: ${xsBorderRadius};
        outline: none;

        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.focusColor)};
        }
`)

export const MultiSelectedIconStyled = styled(IconViewBox)(({ theme }) => css`
    svg {
        fill: ${theme.tagIconNormal};
    }

    &:hover {
        svg {
            fill: ${theme.tagIconHover};
      }
    }

    &:active {
        svg {
            fill: ${theme.tagIconClick};
        }
    }
`)

export const TargetStyled = styled.button(({ theme, size }) => css`
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background-color: ${theme.fieldBody};
    border-radius: ${xsBorderRadius};
    ${textFieldBorderStyle(theme.fieldBorderNormal)};
    width: 100%;
    text-align: left;
    display: flex;
    position: relative;
    ${paddingStyle({
        size,
        horizontalPadding: 'micro',
        verticalPadding: 'nano'
    })};
    padding-right: calc(${ARROW_PADDING} + ${innerIndent(size)});
    transition: 0.17s ease box-shadow;
    align-items: center;
    cursor: pointer;

    min-height: calc(${dynamicHeight(size)} + ${BORDERS_WIDTH});

    /* min-height breaks align-items: center and align-self: center in IE11. Fixed here.  */
    &::after {
        content: '';
        min-height: calc(${dynamicHeight(size)} - 2*${dynamicIndent(size, 'nano')});
        font-size: 0;
    }

    &:hover {
        ${textFieldBorderStyle(theme.fieldBorderHover)};
    }

    &:active {
        ${textFieldBorderStyle(theme.fieldBorderClick)};
    }

    body:not(.pointer-events) &:focus {
        transition: 0.17s ease;
        border-color: ${theme.focusColor};
        ${focusBorder(theme.focusColor, textFieldFocusWidth)}
    }
`,
({ open, theme }) => open && css`
    ${textFieldBorderStyle(theme.fieldBorderClick)};

    &:hover, &:active {
        ${textFieldBorderStyle(theme.fieldBorderClick)};
    }
`,
({ disabled, theme, size }) => disabled && css`
    padding-right: ${innerIndent(size)};
    background-color: ${theme.fieldBodyDisabled};
    ${textFieldBorderStyle(theme.fieldBorderDisabled)};
    color: ${theme.fieldValueDisabled};
    cursor: default;

    &:hover, &:active {
        background-color: ${theme.fieldBodyDisabled};
        ${textFieldBorderStyle(theme.fieldBorderDisabled)};
    }

    ${ItemStyled} {
        cursor: default;
    }

    ${ItemTitleStyled}, ${ItemAsideStyled}, ${ItemDescriptionStyled}{
        color: ${theme.fieldValueDisabled};
    }

    ${ArrowStyled} {
        display: none;
    }

    ${MultiSelectedIconStyled} {
        display: none;
    }
`,
({ readonly, theme }) => readonly && css`
    box-shadow: none;
    border: 1px dashed ${theme.fieldBorderReadOnly};
    background-color: ${theme.fieldBody};

    &:hover,
    &:active {
        border: 1px dashed ${theme.fieldBorderReadOnly};
        background-color: ${theme.fieldBody};
    }

    ${ItemStyled} {
        cursor: default;
    }

    ${ItemTitleStyled}, ${ItemAsideStyled} {
        color: ${theme.fieldValue};
    }

    ${ArrowStyled} {
        display: none;
    }
`,
({ error, theme }) => error && css`
    ${textFieldBorderStyle(theme.fieldBorderWarningNormal)};

    &:hover {
        ${textFieldBorderStyle(theme.fieldBorderWarningHover)};
    }

    &:active {
        ${textFieldBorderStyle(theme.fieldBorderWarningClick)};
    }
`)

import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../../typography'
import { dynamicIndent, focusBorder } from '../../styles/dynamic-styles'
import { Icon } from '../../icon'
import { xsBorderRadius } from '../../styles/radius.config.style'
import { zIndexDropdown } from '../../styles/z-index.config.style'
import { paddingStyle } from '../../indent-wrapper/padding-wrapper.style'
import { mdShadow } from '../../styles/shadows.config.style'
import { AdditionalContentStyled } from '../text-field.style'
import { baseX } from '../../styles/semantic.config.style'

const smIndentDropdownButton = 0.5
const mdIndentDropdownButton = 1.5
const lgIndentDropdownButton = 3

export const TypographyStyled = styled(Typography)(({ disabled, theme }) => disabled && css`
    border-style: solid;
    border-color: ${theme.fieldBorderDisabled};
    color: ${theme.fieldValueDisabled};
    pointer-events: none;
`)

export const FieldsetStyled = styled(AdditionalContentStyled)(({ size = 'md' }) => css`
    cursor: pointer;
    padding: 0;
    padding-left: ${dynamicIndent(size, 'micro')};
    margin-left: ${dynamicIndent(size, 'inner')};
`).withComponent('fieldset')

export const IconStyled = styled(Icon)`
    transition: transform 0.3s ease-in-out;
    ${({ opened }) => opened && css`transform: rotate(180deg);`};
`

const dynamicIndentDirectionDropdownButton = (size) => {
    switch (size) {
        case 'sm':
            return baseX * smIndentDropdownButton

        case 'md':
            return baseX * mdIndentDropdownButton

        case 'lg':
            return baseX * lgIndentDropdownButton

        default:
    }
    return baseX * mdIndentDropdownButton
}

export const DropdownButtonStyled = styled.button(({ theme, opened, disabled, size = 'md' }) => css`
    background-color: ${theme.buttonTransparentBodyNormal};
    display: flex;
    align-items: center;
    cursor: pointer;
    outline: none;
    padding: ${dynamicIndentDirectionDropdownButton(size)}px;
    border-radius: ${xsBorderRadius};
    transition:
        background-color 0.17s ease-in-out,
        box-shadow 0.17s ease-in-out,
        border-color 0.17s ease-in-out;

    ${Typography} {
        margin-left: ${dynamicIndent(size, 'nano')};
    }

    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor)};
    }

    &:hover {
        background-color: ${theme.buttonTransparentBodyHover};
    }

    &:active {
        background-color: ${theme.buttonTransparentBodyClick};
    }

    ${opened && css`
            background-color: ${theme.buttonTransparentBodyClick};
  `}

    ${disabled && css`
            pointer-events: none;
            cursor: default;

            ${IconStyled} svg {
                fill: ${theme.buttonTransparentTextDisabled};
            }
  `}
`)

export const DropdownContentStyled = styled.ul(({ theme, size }) => css`
        position: absolute;
        display: none;
        list-style: none;
        min-width: 82px;
        top: calc(100% + ${dynamicIndent(size, 'nano')});
        right: 0;
        padding: 0;
        margin: 0;
        border-radius: ${xsBorderRadius};
        background-color: ${theme.dropdownBody};
        border: 1px solid ${theme.dropdownBorder};
        transition: all 0.3s ease-in-out;
        box-shadow: ${mdShadow(theme)};
        z-index: ${zIndexDropdown};

`, ({ opened }) => opened && css`display: block;`)

export const ContentItemStyled = styled.label(({ theme, selected }) => css`
    display: block;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.17s;
    background-color: ${selected ? theme.dropdownItemSelectedNormal : theme.dropdownItemNormal};

    &:first-child {
        border-top-left-radius: ${baseX - 1}px;
        border-top-right-radius: ${baseX - 1}px;
    }

    &:last-child {
        border-bottom-left-radius: ${baseX - 1}px;
        border-bottom-right-radius: ${baseX - 1}px;
    }

    &:hover {
        background-color: ${theme.dropdownItemHover};
    }

    &:active {
        background-color: ${theme.dropdownItemClick};
    }
`,
({ size }) => paddingStyle({ size, verticalPadding: 'inner', horizontalPadding: 'inner' }))

export const InputStyled = styled.input`
    display: none;
`

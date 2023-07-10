import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../styles/radius.config.style'
import { Typography } from '../typography'
import { marginStyle } from '../indent-wrapper/margin-wrapper.style'
import { focusBorder } from '../styles/dynamic-styles'

const suggestBorderStyle = (color) => `box-shadow: inset 0 0 0 1px ${color}`

export const SuggestsListStyled = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
`

export const SuggestWrapperStyled = styled.li`
    flex-shrink: 0;
`

export const SuggestButtonStyled = styled.button(
    ({ theme, disabled }) => css`
        padding: 0;
        ${marginStyle({ size: 'md', horizontalMargin: 'nano' })};
        background-color: ${theme.tagBodyNormal};
        ${suggestBorderStyle(theme.tagBorderNormal)};
        border-radius: ${xsBorderRadius};
        color: ${theme.tagText};
        outline: none;
        cursor: pointer;
        transition: 0.17s ease box-shadow;

        &:hover {
            background-color: ${theme.tagBodyHover};
            ${suggestBorderStyle(theme.tagBorderHover)};
        }

        &:active {
            background-color: ${theme.tagBodyClick};
            ${suggestBorderStyle(theme.tagBorderClick)};
        }

        body:not(.pointer-events) &:focus {
            transition: 0.17s ease box-shadow;
            ${focusBorder(theme.focusColor)}
        }

        ${disabled && css`
            cursor: default;

            &:hover {
                background-color: ${theme.tagBodyNormal};
                ${suggestBorderStyle(theme.tagBorderNormal)};
            }

            &:active {
                background-color: ${theme.tagBodyNormal};
                ${suggestBorderStyle(theme.tagBorderNormal)};
            }
        `}
    `)

export const TypographyStyled = styled(Typography)(
    ({ theme }) => css`
        color: ${theme.tagText};
    `
)

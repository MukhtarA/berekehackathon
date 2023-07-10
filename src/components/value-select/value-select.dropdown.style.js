import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { zIndexDropdown } from '../styles/z-index.config.style'
import { mdShadow } from '../styles/shadows.config.style'
import { xsBorderRadius } from '../styles/radius.config.style'
import { paddingStyle } from '../indent-wrapper'
import { focusBorder } from '../styles/dynamic-styles'

export const ITEMS_IN_LIST = 5

export const ItemStyled = styled.div(({ theme, size, focused, checked, isOption }) => css`
    display: flex;
    align-items: center;
    margin: 0;
    ${paddingStyle({
        size,
        horizontalPadding: 'micro',
        verticalPadding: 'nano'
    })};
    width: 100%;
    outline: none;
    color: ${theme.dropdownText};
    background-color: ${theme.dropdownBody};
    transition: 0.17s ease-in-out background-color;
    cursor: ${isOption ? 'pointer' : 'default'};

    &:not(:first-of-type) {
        border-top: ${isOption ? `1px solid ${theme.dropdownBorder}` : 'none'};
    }

    /* min-height breaks align-items: center and align-self: center in IE11. Fixed here.  */
    &::after {
        content: '';
        min-height: inherit;
        font-size: 0;
    }

    &:hover {
        background-color: ${isOption ? theme.dropdownItemHover : theme.dropdownItemNormal};
    }
    
    &:active {
        background-color: ${isOption ? theme.dropdownItemClick : theme.dropdownItemNormal};
    }

    ${focused && css`
        body:not(.pointer-events) & {
            ${focusBorder(theme.focusColor)};
        }
    `};

    ${checked && css`
        background-color: ${theme.dropdownItemSelectedNormal};
        
        &:hover {
            background-color: ${theme.dropdownItemSelectedHover};
        }
        
        &:active {
            background-color: ${theme.dropdownItemSelectedClick};
        }
    `}
`)


export const ContentsStyled = styled.div(({ theme }) => css`
    position: absolute;
    z-index: ${zIndexDropdown};
    width: 100%;
    box-shadow: ${mdShadow(theme)};
    border-radius: ${xsBorderRadius};
    margin-top: 8px;

    ::-webkit-scrollbar {
        appearance: none;
        width: 4px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: ${xsBorderRadius};
        width: 4px;
    }
`)

export const ContentsViewStyled = styled.div(({ theme }) => css`
    outline: none;
    overflow-y: auto;
    background-color: ${theme.dropdownBody};
    border-radius: ${xsBorderRadius};
    box-shadow: inset 0 0 0 1px ${theme.dropdownBorder};
`)

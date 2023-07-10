import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../styles/radius.config.style'
import { zIndexDropdown } from '../styles/z-index.config.style'
import { IconViewBox } from '../icon/icon-view'
import { Typography } from '../typography'
import { dynamicIndent, dynamicSize, dynamicHeight, focusBorder } from '../styles/dynamic-styles'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'
import { IconLoader } from '../icon'
import { mdShadow } from '../styles/shadows.config.style'
import { baseX } from '../styles/semantic.config.style'
import { sbolEase } from '../styles/animation-timing-functions'

import { fadeIn, smoothScaleOut } from './menu.keyframes'

const GAP = 8

const listWidthMap = {
    md: '192px',
    lg: '224px'
}

const Position = {
    NORMAL: 'normal',
    OVERLAY: 'overlay'
}

const dynamicPosition = ({ position }) => {
    if (position === Position.NORMAL) {
        return css`
            margin-top: ${baseX + baseX}px;
        `
    }

    return css`
        margin: 0;
        top: 0;
    `
}

export const TypographyStyled = styled(Typography)`
    box-sizing: content-box;
`

export const IconViewBoxStyled = styled(IconViewBox)`
    border-radius: ${xsBorderRadius};
`

export const IconStyled = styled(IconLoader)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: ${({ height }) => `calc(50% - ${height / 2}px)`};
    left: 0;
`

const dynamicOptionIndent = (size) => {
    const indent = dynamicIndent(size, 'inner')

    return css`
        /* Вертикальные паддинги фикс для всех размеров  */
        ${paddingStyle({ size, verticalPadding: 'inner', horizontalPadding: 'inner' })};

        ${IconStyled} {
            left: ${indent};

            + ${TypographyStyled} {
                /* 32px обертка иконки + 8px отступ от нее */
                padding-left: 40px;
            }
        }
    `
}

export const BlockStyled = styled.ul`
    position: relative;
    padding: 0;

    animation: ${fadeIn} 0.3s 0.15s ${sbolEase} backwards;
`

export const OptionStyled = styled.li`
    position: relative;
    list-style: none;
    margin: 0;
    cursor: pointer;
    overflow: hidden;

    button {
        position: relative;
        display: block;
        width: 100%;
        border: none;
        box-sizing: border-box;
        background-color: transparent;
        text-align: left;
        text-decoration: none;
        cursor: pointer;
        
        ${({ theme }) => css`
            &:hover {
                background-color: ${theme.dropdownItemHover};
            }
        
            &:active {
                background-color: ${theme.dropdownItemClick};
            }
            
            body:not(.pointer-events) &:focus {
                ${focusBorder(theme.focusColor)};
            }
        `}
    }

    animation: ${fadeIn} 0.3s 0.15s ${sbolEase} both;
`

export const ListStyled = styled.ul(({ theme, size }) => css`
    display: none;
    position: absolute;
    right: 0;
    width: ${listWidthMap[size]};
    list-style: none;
    z-index: ${zIndexDropdown};

    li:not(:last-of-type) {
        ${BlockStyled} {
            border-bottom: 1px solid ${theme.dropdownBorder};
        }
    }

    ${OptionStyled} {
        button {
            ${dynamicOptionIndent(size)};
        }
    }

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        border: 1px solid ${theme.dropdownBorder};
        border-radius: ${xsBorderRadius};
        box-shadow: ${mdShadow(theme)};
        background-color: ${theme.dropdownBody};
    }
`,
({ size }) => paddingStyle({ size, verticalPadding: 'nano' })
)

export const ButtonStyled = styled.button(({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;
    background-color: ${theme.buttonTransparentBodyNormal};
    outline: none;
    border-radius: ${xsBorderRadius};
    cursor: pointer;
    transition: background-color 0.15s linear;

    &:hover {
        background-color: ${theme.buttonTransparentBodyHover};
    }

    &:active {
        background-color: ${theme.buttonTransparentBodyClick};
    }
    
    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor)};
    }
`,
({ size }) => css`

    ${IconViewBoxStyled} {
        width: ${dynamicHeight({ size })}px;
        height: ${dynamicHeight({ size })}px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ${TypographyStyled} {
        ${paddingStyle({ size, horizontalPadding: 'inner', verticalPadding: 'inner' })};

        padding-right: 0;
    }
`)

const expandedStyle = ({ expanded, theme }) => expanded && css`
    ${ButtonStyled} {
        background-color: ${theme.buttonTransparentBodyClick};

        &:hover {
            background-color: ${theme.buttonTransparentBodyClick};
        }
    }

    ${ListStyled} {
        display: block;

        &::before {
            transform-origin: top;
            animation: ${smoothScaleOut} 0.3s ${sbolEase} both;
        }
    }
`

export const MenuStyled = styled.div`
    position: relative;

    ${TypographyStyled} {
        ${dynamicSize};
    }

    ${ListStyled} {
        ${dynamicPosition};
    }

    &:hover {
        ${ButtonStyled} {
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: ${GAP}px;
                left: 0;
                bottom: -${GAP}px;
            }
        }
    }

    ${expandedStyle};
`

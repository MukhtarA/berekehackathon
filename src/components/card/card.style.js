import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../typography'
import { dynamicIndent, focusBorder, dynamicBackgroundColor } from '../styles/dynamic-styles'
import { xsBorderRadius, smBorderRadius } from '../styles/radius.config.style'
import { baseX } from '../styles/semantic.config.style'
import { Icon } from '../icon'
import { ButtonStyled as MenuButtonStyled } from '../menu/menu.style'
import { variantStyles } from '../utils/apply-styles'
import { ElevationWrapperOne } from '../elevation-wrapper'
import { sbolEase } from '../styles/animation-timing-functions'

const STORIES_IMAGE_SIZE = '28px'

export const cardDimension = {
    md: {
        width: 160,
        height: 156
    },
    lg: {
        width: 192,
        height: 184
    }
}

const getCardWidth = (size) => size === 'lg' ? cardDimension.lg.width : cardDimension.md.width
const getCardHeight = (size) => size === 'lg' ? cardDimension.lg.height : cardDimension.md.height

const getTitleSize = (size, description) => {
    if (size === 'lg') {
        return description ? baseX * 12 : baseX * 19
    }

    return description ? baseX * 10 : baseX * 15
}

const labelSize = '48px'
const textMaskWidth = '20px'
const menuButtonSize = '24px'
const closeButtonSize = '24px'
const additionalButtonActionAreaSize = '40px'

const additionalButtonActionAreaStyle = css`
    &::before {
        content: '';
        position: absolute;
        width: ${additionalButtonActionAreaSize};
        height: ${additionalButtonActionAreaSize};
        border-radius: ${xsBorderRadius};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.17s box-shadow;
    }
`

const additionalButtonStyle = ({ theme }) => css`
    cursor: pointer;
    width: ${closeButtonSize};
    height: ${closeButtonSize};
    position: relative;
    outline: none;
    border-radius: 50%;
    background: ${theme.cardButtonBodyNormal};

    & > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    ${additionalButtonActionAreaStyle};

    &:hover {
        background: ${theme.cardButtonBodyHover};
    }

    &:focus:active {
        background: ${theme.cardButtonBodyClick};
    }

    body:not(.pointer-events) &:focus {
        &::before {
            ${focusBorder(theme.focusColor)};
        }
    }
`

export const LabelIconStyled = styled(Icon)(({ theme }) => variantStyles({
    iconColorScheme: {
        light: css`
            & svg {
                fill: ${theme.cardIconSolid};
            }
        `,
        dark: css`
            & svg {
                fill: ${theme.cardIconTransparent};
            }
        `
    }
})
)

export const CardHeadingStyled = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`

export const CardBodyStyled = styled.div(({ theme }) => css`
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        width: ${textMaskWidth};
        height: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        background: linear-gradient(to left, ${theme.elevationOneBody} 25%, ${theme.transparent} 100%);
    }
`)

export const CardTitleStyled = styled(Typography)(({ size, description, theme }) => css`
    overflow: hidden;
    white-space: pre-line;
    max-height: ${getTitleSize(size, description)}px;
    padding-right: ${textMaskWidth};
    color: ${theme.cardLabel};
`)

export const CardDescriptionStyled = styled(Typography)(({ size, theme }) => css`
    padding-top: ${dynamicIndent(size, 'nano')};
    overflow: hidden;
    white-space: nowrap;
    white-space: nowrap;
    color: ${theme.cardDescription};
`)

export const ExternalLinkIconWrapperStyled = styled(Icon)`
    & svg {
        transition: 0.3s fill;
    }
`

export const MenuWrapperStyled = styled('div')(({ theme, isClosed }) => css`
    ${MenuButtonStyled} {
        ${additionalButtonActionAreaStyle};

        border-radius: 50%;

        & span {
            width: ${menuButtonSize};
            height: ${menuButtonSize};
        }

        ${isClosed && css`
            & svg {
                fill: ${theme.cardButtonIconNormal};
            }
        `}

        &:hover svg {
            fill: ${theme.cardButtonIconHover};
        }

        body:not(.pointer-events) &:focus {
            box-shadow: none;

            &::before {
                ${focusBorder(theme.focusColor)};
            }
        }
    }
`)

export const CardBaseStyled = styled(ElevationWrapperOne)(({ theme, size, viewed }) => css`
    cursor: pointer;
    width: ${getCardWidth(size)}px;
    height: ${getCardHeight(size)}px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
    padding: ${dynamicIndent(size, 'inner')};
    text-decoration: none;
    transition-property: transform, box-shadow, border-color;
    transition-duration: 0.15s;
    transition-timing-function: ${sbolEase};
    border-radius: ${smBorderRadius};
    user-select: none;
    
    ${ExternalLinkIconWrapperStyled} svg {
        fill: ${theme.cardButtonIconNormal};
    }
            
    &:hover {
        transition-duration: 0.2s;
        transform: translateY(-${baseX}px);
        
        ${ExternalLinkIconWrapperStyled} svg {
            fill: ${theme.cardButtonIconHover};
        }
    }

    &:focus:active {
        transition-duration: 0.25s;
        transform: translateY(0);
    }

    body:not(.pointer-events) &:focus {
        transform: translateY(-${baseX}px);
        
        ${ExternalLinkIconWrapperStyled} svg {
            fill: ${theme.focusColor};
        }
    }

    ${viewed && css`
        opacity: 0.6;
    `}
`).withComponent('a')

export const LabelStyled = styled.div(({ theme, colorScheme, story }) => css`
    width: ${labelSize};
    height: ${labelSize};
    display: flex;
    overflow: hidden;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    
    & img {
        width: ${story ? STORIES_IMAGE_SIZE : '100%'};
        height: ${story ? STORIES_IMAGE_SIZE : '100%'};
        object-fit: contain;
    }

    ${dynamicBackgroundColor(theme.cardIconTransparentBody)({ theme, colorScheme })};
`)

export const PlusButtonStyled = styled('button')(additionalButtonStyle)

export const CloseButtonStyled = styled('button')(({ theme }) => css`
    &:hover svg {
        fill: ${theme.cardButtonIconHover};
    }

    &:focus:active svg {
        fill: ${theme.cardButtonIconHover};
    }
`,
additionalButtonStyle)

export const StoryIconWrapperStyled = styled.div(({ theme }) => css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 30px;
    left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${theme.elevationOneBody};
`)

export const StoryIconStyled = styled(Icon)(({ theme }) => css`
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${theme.cardAdditionalButtonBody};
    
    & > svg {
        position: absolute;
        top: 50%;
        left: calc(50% + 1px);
        transform: translate(-50%, -50%);
        fill: ${theme.cardAdditionalButtonIcon};
    }
`)

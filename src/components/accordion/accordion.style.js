import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Container } from '../indent-wrapper/container'
import { baseX } from '../styles/semantic.config.style'
import { dynamicIndent, focusBorder } from '../styles/dynamic-styles'
import { Typography } from '../typography'
import { HeadlineStyled } from '../typography/headline.style'
import { IconViewBoxStyled } from '../icon/icon-view.style'
import { PaddingWrapper } from '../indent-wrapper/padding-wrapper.style'

const transitionDuration = '0.17s'

const iconWidth = '20px'
const circleWidth = '36px'

const titleIconWidth = '36px'
const titleIconHeight = '36px'

export const AccordionHeadingStyled = styled(Container)``

// Deprecated
export const AccordionDeprecatedStyled = styled.div(({ theme, icon, statusIcon }) => css`
    display: flex;
    align-items: center;
    color: ${theme.accordionTextNormal};
    padding-right: calc(${dynamicIndent('h3', 'inner')} + ${iconWidth}
    + ${statusIcon ? circleWidth : '0px'});

    & svg {
        width: ${titleIconWidth};
        height: ${titleIconHeight};
    }

    & > :last-child {
        ${icon && css`padding-left: ${dynamicIndent('md', 'inner')};`};

        border: 0;
        background: transparent;
        text-align: left;
        border-radius: 0;
    }
`)

export const AccordionHeaderTextStyled = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row;
`


export const AccordionIconStyled = styled.div`
    & svg {
        width: ${titleIconWidth};
        height: ${titleIconHeight};
    }
`

export const AccordionTitleStyled = styled(HeadlineStyled)(({ theme, icon, statusIcon, size }) => css`
    color: ${theme.accordionTextNormal};
    border: 0;
    background: transparent;
    text-align: left;
    ${icon && css`margin-left: ${dynamicIndent(size, 'nano')};`};
    padding-right: calc(${dynamicIndent(size, 'inner')} + ${iconWidth} + ${statusIcon ? circleWidth : '0px'});
`)


export const AccordionDescriptionStyled = styled(Typography)(({ icon }) => icon && css`
    padding-left: calc(${titleIconWidth} + ${dynamicIndent('md', 'inner')});
`)

export const ChevronIconStyled = styled(IconViewBoxStyled)(({ isOpened, theme }) => css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition:
        transform
        ${transitionDuration}
        ease-in-out;

    ${isOpened && css`transform: translateY(-50%) rotate(180deg);`}
    
    svg {
        fill: ${theme.accordionTextNormal};
    }
`)

export const HeadingStyled = styled(PaddingWrapper)(({ theme }) => css`
    /* Safari background */
    appearance: none;
    position: relative;
    outline: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    background-color: transparent;

    ${AccordionHeadingStyled} {
        color: ${theme.accordionDescription};
        border: 0;
        background: transparent;
    }

    ${AccordionDescriptionStyled} > p {
        color: ${theme.accordionDescription};
    }

    &:hover {
        ${ChevronIconStyled} svg {
            fill: ${theme.accordionTextHover};
        }

        ${AccordionTitleStyled} {
            color: ${theme.accordionTextHover};
        }
    }
        
    &:active {
        ${ChevronIconStyled} svg {
            fill: ${theme.accordionTextClick};
        }

        ${AccordionTitleStyled} {
            color: ${theme.accordionTextClick};
        }
    }
    
    body:not(.pointer-events) &:focus {
        ${focusBorder(theme.focusColor)};
    }
    
`).withComponent('button')

export const StatusIconStyled = styled(IconViewBoxStyled)`
    position: absolute;
    top: 50%;
    right: ${5 * baseX}px;
    transform: translateY(-50%);
`

export const CollapseWrapperStyled = styled.div(({ theme, isOpened }) => css`
    color: ${theme.accordionDescription};
    ${!isOpened && css`visibility: hidden;`}
`)

export const AccordionWrapperStyled = styled.div(({ theme, size }) => css`
    background-color: ${theme.accordionBody};

    .ReactCollapse--content {
        padding-bottom: ${dynamicIndent(size, 'inner')};
    }

    .ReactCollapse--collapse {
        transition:
            height
            ${transitionDuration}
            ease-in-out;
    }
`)

export const AccordionItemStyled = styled.div(({ isOpened, theme }) => css`
    display: block;
    border: 1px solid transparent;
    border-bottom: 1px solid ${theme.accordionBorder};

    &:last-child {
        border-bottom-color: transparent;
    }

    ${isOpened && css`border-bottom-width: ${baseX * 3}px;`}
`)

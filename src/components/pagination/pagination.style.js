import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { IconViewBox } from '../icon/icon-view'
import { Container, MarginWrapper } from '../indent-wrapper'
import { ButtonTertiary } from '../button'

const sizes = {
    sm: '42',
    md: '52',
}

export const PaginationStyle = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
`

export const PaginatorStyle = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`

export const PagesStyle = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
`

export const IconStyled = styled(IconViewBox)`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

export const EllipsisStyled = styled(IconStyled)``
export const DoubleStyled = styled(IconStyled)(({ theme }) => css`
    opacity: 0;

    &:active {
        & > svg {
            fill: ${theme.linkSuccessClick};
        }
    }
`)

export const FastForwardStyled = styled(MarginWrapper)(({ size = 'md' }) => {
    const iconWidth = sizes[size] || sizes.md
    return css`
        min-width: ${iconWidth}px;
        height: 100%;
        position: relative;

        &:hover,
        &:active {
            ${DoubleStyled} {
                opacity: 1;
            }

            ${EllipsisStyled} {
                opacity: 0;
            }
        }
    `
})

export const PaginationItem = styled(ButtonTertiary)(({ theme, selected, disabled, size }) => {
    const buttonWidth = sizes[size] || sizes.md
    return css`
    height: 100%;
    min-width: ${buttonWidth}px;

    &:active {
        border-color: ${theme.brandSecondary};
    }

    ${selected && css`
        &,
        &:hover {
            border-color: ${theme.brandSecondary};
        }   
    `}

    ${disabled && css`
        pointer-events: none;
        background-color: ${theme.buttonTransparentBodyDisabled};
        border-color: ${theme.buttonStrokeBorderNormal};

        svg {
            fill: ${theme.iconDraft};
        }
    `};
`
})

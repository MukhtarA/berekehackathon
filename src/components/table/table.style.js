import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { PaddingWrapper } from '../indent-wrapper/padding-wrapper.style'
import { dynamicIndent } from '../styles/dynamic-styles'
import { Typography } from '../typography'

const itemMobileViewStyle = ({ theme, size, isMobileSlim }) => theme.media?.sm && isMobileSlim && css`
    @media ${theme.media.sm} {
        text-align: left;
        justify-content: flex-start;
        padding-top: ${dynamicIndent(size, 'nano')};
    }
`

export const TableStyled = styled.div(({ theme }) => css`
    background-color: ${theme.tableBody};
`)

export const RowStyled = styled.div`
    display: flex;
    box-sizing: border-box;
    margin: 0;
    
    ${({ theme, isMobileSlim }) => theme.media?.sm && isMobileSlim && css`
        @media ${theme.media.sm} {
            flex-direction: column;
        }
    `}
`

export const HeadRowStyled = styled(RowStyled)(({ theme }) => css`
    &, ${Typography} {
        color: ${theme.tableLabel};
    }
`)

export const BorderedRowStyled = styled(PaddingWrapper)(({ theme }) => css`
    border-bottom: 1px solid ${theme.tableBorder};

    &:last-of-type {
        border: none;
    }
`)

export const BorderedHeadRowStyled = styled(PaddingWrapper)(({ theme }) => css`
    border-bottom: 1px solid ${theme.tableBorder};
`)

export const ItemStyled = styled.div(({ align }) => css`
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    flex-direction: row;

    text-align: ${align === 'right' ? 'right' : 'left'};

    justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'};

`, itemMobileViewStyle)

export const LabelStyled = styled.div(({ theme }) => css`    
    &, ${Typography} {
        color: ${theme.tableLabel};
    }
`)

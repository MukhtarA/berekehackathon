import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../../../styles/radius.config.style'
import { DateButtonStyled, currentButtonStyle } from '../../components/button/button.style'
import { dynamicIndent } from '../../../styles/dynamic-styles'

const CELL_SIZE = 112

export const TitleStyled = styled.span`
    position: relative;
    width: ${CELL_SIZE}px;

    ${currentButtonStyle};
`

export const CellStyled = styled.td(({ size = 'md' }) => css`
    display: block;
    padding: 0;

    ${DateButtonStyled} {
        display: flex;
        height: 100%;
        padding: ${dynamicIndent(size, 'inner')} 0;

        &::after {
            border-radius: ${xsBorderRadius};
        }
    }
`)

export const RowStyled = styled.tr`
    display: flex;
    width: 100%;
`

export const BodyStyled = styled.tbody(({ size = 'md' }) => css`
    display: flex;
    flex-direction: column;
    padding-top: ${dynamicIndent(size, 'inner')};
`)

export const TableStyled = styled.table(({ theme, size = 'md' }) => css`
    display: block;
    margin-top: ${dynamicIndent(size, 'inner')};
    border-top: 1px solid ${theme.calendarBorder};
`)

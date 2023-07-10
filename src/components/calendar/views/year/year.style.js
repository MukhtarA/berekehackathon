import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../../../styles/radius.config.style'
import { DateButtonStyled } from '../../components/button/button.style'
import { dynamicIndent } from '../../../styles/dynamic-styles'
import { getBackgroundColor } from '../../utils'

const CELL_SIZE = 112

const withinCellStyle = ({
    theme,
    within,
    disabled,
    isStartDate,
    isEndDate,
}) => {
    if (!within) {
        return ''
    }

    return css`
    background-color: ${getBackgroundColor({
        theme,
        isStartDate,
        isEndDate,
        disabled,
    })};
    `
}

export const CellStyled = styled.td(
    ({ size = 'md' }) => css`
        display: block;
        width: ${CELL_SIZE}px;
        padding: 0;

        ${DateButtonStyled} {
            height: 100%;
            padding: ${dynamicIndent(size, 'inner')};

            &::after {
                border-radius: ${xsBorderRadius};
            }
        }
    `,
    withinCellStyle
)

export const RowStyled = styled.tr`
    display: flex;
    width: 100%;
`

export const BodyStyled = styled.tbody(
    ({ size = 'md' }) => css`
        display: flex;
        flex-direction: column;
        padding-top: ${dynamicIndent(size, 'inner')};
    `
)

export const TableStyled = styled.table(
    ({ theme, size = 'md' }) => css`
        display: block;
        margin-top: ${dynamicIndent(size, 'inner')};
        border-top: 1px solid ${theme.calendarBorder};
    `
)

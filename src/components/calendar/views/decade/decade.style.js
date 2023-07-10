import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../../../styles/radius.config.style'
import {
    DefaultButtonStyled,
    DateButtonStyled,
} from '../../components/button/button.style'
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

export const PreviousDecadeButtonStyled = styled(DefaultButtonStyled)`
    transform: rotate(90deg);
`

export const NextDecadeButtonStyled = styled(DefaultButtonStyled)`
    transform: rotate(270deg);
`

export const CellStyled = styled.td(
    ({ size = 'md' }) => css`
        display: block;
        padding: 0;

        ${DateButtonStyled} {
            height: 100%;
            padding: ${dynamicIndent(size, 'inner')} 0;

            &::after {
                border-radius: ${xsBorderRadius};
            }
        }
    `,
    withinCellStyle
)

export const RowStyled = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const ControlsStyled = styled(RowStyled)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${CellStyled} {
        flex-grow: 0;
        flex-basis: auto;

        &:first-of-type {
            ${DefaultButtonStyled} {
                padding: 0;
                margin: 0;
                transform: rotate(90deg);
            }
        }

        &:last-of-type {
            ${DefaultButtonStyled} {
                padding: 0;
                margin: 0;
                transform: rotate(270deg);
            }
        }
    }
`

export const BodyStyled = styled.tbody(
    ({ size = 'md' }) => css`
        display: flex;
        flex-direction: column;
        margin-top: ${dynamicIndent(size, 'inner')};

        ${CellStyled} {
            width: ${CELL_SIZE}px;
            margin: 0 auto;
        }
    `
)

export const HeadStyled = styled.thead(
    ({ theme, size = 'md' }) => css`
        display: block;
        padding: 0;
        border-top: 1px solid ${theme.calendarBorder};
        border-bottom: 1px solid ${theme.calendarBorder};
        box-sizing: content-box;
        padding: ${dynamicIndent(size, 'inner')} 0;
    `
)

export const TableStyled = styled.table(
    ({ size = 'md' }) => css`
        display: block;
        margin-top: ${dynamicIndent(size, 'inner')};
    `
)

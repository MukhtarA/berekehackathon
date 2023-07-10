import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { baseX } from '../../../styles/semantic.config.style'
import { dynamicIndent, dynamicSize } from '../../../styles/dynamic-styles'
import { DateButtonStyled } from '../../components/button/button.style'

const CELL_SIZE = 48
// Высота минус linehHeightMd
const CELL_PADDING = CELL_SIZE - (baseX * 5)

const getBorderRadius = (start, end) => {
    if (start) {
        return '50% 0 0 50%'
    }
    if (end) {
        return '0 50% 50% 0'
    }

    return 0
}

const getBackgroundColor = ({ theme, isStartDate, isEndDate, disabled }) => {
    if (isStartDate && isEndDate) {
        return 'transparent'
    }

    if (disabled) {
        return theme.calendarButtonWarning
    }

    return theme.calendarButtonRange
}

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

    const borderRadius = getBorderRadius(isStartDate, isEndDate)

    return css`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 0;
        width: ${CELL_SIZE}px;
        height: ${CELL_SIZE}px;
        background-color: ${getBackgroundColor({
        theme,
        isStartDate,
        isEndDate,
        disabled,
    })};
        border-radius: ${borderRadius};
    }
    `
}

export const HeadlineStyled = styled.th`
    display: inline-block;
    width: ${CELL_SIZE}px;
    padding: 0;
`

export const CellStyled = styled.td(
    ({ size = 'md' }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${CELL_SIZE}px;
        padding: 0;
        padding: calc(${dynamicIndent(size, 'inner')} - ${CELL_PADDING / 2}px) 0;

        ${DateButtonStyled} {
            /* Перебивать focusStyle */
            border-radius: 50% !important;
            overflow: hidden;
            padding: ${CELL_PADDING / 2}px 0;

            &::after {
                top: calc(50% - (${CELL_SIZE / 2}px));
                height: ${CELL_SIZE}px;
            }
        }
    `,
    withinCellStyle
)

export const RowStyled = styled.tr`
    display: flex;
`

export const BodyStyled = styled.tbody`
    display: flex;
    flex-direction: column;

    ${RowStyled}:first-of-type {
        margin-top: 0;

        ${CellStyled}:first-of-type {
            margin-left: auto;
        }
    }
`

export const HeadStyled = styled.thead(
    ({ theme, size = 'sm' }) => css`
        display: block;
        padding-top: ${dynamicIndent(size, 'open')};
        ${HeadlineStyled} {
            font-weight: 400;
            ${dynamicSize({ size })};

            padding: ${dynamicIndent(size, 'inner')} 0;

            &:nth-of-type(6),
            &:nth-of-type(7) {
                color: ${theme.calendarTextWeekendNormal};
            }
        }
    `
)

export const TableStyled = styled.table(
    ({ theme, size = 'md', viewModeLight }) => css`
        display: block;
        width: 100%;

        border-top: ${viewModeLight ? '0' : `1px solid ${theme.calendarBorder}`};
        margin-top: ${viewModeLight ? '0' : dynamicIndent(size, 'inner')};
    `
)

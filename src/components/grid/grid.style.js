import styled from '@emotion/styled'
import { css } from '@emotion/react'

import {
    lgColumns,
    mdColumns,
    smColumns,
    mediaLg,
    mediaMd,
    mediaSm,
    lgWidth,
    mdWidth,
    smWidth,
    columnWidth
} from '../../utils/media.config.style'

const column0 = css`
    width: 0;
    height: 0;
    overflow: hidden;
    display: none;
`

const dynamicCellStyled = (size, offsetSize, sizeColumns) => {
    let style = css``

    if (!size) {
        return column0
    }

    if (size > 0 && size <= sizeColumns) {
        style = `width: ${size * columnWidth}px;`
    }

    if (offsetSize > 0 && size + offsetSize <= sizeColumns) {
        style += `margin-left: ${offsetSize * columnWidth}px;`
    }

    return style
}

export const GridStyled = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: wrap;

    ${mediaLg} {
        max-width: ${lgWidth}px;
    }

    ${mediaMd} {
        max-width: ${mdWidth}px;
    }

    ${mediaSm} {
        max-width: ${smWidth}px;
    }
`

export const CellStyled = styled.div`
    box-sizing: content-box;
    flex-grow: 0;
    flex-shrink: 0;
    min-height: 1px;

    ${mediaLg} {
        ${({ lg, offsetLg }) => dynamicCellStyled(lg, offsetLg, lgColumns)}
    }

    ${mediaMd} {
        ${({ md, offsetMd }) => dynamicCellStyled(md, offsetMd, mdColumns)}
    }

    ${mediaSm} {
        ${({ sm, offsetSm }) => dynamicCellStyled(sm, offsetSm, smColumns)}
    }
`

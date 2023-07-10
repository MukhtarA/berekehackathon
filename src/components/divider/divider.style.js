import { css } from '@emotion/react'
import styled from "@emotion/styled/macro"

import { MarginWrapper } from '../indent-wrapper'

const sizeParametrs = {
    sm: {
        height: 1,
        color: 'dividerThin'
    },
    lg: {
        height: 12,
        color: 'dividerFat'
    },
}

export const DividerStyled = styled(MarginWrapper)(({ size, theme }) => {
    const { height } = sizeParametrs[size] || sizeParametrs.lg
    const color = theme[(sizeParametrs[size] || sizeParametrs.lg).color]

    return css`
        height: ${height}px;
        background-color: ${color};
    `
})

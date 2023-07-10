import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const GridStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin: 24px 0;
`

export const ItemStyled = styled.div(({ theme, selected }) => {
    return css`
        width: 40px;
        height: 40px;
        border: 1px solid ${selected ? theme.success : theme.fieldBorderNormal};
        color: ${selected ? theme.noColor : theme.primary};
        background-color: ${selected && theme.success};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `
})

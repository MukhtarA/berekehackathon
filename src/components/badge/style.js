import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { white, orange5 } from '@sbol/design-system/core/styles/colors.config.style'

const baseStyle = css`
    position: absolute;
    top: -50%;
    right: -50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    font-size: 10px;
    padding: 2px 6px;
`

export const BadgeStyled = styled.span`
    ${baseStyle};
    background: ${orange5};
    color: ${white};
`

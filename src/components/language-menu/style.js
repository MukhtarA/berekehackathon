import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const MenuWrapper = styled.div`
    span {
        height: 24px !important;
        width: 24px !important;
    }

    ${({ theme, isWhite }) =>
        css`
            div > button > p {
                padding-left: 6px !important;
                font-weight: 600;
                ${isWhite && `color: ${theme.white};`}
            }
        `}

    li {
        button {
            span {
                top: 14px;
            }
        }
    }
`

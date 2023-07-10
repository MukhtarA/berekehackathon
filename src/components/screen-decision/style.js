import styled from '@emotion/styled'
import { IconLoader } from '@sbol/design-system/core/icon'

import { statusBgColors, statusIconColors } from '../../constants/status'

export const DecisionScreenStyled = styled.div`
    background: ${({ theme, mode }) => theme[statusBgColors[mode]]};
    margin-left: -23px;
    margin-right: -23px;
    padding: 23px 23px 48px;

    & > div:first-child {
        display: flex;
        margin-top: 28px;
        margin-bottom: 20px;
        align-items: center;

        & > h2 {
            margin-left: 12px;
        }
    }
`

export const IconStyled = styled(IconLoader)`
    svg {
        width: 48px;
        height: 48px;
        fill: ${({ theme, mode }) => theme[statusIconColors[mode]]};
    }
`

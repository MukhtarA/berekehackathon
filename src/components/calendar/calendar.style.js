import styled from "@emotion/styled/macro"

import { WrapperButtonStyled } from '../text-field/text-field.style'

export const CalendarStyled = styled.div`
    position: relative;

    ${WrapperButtonStyled} {
        body:not(.pointer-events) &:focus {
            display: none;
        }
    }
`

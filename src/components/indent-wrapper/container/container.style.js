import styled from "@emotion/styled/macro"

import { PaddingWrapper } from '../padding-wrapper.style'
import { MarginWrapper } from '../margin-wrapper.style'

export const Container = styled.div`
    & > :first-child {
        margin-top: 0;
        padding-top: 0;
    }

    & > :last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
`
    .withComponent(PaddingWrapper)
    .withComponent(MarginWrapper)

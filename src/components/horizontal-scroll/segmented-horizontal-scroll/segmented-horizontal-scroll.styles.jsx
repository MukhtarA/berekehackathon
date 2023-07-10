import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Container } from '../../indent-wrapper'

export const SegmentButtonStyled = styled.button(({ theme }) => css`
    cursor: pointer;
    padding: 0;
    background-color: ${theme.transparent};
`)

export const SegmentContainerStyled = styled(Container)`
    display: flex;
    align-items: center;
    flex-shrink: 0;
`

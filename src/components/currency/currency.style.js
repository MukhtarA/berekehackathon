import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../typography'

export const CurrencyStyled = styled(Typography)(({ isSymbol }) => isSymbol && css`
    display: inline-block;
    color: inherit;
`).withComponent('span')

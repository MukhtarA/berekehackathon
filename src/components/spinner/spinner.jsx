import React from 'react'

import { StyledContainer, StyledSpinner } from './style'

export function Spinner({ size = '50px', ...rest }) {
    return (
        <StyledContainer size={size} {...rest}>
            <StyledSpinner size={size} />
        </StyledContainer>
    )
}

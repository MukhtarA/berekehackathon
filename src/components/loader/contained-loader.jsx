import React from 'react'
import styled from "@emotion/styled/macro"

import { Loader } from './loader'

const ContainedLoaderStyled = styled(Loader)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

const WrapperStyled = styled.div``

export const ContainedLoader = ({ className, ...rest }) => (
    <WrapperStyled className={className}>
        <ContainedLoaderStyled {...rest} />
    </WrapperStyled>
)

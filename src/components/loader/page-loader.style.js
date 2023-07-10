import styled from "@emotion/styled/macro"

import { Loader } from './loader'

export const PageLoaderStyled = styled(Loader)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const WrapperStyled = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 128px);
    margin-top: -64px;
`

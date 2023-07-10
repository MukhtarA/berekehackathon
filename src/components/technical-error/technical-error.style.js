import styled from "@emotion/styled/macro"

import { Headline4, Typography } from '../typography'
import { PaddingWrapper } from '../indent-wrapper/padding-wrapper.style'
import { Container } from '../indent-wrapper/container'
import { baseX } from '../styles/semantic.config.style'

const MAX_CONTENT_WIDTH = baseX * 152
const MAX_IMAGE_HEIGHT = baseX * 72

export const TechnicalErrorWrapperStyled = styled(PaddingWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    & > :last-child {
        margin-bottom: 0;
    }
`
export const TechnicalErrorHeadingWrapperStyled = styled(Container)`
    width: 100%;
    max-width: ${MAX_CONTENT_WIDTH}px;
`

export const TechnicalErrorTitleStyled = styled(Headline4)`
    text-align: center;
`

export const TechnicalErrorDescriptionStyled = styled(Typography)`
    text-align: center;
`
export const ImageWrapperStyled = styled.div`
    width: 100%;
    height: 100%;
    max-width: ${MAX_CONTENT_WIDTH}px;
`

export const ImageStyled = styled.img`
    max-width: 100%;
    max-height: ${MAX_IMAGE_HEIGHT}px;
`

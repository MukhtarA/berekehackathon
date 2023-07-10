import styled from '@emotion/styled'
import { TechnicalError } from '@sbol/design-system/core/technical-error'
import { ButtonPrimary } from '@sbol/design-system/core/button'
import { Headline1 } from '@sbol/design-system/core/typography'

export const TechnicalErrorStyled = styled(TechnicalError)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
`

export const ButtonStyled = styled(ButtonPrimary)`
    margin: 48px 0 0 0;
`

export const ImgStyled = styled.img`
    width: 100%;
`

export const HeadlineStyled = styled(Headline1)`
    padding-top: 8px;
`

export const LinksStyled = styled.div`
    display: flex;
    align-items: center;
`

export const MobileLinkStyled = styled.a`
    :not(:last-child) {
        margin-right: 8px;
    }
`

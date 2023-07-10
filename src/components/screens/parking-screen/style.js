import styled from '@emotion/styled'
import { Typography, Headline1 } from '@sbol/design-system/core/typography'
import { Menu } from '@sbol/design-system/core/menu'

import { mediaSm, mediaMd, mediaLg } from '../../../utils/media.config.style'

export const ParkingPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    background-color: #f3f4f8;
`

export const HeaderStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 40px 0;
    z-index: 1;
`

export const HeaderWrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${mediaSm} {
        flex-direction: column;
    }
`

export const PhoneLabelStyled = styled(Typography)`
    margin-left: 16px;

    ${mediaLg} {
        margin-left: 60px;
    }
`

export const PhoneStyled = styled(Typography)`
    font-weight: bold;

    ${mediaLg} {
        margin-left: 16px;
    }
`

export const MenuStyled = styled(Menu)`
    ${mediaMd} {
        margin-left: auto;
    }

    ${mediaLg} {
        margin-left: auto;
    }
`

export const HeadlineStyled = styled(Headline1)`
    padding-top: 24px;
`

export const MobileLinksStyled = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 64px;

    a {
        margin-right: 8px;
    }
`

export const ImageStyled = styled.img`
    display: none;
    position: absolute;
    width: 448px;
    top: -64px;
    right: -320px;

    ${mediaLg} {
        display: block;
    }
`

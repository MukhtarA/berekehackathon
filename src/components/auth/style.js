import styled from '@emotion/styled'
import {
    Typography,
    Headline1,
    Headline3,
    Caption,
    Body2
} from '../typography'
import { Link } from '../link'
import { hex2rgba } from '../styles/colors.config.style'
import { lgShadow } from '../styles/shadows.config.style'
import { ButtonPrimary } from '../button'

import {NavigateTertiary} from '../buttons/navigate'
import { mediaSm, mediaMd, mediaLg } from '../../utils/media.config.style'

import background from './assets/background.jpg'

export const LoginPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const GradientBackgroundStyled = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(
        106.39deg,
        rgba(0, 0, 0, 0.64) 0%,
        rgba(0, 0, 0, 0.48) 50.56%,
        rgba(0, 0, 0, 0) 100%
    );
`

export const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    background-image: url(${background});
    background-size: cover;
`

export const HeaderStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 40px 0;
    z-index: 1;
`

export const HeaderWrapperStyled = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    ${mediaSm} {
        flex-direction: column;
    }
`

export const PhoneWithLabelWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    ${mediaLg} {
        flex-direction: row;
    }
`

export const PhoneLabelStyled = styled(Typography)`
    margin-left: 16px;

    ${mediaLg} {
        margin-left: 60px;
    }
`

export const PhoneStyled = styled(Typography)`
    color: ${({ theme }) => theme.white};
    font-weight: bold;

    ${mediaLg} {
        margin-left: 16px;
    }

    ${mediaMd} {
        margin-left: 4px;
    }
`

export const IndicatorWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const IndicatorStyled = styled.div`
    display: flex;
    border-radius: 50%;
    width: ${({ active }) => (active ? '10px' : '6px')};
    height: ${({ active }) => (active ? '10px' : '6px')};
    background-color: ${({ theme, active }) => hex2rgba(theme.white, active ? 100 : 32)};
    margin-right: 10px;
`

export const HeadlineStyled = styled(Headline1)`
    padding-top: 24px;
    color: ${({ theme }) => theme.white};
    white-space: pre-line;
`

export const LoginWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.white};
    border-radius: 8px;

    ${({ theme }) => `box-shadow: ${lgShadow(theme)}`}
`

export const LoginFormWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px 32px 16px;
`

export const LoginTitleStyled = styled(Headline3)`
    align-self: center;
    margin-bottom: 24px;
`

export const BackLinkStyled = styled(Link)`
    margin-bottom: 24px;
    align-self: flex-start;
`

export const AgreementTextStyled = styled(Caption)`
    margin-top: 12px;

    a {
        text-decoration: none;
        font-weight: bold;
        ${({ theme }) => `color: ${theme.brandPrimary}`}
    }
`

export const InfoTextStyled = styled(Caption)`
    margin-top: -8px;
`

export const MobileLinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    border-top: ${({ theme }) => `1px solid ${theme.textFieldControlBorderNormal}`};
`

export const MobileLinksDescriptionStyled = styled(Body2)`
    margin-top: 8px;
    margin-bottom: 24px;
    text-align: center;
    ${({ theme }) => `color: ${theme.secondary}`}
`

export const MobileLinksStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    ${mediaLg} {
        flex-direction: row;
        justify-content: space-around;
    }
`

export const WhiteBtnStyled = styled(NavigateTertiary)`
    background-color: ${({ theme }) => theme.white};
    min-width: 256px;
`

export const LinkStyled = styled.a`
    text-decoration: none;
    padding: 0 0 16px 0;
`

export const ButtonStyled = styled(ButtonPrimary)`
    margin-left: 10%;
    width: 80%;
`

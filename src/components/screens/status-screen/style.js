import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { IconLoader } from '@sbol/design-system/core/icon'
import { Headline1, Body1, Body2 } from '@sbol/design-system/core/typography'
import { ButtonTertiary } from '@sbol/design-system/core/button'
import { gray5, green3 } from '@sbol/design-system/core/styles/colors.config.style'
import { xsShadow } from '@sbol/design-system/core/styles/shadows.config.style'

import { mediaMd, mediaSm } from '../../../utils/media.config.style'

const dynamicColor = ({ mode, theme }) => {
    switch (mode) {
        case 'success':
            return theme.successPrimary
        case 'info':
            return theme.infoTertiary
        case 'error':
            return theme.warningTertiary
        case 'draft':
            return theme.additional16
        case 'warning':
            return theme.warningPrimary
        case 'errorTravel':
            return theme.alertWarningActions
        case 'waiting':
        case 'async':
            return gray5
        default:
            return theme.successTertiary
    }
}

const backgroundColor = ({ theme }) => (theme ? theme.white : 'white')

const messageShadow = ({ theme }) =>
    css`
        box-shadow: ${xsShadow(theme)};
    `

export const StatusScreenStyled = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 540px;
`

export const ImageStyled = styled.img`
    position: absolute;
    right: -64px;
    bottom: 0;

    ${mediaSm} {
        display: none;
    }

    ${mediaMd} {
        width: 360px;
    }
`

export const HeadlineStyled = styled.div`
    display: flex;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 32px;
`

export const HeadlineTextStyled = styled(Headline1)`
    margin-left: 14px;
    width: 70%;

    ${mediaSm} {
        font-size: 28px;
        line-height: 36px;
        width: 100%;
    }
`

export const IconStyled = styled(IconLoader)`
    svg {
        width: 48px;
        height: 48px;
        fill: ${dynamicColor};
    }
`

export const MessageContainer = styled.div`
    margin: 8px 0;
    background-color: ${backgroundColor};
    padding: 16px;
    max-width: 295px;
    border-radius: 4px 20px 20px;
    ${messageShadow}
`

export const StepStyled = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-bottom: 20px;
    padding-left: 42px;
    border-radius: 4px;
    max-width: 420px;

    p {
        padding: 8px 0;
    }

    &:last-child {
        margin-bottom: 20px;
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 8px;
        height: 100%;
        display: block;
        border-radius: 4px;
        background-color: ${dynamicColor};
    }
`

export const OffersWrapperStyled = styled.div`
    margin: 16px 0;
`

export const TableTitleStyled = styled(Body1)`
    margin-top: 68px;
`

export const RowStyled = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid ${theme.additional8};
        grid-gap: 30px;
    `}
`

export const ValueStyled = styled.div`
    padding: 20px 0;
    text-align: right;
`

export const DescriptionStyled = styled(Body2)`
    margin-left: 4px;
`

export const CardIconStyled = styled(IconLoader)`
    svg {
        width: 32px;
        height: 32px;
    }
`

export const CardValueStyled = styled.div`
    display: flex;
    align-items: center;
`

export const ButtonStyled = styled(ButtonTertiary)`
    margin-top: 48px;

    p {
        font-weight: 600;
    }
`

export const LinkStyled = styled(Link)`
    text-decoration: none;
`

export const AlertWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
`

export const InnerActionButton = styled.p`
    margin-top: 10px;
    margin-bottom: 8px;
    font-weight: 600;
    color: ${green3};
    cursor: pointer;
`

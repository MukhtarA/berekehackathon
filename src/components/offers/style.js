import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { IconLoader } from '@sbol/design-system/core/icon'
import { Caption, Headline5 } from '@sbol/design-system/core/typography'
import { green0 } from '@sbol/design-system/core/styles/colors.config.style'
import { smShadow } from '@sbol/design-system/core/styles/shadows.config.style'

export const OffersWrapperStyled = styled.div`
    display: flex;
`

export const OfferStyled = styled.div(
    ({ theme, img, disabled }) => css`
        position: relative;
        display: ${disabled ? 'none' : 'flex'};
        flex-direction: column;
        justify-content: flex-end;
        width: 160px;
        min-width: 160px;
        height: 168px;
        background-size: cover;
        border-radius: 4px;
        padding: 16px;
        background-color: ${theme.noColor};
        cursor: pointer;
        transition: all 0.17s ease-in-out;
        background-image: ${img ? `url(${img}) ` : 'none'};

        &:hover {
            box-shadow: ${disabled ? 'none' : smShadow(theme)};
            transform: ${disabled ? 'none' : 'translateY(-4px)'};
        }

        &:not(:last-child) {
            margin-right: 16px;
        }
    `
)

export const IconStyled = styled(IconLoader)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    position: absolute;
    border-radius: 50%;
    top: 16px;
    background-color: ${green0};
`

export const TitleStyled = styled(Headline5)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ img, theme }) =>
        img
            ? `
                white-space: nowrap;
                color: ${theme.noColor}`
            : `
                white-space: inherit;
                color: ${theme.primary}`}
`

export const DescriptionStyled = styled(Caption)`
    font-size: 14px;
    margin-top: 4px;
`

export const ImgWrapperStyled = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(8, 166, 82, 0.16);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
    top: 15%;
`

export const ImgStyled = styled.img`
    width: 36px;
    height: 36px;
    //filter: invert(100%);
`

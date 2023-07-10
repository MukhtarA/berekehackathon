import styled from '@emotion/styled'
import { Typography } from '../../typography'
import { coolGray3, coolGray7, white } from '../../styles/colors.config.style'

import { mediaSm, mediaMd } from '../../../utils/media.config.style'

export const FooterStyled = styled.footer`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 48px 0;
    background-color: ${coolGray7};
    z-index: 1;

    ${mediaSm} {
        padding-top: 32px;
    }
`

export const AddressStyled = styled.address`
    display: flex;
    flex-direction: column;
`

export const AddressLineStyled = styled(Typography)`
    font-size: 14px;

    ${mediaSm} {
        text-align: center;
    }
`

export const SocialsWrapperStyled = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    ${mediaSm} {
        margin-top: 8px;
        justify-content: center;
    }
`

export const SocialStyled = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
`

export const LinkStyled = styled.a`
    margin-left: 16px;
    width: 32px;
    height: 32px;
    background-color: ${white};
    border-radius: 50%;
    display: inline-block;
    text-align: center;

    &:hover {
        background-color: ${coolGray3};
    }

    svg {
        display: block;
        height: 100%;
        width: 100%;
    }

    ${mediaMd} {
        margin-left: 8px;
    }
`

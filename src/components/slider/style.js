import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
    coolGray2,
    coolGray7,
    gray9,
    gray4A,
    gray8A,
    hex2rgba
} from '@sbol/design-system/core/styles/colors.config.style'
import { ButtonSecondary } from '@sbol/design-system/core/button'

import { mediaSm } from '@web_sbol/shared/src/utils/media.config.style'

export const ArrowStyled = styled(ButtonSecondary)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    ${({ customArrows }) =>
        css`
            right: ${customArrows ? customArrows.right : '-88px'};
        `}
    top: 27%;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 1px 2px ${gray4A}, 0 4px 8px ${hex2rgba(gray9, 1)};
    border: 1px solid ${gray8A};

    ${({ isLeft, customArrows }) =>
        isLeft &&
        css`
            left: ${customArrows ? customArrows.left : '-88px'};
        `}

    ${mediaSm} {
        display: flex;
        position: absolute;
        z-index: 6;
        right: -10px;
        ${({ customArrows }) => css`
            background-color: ${customArrows ? 'white' : 'transparent'};
            right: ${customArrows ? customArrows.rightMobile : '-10px'};
            top: ${customArrows ? customArrows.topMobile : '27%'};
            height: ${customArrows ? customArrows.heightMobile : '48px'};
            width: ${customArrows ? customArrows.widthMobile : '48px'};
        `}

        ${({ isLeft, customArrows }) =>
            isLeft &&
            css`
                left: ${customArrows ? customArrows.leftMobile : '-10px'};
            `}
    }
`

export const SliderStyled = styled.div(
    ({ noMargin, fullWidth }) => css`
        position: relative;
        ${fullWidth ? 'width: 100%;' : null}
        margin-top: ${noMargin ? '0' : '48px'};

        &:hover {
            ${ArrowStyled} {
                display: flex;
            }
        }
    `
)

export const IndicatorsStyled = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 40px 0 0;
`

export const IndicatorStyled = styled.li`
    margin-right: 8px;
    cursor: pointer;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: ${coolGray2};
    transition: width 0.5s ease-out;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: ${coolGray7};
            width: 16px;
        `}
`

export const SliderWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `}
    ${({ contentCentered }) =>
        contentCentered &&
        css`
            align-items: center;
        `}
`

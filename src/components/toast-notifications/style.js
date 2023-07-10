import styled from '@emotion/styled'
import { isMobile } from '@sbol/design-system/core/utils/adaptive'
import { green2, white } from '@sbol/design-system/src/styles/colors.config.style'
import { dynamicSize } from '@sbol/design-system/core/styles/dynamic-styles'
import { lgShadow } from '@sbol/design-system/core/styles/shadows.config.style'

export const ToastContainerStyled = styled.div`
    font-size: ${dynamicSize};
    box-sizing: border-box;
    position: fixed;
    bottom: 15px;
    right: ${isMobile() ? 'auto' : '12px'};
    z-index: 999999;
`

export const NotificationStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s ease;
    padding-left: 16px;
    padding-right: 16px;
    overflow: hidden;
    margin-bottom: 15px;
    width: 370px;
    height: 60px;
    border: 1px solid ${green2};
    border-radius: 8px;
    ${({ theme }) => `box-shadow: ${lgShadow(theme)}`};
    background-color: ${white};
    background-position: 15px;
    background-repeat: no-repeat;

    button {
        font-weight: 600;
        font-size: ${dynamicSize};
        line-height: 20px;
        color: #379535;
        outline: none;
        border: none;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
    }

    &:hover {
        box-shadow: 0 0 12px #fff;
        opacity: 1;
    }
`

export const NotificationMessageStyled = styled.p`
    font-weight: 600;
    font-size: ${dynamicSize};
    line-height: 20px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

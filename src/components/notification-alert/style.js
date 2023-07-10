import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { lgShadow } from '@sbol/design-system/core/styles/shadows.config.style'
import { Headline5 } from '@sbol/design-system/core/typography'

const move = keyframes`
    0% {
        bottom: -100px;
    }

    5% {
        bottom: 43px;
    }

    75% {
        bottom: 43px;
    }

    100% {
        bottom: 43px;
    }
`

export const NotificationAlertStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
    border: ${({ theme, colorScheme }) => `1px solid ${theme[colorScheme]}`};
    box-sizing: border-box;
    border-radius: 8px;
    width: calc(100% - 23px);
    position: fixed;
    bottom: 43px;
    background: ${({ theme }) => theme.noColor};
    box-shadow: ${({ theme }) => lgShadow(theme)};
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
    animation: ${({ show }) =>
        show &&
        css`
            ${move} 10000ms linear
        `};
    transition: 0.5s linear all;
`

export const Headline5Styled = styled(Headline5)`
    margin-right: 16px;
`

const fullfilled = keyframes`
    0% {
        clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)
        }
    25%  {
        clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)
            }
    50%  {
        clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)
            }
    75%  {
        clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)
            }
    100% {
        clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)
            }
`

export const LoaderStyled = styled.div`
    min-width: 36px;
    height: 36px;
    margin-right: 20px;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: ${({ theme, colorScheme }) => `4px solid ${theme[colorScheme]}`};
        animation: ${fullfilled} 1s linear infinite;
    }
`

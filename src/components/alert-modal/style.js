import styled from '@emotion/styled'
import { Typography } from '../typography'

export const AlertWrapperStyled = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ${({ open }) => (open ? 'scale(1)' : 'scale(0.7)')};
    opacity: ${({ open }) => (open ? '100%' : '0%')};
    transition: opacity 0.2s, transform 0.5s;
    z-index: 10000;
    min-width: 270px;
    background: ${({ theme }) => theme.noColor};
    border-radius: 10px;
`

export const AlertStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 13px;
    padding-bottom: 6px;
`

export const AlertButtonsStyled = styled.div`
    display: flex;
    flex-direction: ${({ $hasColumn }) => $hasColumn && 'column'};
    width: 100%;
    z-index: 10000;
`

export const AlertButtonStyled = styled.button`
    flex: 1 1 auto;
    min-width: 50%;
    height: 44px;
    border-top: 0.55px solid ${({ theme }) => theme.bannerDraft};
    border-right: 0.55px solid ${({ theme }) => theme.bannerDraft};
    background-color: transparent;
    color: ${({ theme, colorScheme }) => theme[colorScheme]};
    line-height: 20px;
    touch-action: manipulation;

    &:active {
        background-color: ${({ theme }) => theme.bannerDraft};
    }

    ${Typography} {
        display: flex;
        flex-flow: row nowrap;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-align: center;
    }
`

export const BackdropStyled = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    opacity: ${({ $open }) => ($open ? '100%' : '0%')};
    pointer-events: ${({ $disabledBg }) => ($disabledBg ? 'none' : 'initial')};
    transition: 0.5s all;
    z-index: 1000;
`

export const AlertMessageStyled = styled.div`
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 5px;

    & p {
        text-align: center;
    }
`

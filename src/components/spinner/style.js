import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { green0, green5 } from '@sbol/design-system/core/styles/colors.config.style'

export const StyledContainer = styled.div`
    position: absolute;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    top: calc(50% - ${({ size }) => size});
    left: calc(50% - (${({ size }) => size} / 2));
`

export const rotate = keyframes`
    0% {
    transform: rotate(0deg);
    }
    100% {
    transform: rotate(360deg);
    }
`

export const StyledSpinner = styled.div`
    width: 100%;
    height: 100%;
    border: calc(${({ size }) => size} / 100 * 10) solid ${green0};
    border-top: calc(${({ size }) => size} / 100 * 10) solid ${green5};
    border-radius: 50%;
    animation: ${rotate} 1.5s linear infinite;
`

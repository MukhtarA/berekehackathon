import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const loading = keyframes`
   0% {
       opacity: 1;
   }

   50% {
       opacity: 0.4;
   }

   100% {
       opacity: 1;
   }
   `

const pulse = keyframes`
0% {
    transform: translateX(-100%);
}

50% {
    transform: translateX(100%);
}

100% {
    transform: translateX(100%);
    opacity: 0;
}
`

export const SkeletonStyled = styled.div`
    position: relative;
    width: ${({ $width }) => `${$width}`};
    height: ${({ $height }) => `${$height}`};
    animation: ${loading} 1.5s ease-in-out 0.5s infinite;
    border-radius: ${({ borderRadius }) => borderRadius};
    background-color: ${({ theme }) => theme.fieldBorderDisabled};
    margin-top: ${({ marginTop }) => marginTop};
    overflow: hidden;

    &:after {
        content: '';
        position: absolute;
        background: ${({ theme }) =>
            `linear-gradient(90deg, transparent, ${theme.fieldBodyDisabled}, transparent)`};
        transform: translateX(-100%);
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        animation: ${pulse} 1.6s linear 0.5s infinite;
    }
`

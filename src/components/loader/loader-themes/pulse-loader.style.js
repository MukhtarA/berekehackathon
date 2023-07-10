import { css, keyframes } from '@emotion/react'

const pulse1 = keyframes`
    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(2);
        filter: blur(0);
    }

    50% {
        transform: scale(1);
    }

    100% {
        transform: scale(1);
    }
`

const pulse2 = keyframes`
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(2);
        filter: blur(0);
    }

    100% {
        transform: scale(1);
    }
`

export const PulseLoaderThemeStyle = () => css`
    &:nth-child(1) {
        animation:  ${pulse1} 1.6s infinite linear;
    };
    
    &:nth-child(2) {
        animation:  ${pulse2} 0.8s infinite linear;
        animation-delay: 0.4s;
    };
    
    &:nth-child(3) {
        animation: ${pulse1} 1.6s infinite linear;
        animation-delay: 0.8s;
    };
`

import { keyframes } from '@emotion/react'

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

export const smoothScaleOut = keyframes`
    0% {
        opacity: 0;
        transform: scaleY(0.15);
    }

    35% {
        opacity: 1;
    }
    
    100% {
        transform: scaleY(1);
    }
`

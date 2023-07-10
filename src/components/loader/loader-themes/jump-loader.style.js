import { css, keyframes } from '@emotion/react'

const jumpSm = keyframes`
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-4px);
    }
    50% {
        transform: translateY(0);
    }
    60% {
        transform: translateY(1px);
    }
    70% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(0);
    }
`

const jumpMd = keyframes`
    0% {
        transform: translateY(0);
    }

    25% {
        transform: translateY(-8px);
    }

    50% {
        transform: translateY(0);
    }

    60% {
        transform: translateY(2px);
    }

    70% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(0);
    }
`

const jumpLg = keyframes`
    0% {
        transform: translateY(0);
    }

    25% {
        transform: translateY(-16px);
    }

    50% {
        transform: translateY(0);
    }

    60% {
        transform: translateY(4px);
    }

    70% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(0);
    }
`

const jumpKeyframesSizes = {
    sm: jumpSm,
    md: jumpMd,
    lg: jumpLg,
}

export const JumpLoaderThemeStyle = ({ size = 'md' }) => css`
    &:nth-child(1) {
        animation: ${jumpKeyframesSizes[size]} 0.8s infinite linear;
    };

    &:nth-child(2) {
        animation: ${jumpKeyframesSizes[size]} 0.8s infinite linear;
        animation-delay: 0.1s;
    };

    &:nth-child(3) {
        animation: ${jumpKeyframesSizes[size]} 0.8s infinite linear;
        animation-delay: 0.2s;
    };
`

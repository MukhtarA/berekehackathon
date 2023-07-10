import { css, keyframes } from '@emotion/react'

const swap1Sm = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    8.3% {
        transform: translateX(8px) scale(2.5);
        filter: blur(0);
    }

    16.6% {
        transform: translateX(12px) scale(1);
    }

    22.2% {
        transform: translateX(12px) scale(1);
    }

    33.3% {
        transform: translateX(24px) scale(1);
    }

    50% {
        transform: translateX(24px) scale(1);
    }

    58.3% {
        transform: translateX(20px) scale(2.5);
        filter: blur(0);
    }

    66.6% {
        transform: translateX(12px) scale(1);
    }

    72.2% {
        transform: translateX(12px) scale(1);
    }

    83.3% {
        transform: translateX(0) scale(1);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap2Sm = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    5.6% {
        transform: translateX(0) scale(1);
    }

    16.6% {
        transform: translateX(-12px) scale(1);
    }

    33.3% {
        transform: translateX(-12px) scale(1);
    }

    41.6% {
        transform: translateX(-8px) scale(2.5);
        filter: blur(0);
    }

    50% {
        transform: translateX(0) scale(1);
    }

    55.6% {
        transform: translateX(0) scale(1);
    }

    66.6% {
        transform: translateX(12px) scale(1);
    }

    83.3% {
        transform: translateX(12px) scale(1);
    }

    91.6% {
        transform: translateX(8px) scale(2.5);
        filter: blur(0);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap3Sm = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    16.6% {
        transform: translateX(0) scale(1);
    }

    25% {
        transform: translateX(-8px) scale(2.5);
        filter: blur(0);
    }

    33.3% {
        transform: translateX(-12px) scale(1);
    }

    38.9% {
        transform: translateX(-12px) scale(1);
    }

    50% {
        transform: translateX(-24px) scale(1);
    }

    66.6% {
        transform: translateX(-24px) scale(1);
    }

    75% {
        transform: translateX(-20px) scale(2.5);
        filter: blur(0);
    }

    83.3% {
        transform: translateX(-12px) scale(1);
    }

    88.9% {
        transform: translateX(-12px) scale(1);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap1Md = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    8.3% {
        transform: translateX(12px) scale(2.5);
        filter: blur(0);
    }

    16.6% {
        transform: translateX(24px) scale(1);
    }

    22.2% {
        transform: translateX(24px) scale(1);
    }

    33.3% {
        transform: translateX(48px) scale(1);
    }

    50% {
        transform: translateX(48px) scale(1);
    }

    58.3% {
        transform: translateX(36px) scale(2.5);
        filter: blur(0);
    }

    66.6% {
        transform: translateX(24px) scale(1);
    }

    72.2% {
        transform: translateX(24px) scale(1);
    }

    83.3% {
        transform: translateX(0) scale(1);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap2Md = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    5.6% {
        transform: translateX(0) scale(1);
    }

    16.6% {
        transform: translateX(-24px) scale(1);
    }

    33.3% {
        transform: translateX(-24px) scale(1);
    }

    41.6% {
        transform: translateX(-12px) scale(2.5);
        filter: blur(0);
    }

    50% {
        transform: translateX(0) scale(1);
    }

    55.6% {
        transform: translateX(0) scale(1);
    }

    66.6% {
        transform: translateX(24px) scale(1);
    }

    83.3% {
        transform: translateX(24px) scale(1);
    }

    91.6% {
        transform: translateX(12px) scale(2.5);
        filter: blur(0);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap3Md = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    16.6% {
        transform: translateX(0) scale(1);
    }

    25% {
        transform: translateX(-12px) scale(2.5);
        filter: blur(0);
    }

    33.3% {
        transform: translateX(-24px) scale(1);
    }

    38.9% {
        transform: translateX(-24px) scale(1);
    }

    50% {
        transform: translateX(-48px) scale(1);
    }

    66.6% {
        transform: translateX(-48px) scale(1);
    }

    75% {
        transform: translateX(-36px) scale(2.5);
        filter: blur(0);
    }

    83.3% {
        transform: translateX(-24px) scale(1);
    }

    88.9% {
        transform: translateX(-24px) scale(1);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap1Lg = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    8.3% {
        transform: translateX(32px) scale(2.5);
        filter: blur(0);
    }

    16.6% {
        transform: translateX(48px) scale(1);
    }

    22.2% {
        transform: translateX(48px) scale(1);
    }

    33.3% {
        transform: translateX(96px) scale(1);
    }

    50% {
        transform: translateX(96px) scale(1);
    }

    58.3% {
        transform: translateX(80px) scale(2.5);
        filter: blur(0);
    }

    66.6% {
        transform: translateX(48px) scale(1);
    }

    72.2% {
        transform: translateX(48px) scale(1);
    }

    83.3% {
        transform: translateX(0) scale(1);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap2Lg = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    5.6% {
        transform: translateX(0) scale(1);
    }

    16.6% {
        transform: translateX(-48px) scale(1);
    }

    33.3% {
        transform: translateX(-48px) scale(1);
    }

    41.6% {
        transform: translateX(-32px) scale(2.5);
        filter: blur(0);
    }

    50% {
        transform: translateX(0) scale(1);
    }

    55.6% {
        transform: translateX(0) scale(1);
    }

    66.6% {
        transform: translateX(48px) scale(1);
    }

    83.3% {
        transform: translateX(48px) scale(1);
    }

    91.6% {
        transform: translateX(32px) scale(2.5);
        filter: blur(0);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swap3Lg = keyframes`
    0% {
        transform: translateX(0) scale(1);
    }

    16.6% {
        transform: translateX(0) scale(1);
    }

    25% {
        transform: translateX(-32px) scale(2.5);
        filter: blur(0);
    }

    33.3% {
        transform: translateX(-48px) scale(1);
    }

    38.9% {
        transform: translateX(-48px) scale(1);
    }

    50% {
        transform: translateX(-96px) scale(1);
    }

    66.6% {
        transform: translateX(-96px) scale(1);
    }

    75% {
        transform: translateX(-80px) scale(2.5);
        filter: blur(0);
    }

    83.3% {
        transform: translateX(-48px) scale(1);
    }

    88.9% {
        transform: translateX(-48px) scale(1);
    }

    100% {
        transform: translateX(0) scale(1);
    }
`

const swapKeyframesSizes = {
    sm: {
        child1: swap1Sm,
        child2: swap2Sm,
        child3: swap3Sm
    },
    md: {
        child1: swap1Md,
        child2: swap2Md,
        child3: swap3Md
    },
    lg: {
        child1: swap1Lg,
        child2: swap2Lg,
        child3: swap3Lg
    },
}

export const SwapLoaderThemeStyle = ({ size = 'md' }) => css`
    &:nth-child(1) {
        animation: ${swapKeyframesSizes[size].child1} 3.2s infinite linear;
    }

    &:nth-child(2) {
        animation: ${swapKeyframesSizes[size].child2} 3.2s infinite linear;
    }

    &:nth-child(3) {
        animation: ${swapKeyframesSizes[size].child3} 3.2s infinite linear;
    }
`

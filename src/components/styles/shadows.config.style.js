const SIZES = {
    xxs: 'xxs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl'
}

const SHADOWS = {
    common: '0px 1px 2px',
    xxs: '0px 2px 4px',
    xs: '0px 3px 6px',
    sm: '0px 4px 8px',
    md: '0px 8px 16px',
    lg: '0px 12px 24px',
    xl: '0px 18px 24px'
}

const makeShadow = (color, size = 'common') => `${SHADOWS[size]} ${color}`
const getShadow = (theme, size) => `${makeShadow(theme.firstShadow)}, ${makeShadow(theme.secondShadow, size)}`

export const xxsShadow = (theme) => getShadow(theme, SIZES.xxs)
export const xsShadow = (theme) => getShadow(theme, SIZES.xs)
export const smShadow = (theme) => getShadow(theme, SIZES.sm)
export const mdShadow = (theme) => getShadow(theme, SIZES.md)
export const lgShadow = (theme) => getShadow(theme, SIZES.lg)
export const xlShadow = (theme) => getShadow(theme, SIZES.xl)

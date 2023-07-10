export const makeMoneyMask = ({
    scale = 2,
    radix = ',',
    padFractionalZeros = true,
    thousandsSeparator = ' ',
    ...rest
} = {}) => ({
    mask: Number,
    scale,
    radix,
    padFractionalZeros,
    thousandsSeparator,
    ...rest
})

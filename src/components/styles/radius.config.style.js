import { css } from '@emotion/react'

import { baseX } from './semantic.config.style'

export const xsBorderRadius = `${baseX}px`
export const smBorderRadius = `${baseX * 2}px`
export const mdBorderRadius = `${baseX * 3}px`
export const lgBorderRadius = `${baseX * 4}px`

const BORDER_RADIUS = {
    xs: xsBorderRadius,
    sm: smBorderRadius,
    md: mdBorderRadius,
    lg: lgBorderRadius
}

export const borderRadius = ({ size = 'sm' }) => css`border-radius: ${BORDER_RADIUS[size] || BORDER_RADIUS.sm}`

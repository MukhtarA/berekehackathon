import { useTheme } from '@emotion/react'

import * as colors from '../styles/colors.config.style'

//                          ^[textToColor](color:colorToken)
const textColorRegEpx = /^\^\[([^\]]*)]\s*\(color:\s*([^)]+)\)/

export const textColorRule = (state, silent) => {

    // Where '^' is color markdown identifier
    if (state.src[state.pos] !== '^') {
        return false
    }

    const match = textColorRegEpx.exec(state.src.slice(state.pos))
    if (!match) {
        return false
    }

    // in silent mode it shouldn't output any tokens or modify pending
    if (!silent) {
        state.push({
            type: 'color',
            title: match[1],
            color: match[2],
            level: state.level
        })
    }

    // every rule should set state.pos to a position after token's contents
    state.pos += match[0].length

    return true
}

const getColors = (theme = {}) => ({
    brand: theme.brand,
    info: theme.info,
    inverse: theme.whitePrimary,
    primary: theme.primary,
    secondary: theme.secondary,
    tertiary: theme.tertiary,
    warning: theme.warning,
    white: theme.white,
    black: colors.black,
    critical: colors.red5,
    translucent: colors.white55A
})

export const textColorParcer = (tokens, idx) => {
    const { title, color } = tokens[idx]
    //TODO: WHAT??
    const markdownColors = getColors(() => useTheme())
    const textColor = markdownColors[color]

    return textColor ? `<span style="color: ${textColor};">${title}</span>` : title
}

import theme from '../styles/theme-colors'
const { LIGHT, DARK } = theme

export const themeCheck = () => {
    const lightTokens = Object.keys(LIGHT)
    const darkTokens = Object.keys(DARK)

    const undefinedDarkTokens = lightTokens
        .filter(tn => !darkTokens.includes(tn))

    const undefinedLightTokens = darkTokens
        .filter(tn => !lightTokens.includes(tn))

    if (undefinedLightTokens.length) {
        fail(`Test Error: Не хвататет токенов в Светлой теме:\n\t${undefinedLightTokens.join('\n\t')}`)
    }
    if (undefinedDarkTokens.length) {
        fail(`Test Error: Не хвататет токенов в Темной теме:\n\t${undefinedDarkTokens.join('\n\t')}`)
    }
}

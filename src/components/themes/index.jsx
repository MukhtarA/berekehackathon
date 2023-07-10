import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import themeColors from '@sbol/design-system/core/styles/theme-colors'

const MODES = {
    DARK: 'DARK',
    LIGHT: 'LIGHT'
}

export const ThemeModeContext = React.createContext({
    handleThemeChange: () => {},
    themeMode: MODES.LIGHT
})

export const DesignSystemProvider = ({ children, theme, onThemeChange, mode }) => {
    const handleThemeChange = useCallback(
        (value) => {
            if (onThemeChange) {
                onThemeChange(value)
            }
        },
        [onThemeChange]
    )

    const emotionCache = createCache({ key: 'web-sbol' })
    emotionCache.compat = true

    return (
        <ThemeModeContext.Provider
            value={{
                handleThemeChange,
                mode
            }}
        >
            <ThemeProvider theme={theme[mode]}>
                <CacheProvider value={emotionCache}>{children}</CacheProvider>
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}

DesignSystemProvider.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object,
    onThemeChange: PropTypes.func,
    mode: PropTypes.string
}

DesignSystemProvider.defaultProps = {
    theme: themeColors,
    onThemeChange: void 0,
    mode: MODES.LIGHT
}

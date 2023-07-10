export const getDisplayName = (Component, fallback = 'Component') =>
    Component.displayName ||
    Component.name ||
    (typeof Component === 'string' && Component.length > 0
        ? Component
        : fallback)

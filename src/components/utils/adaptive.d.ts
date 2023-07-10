declare module '@sbol/design-system/core/utils/adaptive' {
    // @types/lodash
    interface MapCache {
        delete(key: unknown): boolean
        get(key: unknown): unknown
        has(key: unknown): boolean
        set(key: unknown, value: unknown): this
        clear?: (() => void) | undefined
    }

    interface MemoizedFunction {
        cache: MapCache;
    }

    export const isTouchable: (() => boolean) & MemoizedFunction
    export const isNotTouchable: (() => boolean) & MemoizedFunction
    export const applyForTouchable: (value: string, defaultValue: string) => string

    /* Mobile | Desktop */
    export const isMobilePlatform: (() => boolean) & MemoizedFunction
    export const isMobile: (() => boolean) & MemoizedFunction
    export const isDesktopPlatform: (() => boolean) & MemoizedFunction

    /* IE */
    export const isIE: boolean
}

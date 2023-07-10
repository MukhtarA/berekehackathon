export const usePlatform = () => {
    const devices = [
        {
            device: 'Android',
            platform: /android/i,
            os: 'android'
        },
        {
            device: 'IPhone',
            platform: /iphone/i,
            os: 'ios'
        },
        {
            device: 'IPad',
            platform: /ipad/i,
            os: 'ios'
        }
    ]

    const platform = navigator.userAgent

    const getPlatform = () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const i in devices) {
            if (devices[i].platform.test(platform)) {
                return { device: devices[i].device, os: devices[i].os }
            }
        }

        return platform
    }

    return getPlatform()
}

/* eslint-disable babel/camelcase */
/* eslint-disable no-undefined */
import { useState, useEffect, useRef } from 'react'

import { MobileActions } from '../mobile-actions'

export const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Call handler right away so state gets updated with initial window size
        handleResize()

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    // Empty array ensures that effect is only run on mount

    return windowSize
}

export const usePrevious = (value) => {
    const ref = useRef()

    // Store current value in ref
    useEffect(() => {
        ref.current = value
    }, [value])

    // Return previous value (happens before update in useEffect above)
    return ref.current
}

export const useMobileConfigs = () => {
    const [mode, setMode] = useState('LIGHT')

    useEffect(() => {
        const mobileConfigs = window.Mobile?.getConfigs()

        if (mobileConfigs) {
            const { color_mode, authorization, bizone_antifraud, language, data } = JSON.parse(
                mobileConfigs
            )
            localStorage.setItem('access_token', authorization)
            localStorage.setItem('antifraud', bizone_antifraud)
            localStorage.setItem('language', language)
            localStorage.setItem('mobile_data', data)
            setMode(color_mode.toUpperCase())
        }
    }, [])

    return { mode }
}

export const useGeoLocation = () => {
    const [geoLocation, setGeoLocation] = useState({
        latitude: null,
        longitude: null
    })

    useEffect(() => {
        if (window.Mobile) {
            MobileActions.requestLocation()
        } else {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const crd = pos.coords

                    setGeoLocation({
                        latitude: String(crd.latitude),
                        longitude: String(crd.longitude)
                    })
                },
                () => window.onLocationResultDenied()
            )
        }
    }, [])

    window.onLocationResultDenied = () => {
        setGeoLocation({
            latitude: '1',
            longitude: '1'
        })
    }

    window.onLocationResult = (value) => {
        setGeoLocation({
            latitude: value.split(';')[0].split('=')[1],
            longitude: value.split(';')[1].split('=')[1]
        })
    }

    return geoLocation
}

export { useAgreementSignature } from './agreement-signature'

export { useDigitalSignature } from './digital-signature'

export { useSms } from './sms'

export { usePlatform } from './platform'

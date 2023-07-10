import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'

import { getAccessToken } from './helpers'

const CheckAuth = () => {
    const { pathname } = useLocation()
    const accessToken = getAccessToken()

    if (process.env.IGNORE_AUTH) {
        return null
    }

    if (accessToken && accessToken !== 'undefined') {
        if (pathname === '/login') {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { redirectUrl: pathname }
                    }}
                />
            )
        }

        return null
    }

    return pathname === '/login' ? null : (
        <Redirect
            to={{
                pathname: '/login',
                state: { redirectUrl: pathname }
            }}
        />
    )
}

export default CheckAuth

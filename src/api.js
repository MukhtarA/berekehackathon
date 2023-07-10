import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import _ from 'lodash'

import {
    getAccessToken,
    getAntiFraud,
    getLanguage,
    refreshAuthLogic
} from '@web_sbol/shared/src/components/auth/helpers'

const instance = axios.create({
    baseURL: `${process.env.SBOL_BACKEND_URL}`
})

instance.interceptors.request.use((request) => {
    request.headers['Accept-Language'] = getLanguage()
    request.headers.Authorization = `Bearer ${getAccessToken()}`
    request.headers.AntiFraud = getAntiFraud()

    return request
})

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (_.get(error, 'response.status') === 401) {
            return Promise.reject(error)
        }

        if (_.get(error, 'response.data.code')) {
            return Promise.reject(error.response.data)
        }

        if (error.response) {
            return Promise.reject(
                new Error(_.get(error, 'response.data.message', error.response.statusText))
            )
        }

        return Promise.reject(error)
    }
)

instance.CancelToken = axios.CancelToken

const tokenReceivedEvent = new CustomEvent('onTokenResult')

window.onTokenResult = async (accessToken) => {
    localStorage.setItem('access_token', accessToken)
    window.dispatchEvent(tokenReceivedEvent)
}

createAuthRefreshInterceptor(instance, refreshAuthLogic)

export default instance

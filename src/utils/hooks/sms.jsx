import { useReducer, useCallback, useMemo } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'pending':
            return { status: 'loading', data: null, error: null }
        case 'fulfilled':
            return { status: 'succeeded', data: action.payload, error: null }
        case 'rejected':
            return { status: 'failed', data: null, error: action.error.message }
        default:
            return state
    }
}

const initialCount = {
    status: 'IDLE',
    data: null,
    error: null
}

export function useSms(axiosInstance, internalToken, initiator) {
    const [stateGetSms, dispatchGetSms] = useReducer(reducer, initialCount)
    const [stateAcceptSms, dispatchAccept] = useReducer(reducer, initialCount)
    const config = useMemo(
        () => ({
            headers: {
                'X-Authorization-Internal': internalToken
            }
        }),
        [internalToken]
    )

    const getSmsCode = useCallback(async () => {
        dispatchGetSms({ type: 'pending' })

        try {
            const response = await axiosInstance.post(
                '/communication/api-gw-internal/services/sms-notifications-communication/api/v1/send/code',
                {
                    initiator
                },
                config
            )

            if (response.status === 200) {
                dispatchGetSms({ type: 'fulfilled', payload: response.data })
            }
        } catch (error) {
            dispatchGetSms({ type: 'rejected', error })
        }
    }, [axiosInstance, config, initiator])

    const acceptSmsCode = useCallback(
        async (smsCode) => {
            dispatchAccept({ type: 'pending' })

            try {
                const response = await axiosInstance.post(
                    '/communication/api-gw-internal/services/sms-notifications-communication/api/v1/accept/code',
                    {
                        code: smsCode
                    },
                    config
                )

                if (response.status === 200) {
                    dispatchAccept({ type: 'fulfilled', payload: response.data })
                }
            } catch (error) {
                dispatchAccept({ type: 'rejected', error })
            }
        },
        [axiosInstance, config]
    )

    return {
        stateGetSms,
        stateAcceptSms,
        getSmsCode,
        acceptSmsCode
    }
}

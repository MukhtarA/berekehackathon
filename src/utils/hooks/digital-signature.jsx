import { useCallback, useReducer } from 'react'
import _ from 'lodash'

import { LOADING, SUCCEEDED, FAILED } from '../../constants/status'

function reducer(state, action) {
    switch (action.type) {
        case 'pending':
            return { status: LOADING, data: null, error: null }
        case 'fulfilled':
            return { status: SUCCEEDED, data: action.payload, error: null }
        case 'rejected':
            return { status: FAILED, data: null, error: action.error.message }
        default:
            return state
    }
}

const initialCount = {
    status: 'idle',
    data: null,
    error: null
}

export function useDigitalSignature(axiosInstance) {
    const [stateCheckEds, dispatchCheckEds] = useReducer(reducer, initialCount)
    const [stateCreateEds, dispatchCreateEds] = useReducer(reducer, initialCount)
    const [statePreapproveEds, dispatchPreapproveEds] = useReducer(reducer, initialCount)
    const [stateApproveEds, dispatchApproveEds] = useReducer(reducer, initialCount)
    const [stateRevokeEds, dispatchRevokeEds] = useReducer(reducer, initialCount)

    const checkEds = useCallback(async () => {
        dispatchCheckEds({ type: 'pending' })

        try {
            const response = await axiosInstance.get('communication/ecp/api/v1/check?type=physical')

            if (_.includes(response.data.msg, 'ECP exist')) {
                dispatchCheckEds({ type: 'fulfilled', payload: true })
            } else {
                dispatchCheckEds({ type: 'fulfilled', payload: false })
            }
        } catch (error) {
            dispatchCheckEds({ type: 'rejected', error })
        }
    }, [axiosInstance])

    const createEds = useCallback(
        async (latitude, longitude) => {
            dispatchCreateEds({ type: 'pending' })

            try {
                const response = await axiosInstance.post(
                    'communication/ecp/api/v1/create?type=physical',
                    {
                        latitude,
                        longitude
                    }
                )

                if (response.status === 200) {
                    dispatchCreateEds({ type: 'fulfilled', payload: response.data })
                }
            } catch (error) {
                dispatchCreateEds({ type: 'rejected', error })
            }
        },
        [axiosInstance]
    )

    const preapproveEds = useCallback(
        async (data) => {
            dispatchPreapproveEds({ type: 'pending' })

            try {
                const { digest, link } = data || _.get(stateCreateEds, 'data')
                const response = await axiosInstance.post(
                    '/communication/ecp/api/v1/preapprove?type=physical',
                    {
                        digest,
                        link
                    }
                )

                if (response.status === 200) {
                    dispatchPreapproveEds({ type: 'fulfilled', payload: response.data })
                }
            } catch (error) {
                dispatchPreapproveEds({ type: 'rejected', error })
            }
        },
        [axiosInstance, stateCreateEds]
    )

    const approveEds = useCallback(
        async (smsCode, data) => {
            dispatchApproveEds({ type: 'pending' })

            try {
                const { opId, opIdBank } = data || _.get(statePreapproveEds, 'data')
                const response = await axiosInstance.post('cert/api/v1/approvecert', {
                    approve_code: smsCode,
                    op_id: opId
                    // opIdBank
                })

                if (response.status === 200) {
                    dispatchApproveEds({ type: 'fulfilled', payload: response.data })
                }
            } catch (error) {
                dispatchApproveEds({ type: 'rejected', error })
            }
        },
        [axiosInstance, statePreapproveEds]
    )

    const revokeEds = useCallback(async () => {
        dispatchRevokeEds({ type: 'pending' })

        try {
            const response = await axiosInstance.get(
                'communication/ecp/api/v1/revoke?type=physical'
            )

            if (response.status === 200) {
                dispatchRevokeEds({ type: 'fulfilled', payload: response.data })
            }
        } catch (error) {
            dispatchRevokeEds({ type: 'rejected', error })
        }
    }, [axiosInstance])

    return {
        stateCheckEds,
        stateCreateEds,
        statePreapproveEds,
        stateApproveEds,
        stateRevokeEds,
        checkEds,
        createEds,
        preapproveEds,
        approveEds,
        revokeEds
    }
}

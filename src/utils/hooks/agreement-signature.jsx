import { useReducer, useCallback } from 'react'
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
    status: 'IDLE',
    data: null,
    error: null
}

export function useAgreementSignature(axiosInstance) {
    const [stateCheckAgreement, dispatchCheck] = useReducer(reducer, initialCount)
    const [stateCreateAgreement, dispatchCreate] = useReducer(reducer, initialCount)
    const [statePreapproveAgreement, dispatchPreapprove] = useReducer(reducer, initialCount)
    const [stateApproveAgreement, dispatchApprove] = useReducer(reducer, initialCount)

    const checkAgreement = useCallback(async () => {
        dispatchCheck({ type: 'pending' })

        try {
            const response = await axiosInstance.get(
                'communication/ecp/api/v1/agreement/check?type=physical'
            )

            if (_.includes(response.data.info, 'Consent signed')) {
                dispatchCheck({ type: 'fulfilled', payload: true })
            } else {
                dispatchCheck({ type: 'fulfilled', payload: false })
            }
        } catch (error) {
            dispatchCheck({ type: 'rejected', error })
        }
    }, [axiosInstance])

    const createAgreement = useCallback(async () => {
        dispatchCreate({ type: 'pending' })

        try {
            const response = await axiosInstance.get(
                '/communication/ecp/api/v1/agreement?type=physical'
            )

            if (response.status === 200) {
                dispatchCreate({ type: 'fulfilled', payload: response.data })
            }
        } catch (error) {
            dispatchCreate({ type: 'rejected', error })
        }
    }, [axiosInstance])

    const approveAgreement = useCallback(
        async (smsCode, data) => {
            dispatchApprove({ type: 'pending' })

            try {
                const { opId, opIdBank } = data || _.get(statePreapproveAgreement, 'data')
                const response = await axiosInstance.post(
                    'communication/ecp/api/v1/approve?type=physical',
                    {
                        approveCode: smsCode,
                        opId,
                        opIdBank
                    }
                )

                if (response.status === 200) {
                    dispatchApprove({ type: 'fulfilled', payload: response.data })
                }
            } catch (error) {
                dispatchApprove({ type: 'rejected', error })
            }
        },
        [statePreapproveAgreement.data, axiosInstance]
    )

    const preapproveAgreement = useCallback(
        async (data) => {
            dispatchPreapprove({ type: 'pending' })

            try {
                const { digest, link } = data || _.get(stateCreateAgreement, 'data')
                const response = await axiosInstance.post(
                    'communication/ecp/api/v1/preapprove?type=physical',
                    {
                        digest,
                        link
                    }
                )

                if (response.status === 200) {
                    dispatchPreapprove({ type: 'fulfilled', payload: response.data })
                }
            } catch (error) {
                dispatchApprove({ type: 'rejected', error })
            }
        },
        [stateCreateAgreement, axiosInstance]
    )

    return {
        stateCheckAgreement,
        stateCreateAgreement,
        stateApproveAgreement,
        statePreapproveAgreement,
        checkAgreement,
        createAgreement,
        approveAgreement,
        preapproveAgreement
    }
}

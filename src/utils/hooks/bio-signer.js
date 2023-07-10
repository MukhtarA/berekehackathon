import { useCallback } from 'react'
import { MobileActions } from '@web_sbol/shared/src/utils/mobile-actions'
import { requestId } from '@web_sbol/shared/src/utils'

export const useBioSigner = ({ processId, onResult, onDenied }) => {
    window.onSignerBioResult = onResult

    window.onSignerBioDenied = onDenied

    return useCallback((data) => MobileActions.openSignerBio(requestId(), processId, data), [
        processId
    ])
}

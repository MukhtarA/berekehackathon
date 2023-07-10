import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ScreenLayout } from '../../screen-layout'
import { LoaderText } from '../../loader'
import { useBioSigner } from '../../../utils/hooks/bio-signer'

export const BioSigner = ({ onSucceed, onRejected, documents, processId = 1 }) => {
    const { t } = useTranslation('shared')

    const onResult = useCallback(
        (correlationId, requestID) => {
            console.log('success onResult', correlationId, requestID)
            onSucceed({ correlationId, requestID, signedDocs: documents })
        },
        [onSucceed]
    )

    const onDenied = useCallback(
        (correlationId, denyType) => {
            console.log(`onDeny deny-type=${denyType}, corId=${correlationId}`)
            onRejected(denyType)
        },
        [onRejected]
    )

    const sign = useBioSigner({ processId, onResult, onDenied })

    useEffect(() => {
        sign(JSON.stringify(documents))
    }, [sign, documents, processId])

    return (
        <ScreenLayout>
            <LoaderText texts={[{ text: t('bioEds.signing') }]} />
        </ScreenLayout>
    )
}

BioSigner.propTypes = {
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            docId: PropTypes.string.isRequired,
            file_name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            type_id: PropTypes.string,
            signType: PropTypes.string.isRequired,
            sha: PropTypes.string
        })
    ).isRequired,
    onSucceed: PropTypes.func.isRequired,
    processId: PropTypes.number.isRequired,
    onRejected: PropTypes.func
}

BioSigner.defaultProps = {
    onRejected: () => {}
}

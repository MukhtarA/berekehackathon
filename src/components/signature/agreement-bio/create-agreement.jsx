import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { ScreenLayout } from '../../screen-layout'
import { LoaderText } from '../../loader'
import api from '../../../api'

const createAgreement = () => {
    return api.get('/communication/ecp/api/v1/agreement?type=physical')
}

export const CreateAgreement = ({ children }) => {
    const { t } = useTranslation('shared')
    const [signData, setSignData] = useState()

    const create = useCallback(async (unmounted) => {
        const createResponse = await createAgreement()

        if (unmounted) {
            return
        }

        if (createResponse.status !== 200) {
            console.log('agreement not created')

            return
        }

        setSignData(createResponse?.data)
    }, [])

    useEffect(() => {
        let unmounted = false
        create(unmounted)

        return () => {
            unmounted = true
        }
    }, [create])

    if (!signData) {
        return (
            <ScreenLayout>
                <LoaderText texts={[{ text: t('bioEds.creatingAgreement') }]} />
            </ScreenLayout>
        )
    }

    const documents = [
        {
            docId: signData?.link,
            sha: signData?.digest,
            type: t('bioEds.agreement'),
            file_name: `${signData?.link}.pdf`,
            type_id: '', // '0d5a59b6-83f2-4037-9c62-3d3bce8d2e72',
            signType: 'clientBank'
        }
    ]

    return children(documents)
}

CreateAgreement.propTypes = {
    children: PropTypes.func.isRequired,
    loading: PropTypes.bool
}

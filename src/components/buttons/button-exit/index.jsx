import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ButtonPrimary, ButtonSecondary } from '@sbol/design-system/core/button'

import { MobileActions } from '@web_sbol/shared/src/utils/mobile-actions'

export const ButtonExit = ({ isPrimary, ...props }) => {
    const { t } = useTranslation()

    const handleExit = useCallback(() => {
        MobileActions.exit()
    }, [])

    const Btn = isPrimary ? ButtonPrimary : ButtonSecondary

    return <Btn title={t('button.backHome')} fullWidth onClick={handleExit} {...props} />
}

ButtonExit.propTypes = {
    isPrimary: PropTypes.bool
}

ButtonExit.defaultProps = {
    isPrimary: false
}

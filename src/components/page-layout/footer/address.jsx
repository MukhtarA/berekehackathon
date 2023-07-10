import React from 'react'
import { useTranslation } from 'react-i18next'

import { AddressStyled, AddressLineStyled } from './footer.style'

export default () => {
    const { t } = useTranslation('shared')
    const year = new Date().getFullYear()

    return (
        <AddressStyled>
            <AddressLineStyled colorScheme="white">
                {t('layout.address1', { year })}
            </AddressLineStyled>
            <AddressLineStyled colorScheme="white">{t('layout.address2')}</AddressLineStyled>
            <AddressLineStyled colorScheme="white">{t('layout.license')}</AddressLineStyled>
        </AddressStyled>
    )
}

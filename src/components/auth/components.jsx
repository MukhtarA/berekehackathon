/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-literals */
import React from 'react'
import PropTypes from 'prop-types'
import { Trans, useTranslation } from 'react-i18next'
import { Headline4 } from '../typography'

import {
    BackLinkStyled,
    InfoTextStyled,
    MobileLinksWrapper,
    MobileLinksDescriptionStyled,
    MobileLinksStyled
} from './style'

import { getLanguage } from './helpers'
import androidRu from './assets/android-ru.svg'
import appGalleryRu from './assets/app-gallery-ru.svg'
import androidKk from './assets/android-kk.svg'
import appGalleryKk from './assets/app-gallery-kk.svg'
import androidEn from './assets/android-en.svg'
import appGalleryEn from './assets/app-gallery-en.svg'

export const InfoBlock = ({ error, text }) => {
    if (!text && !error) {
        return null
    }

    return (
        <InfoTextStyled colorScheme={error ? 'warning' : 'secondary'}>
            {error || text}
        </InfoTextStyled>
    )
}

InfoBlock.propTypes = {
    error: PropTypes.string,
    text: PropTypes.string
}

InfoBlock.defaultProps = {
    text: '',
    error: ''
}

export const BackLink = ({ onClick }) => {
    const { t } = useTranslation('shared')

    return (
        <BackLinkStyled
            title={t('navigation.cancelAndBack')}
            iconName="icon:core/common/ic24ChevronLeft"
            onClick={onClick}
        />
    )
}

BackLink.propTypes = {
    onClick: PropTypes.func.isRequired
}

export const MobileLinks = () => {
    const { t } = useTranslation('shared')

    const localizedLogoHandler = (mobileType) => {
        let android
        let huawei
        switch (getLanguage()) {
            case 'kk':
                android = androidKk
                huawei = appGalleryKk
                break
            case 'en':
                android = androidEn
                huawei = appGalleryEn
                break
            default:
                android = androidRu
                huawei = appGalleryRu
        }

        return mobileType === 'android' ? android : huawei
    }

    return (
        <MobileLinksWrapper>
            <Headline4 indent="zero">{t('auth.becomeClient')}</Headline4>
            <MobileLinksDescriptionStyled>
                <Trans i18nKey="shared:auth.becomeClientDescription">
                    Скачайте приложение на свое устройство
                    <br /> и станьте клиентом Bereke Bank за пару минут
                </Trans>
            </MobileLinksDescriptionStyled>
            <MobileLinksStyled>
                {/*<a*/}
                {/*    dangerouslySetInnerHTML={{ __html: appStore }}*/}
                {/*    href="https://apps.apple.com/ru/app/sberbank-kz/id1540248822"*/}
                {/*    target="_blank"*/}
                {/*    rel="noreferrer"*/}
                {/*/>*/}
                <a
                    dangerouslySetInnerHTML={{ __html: localizedLogoHandler('android') }}
                    href="https://play.google.com/store/apps/details?id=kz.berekebank.mobile.app"
                    target="_blank"
                    rel="noreferrer"
                />
                <a
                    dangerouslySetInnerHTML={{ __html: localizedLogoHandler('huawei') }}
                    href="https://appgallery.cloud.huawei.com/ag/n/app/C107205041"
                    target="_blank"
                    rel="noreferrer"
                />
            </MobileLinksStyled>
        </MobileLinksWrapper>
    )
}

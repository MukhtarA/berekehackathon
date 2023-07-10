/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-literals */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@sbol/design-system/core/menu'
import { Body1 } from '@sbol/design-system/core/typography'
import { ic24ChevronDown } from '@sbol/design-system/core/icon/common'

import { Grid, Cell } from '../../grid'
import { getLanguage } from '../../auth/helpers'
import { Footer } from '../../page-layout/footer'
import { LogoIconStyled } from '../../page-layout/header/header.style'
import {
    ParkingPageStyled,
    ContentStyled,
    HeaderStyled,
    HeaderWrapperStyled,
    PhoneLabelStyled,
    PhoneStyled,
    MenuStyled,
    HeadlineStyled,
    MobileLinksStyled,
    ImageStyled
} from './style'

import logoIcon from '../../page-layout/assets/logo.svg'
import androidRu from '../../auth/assets/android-ru.svg'
import appGalleryRu from '../../auth/assets/app-gallery-ru.svg'
import androidKk from '../../auth/assets/android-kk.svg'
import appGalleryKk from '../../auth/assets/app-gallery-kk.svg'
import androidEn from '../../auth/assets/android-en.svg'
import appGalleryEn from '../../auth/assets/app-gallery-en.svg'
import picture from '../assets/picture.png'

const Header = () => {
    const { t } = useTranslation('shared')

    return (
        <HeaderStyled>
            <Grid>
                <Cell lg={58} md={38} sm={23}>
                    <HeaderWrapperStyled>
                        <LogoIconStyled
                            to="/"
                            title={t('layout.pageTitle')}
                            aria-label={t('layout.pageTitle')}
                            dangerouslySetInnerHTML={{ __html: logoIcon }}
                        />
                        <PhoneLabelStyled colorScheme="tertiary">
                            {t('auth.helpLabel')}
                        </PhoneLabelStyled>
                        <PhoneStyled>{t('auth.phone1')}</PhoneStyled>
                        <PhoneStyled>{t('auth.phone2')}</PhoneStyled>
                        <PhoneStyled>{t('auth.phone3')}</PhoneStyled>
                        <MenuStyled
                            id="profile-menu"
                            title="РУ"
                            a11y={{ title: 'РУ' }}
                            mode="click"
                            icon={ic24ChevronDown}
                        >
                            <MenuItem title="Русский" />
                            <MenuItem title="English" />
                        </MenuStyled>
                    </HeaderWrapperStyled>
                </Cell>
            </Grid>
        </HeaderStyled>
    )
}

export default () => {
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
        <ParkingPageStyled>
            <ContentStyled>
                <Header />
                <Grid>
                    <Cell lg={38} md={38} sm={23}>
                        <HeadlineStyled>Сайт на реконструкции ...</HeadlineStyled>
                        <Body1 colorScheme="tertiary">
                            В настоящее время, мы ведем работу по обновлению сайта. Для продолжения
                            работы в онлайн–банкинге, вы сможете скачать мобильное приложение по
                            ссылке ниже. По другим вопросам, свяжитесь с нами через контактные
                            данные выше
                        </Body1>
                        <Body1 fontWeight="semibold">Ссылки на скачинвания приложения:</Body1>
                        <MobileLinksStyled>
                            {/* <a
                                dangerouslySetInnerHTML={{ __html: appStore }}
                                href="https://apps.apple.com/ru/app/sberbank-kz/id1540248822"
                                target="_blank"
                                rel="noreferrer"
                            /> */}
                            <a
                                dangerouslySetInnerHTML={{
                                    __html: localizedLogoHandler('android')
                                }}
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
                            <ImageStyled src={picture} />
                        </MobileLinksStyled>
                    </Cell>
                    <Cell lg={20} md={0} sm={0} />
                </Grid>
            </ContentStyled>
            <Footer />
        </ParkingPageStyled>
    )
}

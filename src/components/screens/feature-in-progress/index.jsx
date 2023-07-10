import React from 'react'
import { useTranslation } from 'react-i18next'
import { Body1 } from '@sbol/design-system/core/typography'

import { PageLayout } from '../../page-layout'
import { Cell, Grid } from '../../grid'
import { BackButton } from '../../buttons'
import develop from '../assets/picture.png'
import { ImgStyled, HeadlineStyled, LinksStyled, MobileLinkStyled } from '../style'
import { getLanguage } from '../../auth'

import androidRu from '../../auth/assets/android-ru.svg'
import appGalleryRu from '../../auth/assets/app-gallery-ru.svg'
import androidKk from '../../auth/assets/android-kk.svg'
import appGalleryKk from '../../auth/assets/app-gallery-kk.svg'
import androidEn from '../../auth/assets/android-en.svg'
import appGalleryEn from '../../auth/assets/app-gallery-en.svg'

export const FeatureInProgress = () => {
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
        <PageLayout>
            <PageLayout.Header>
                <br />
                <Grid>
                    <Cell lg={34} md={34} sm={23}>
                        <BackButton />
                        <HeadlineStyled indent="zero">{t('wip.title')}</HeadlineStyled>
                        <Body1 colorScheme="tertiary">{t('wip.description')}</Body1>
                        <Body1 fontWeight="semibold">{t('wip.links.title')}</Body1>
                        <LinksStyled>
                            {/* <MobileLinkStyled
                                dangerouslySetInnerHTML={{ __html: appStore }}
                                href="https://apps.apple.com/ru/app/sberbank-kz/id1540248822"
                                target="_blank"
                                rel="noreferrer"
                            /> */}
                            <MobileLinkStyled
                                dangerouslySetInnerHTML={{
                                    __html: localizedLogoHandler('android')
                                }}
                                href="https://play.google.com/store/apps/details?id=kz.berekebank.mobile.app"
                                target="_blank"
                                rel="noreferrer"
                            />
                            <MobileLinkStyled
                                dangerouslySetInnerHTML={{ __html: localizedLogoHandler('huawei') }}
                                href="https://appgallery.cloud.huawei.com/ag/n/app/C107205041"
                                target="_blank"
                                rel="noreferrer"
                            />
                        </LinksStyled>
                    </Cell>
                    <Cell lg={24} md={24} sm={23}>
                        <ImgStyled src={develop} alt="in-progress" />
                    </Cell>
                </Grid>
            </PageLayout.Header>
        </PageLayout>
    )
}

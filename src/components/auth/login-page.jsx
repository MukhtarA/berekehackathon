/* eslint-disable react/jsx-no-literals */
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Body1 } from '@sbol/design-system/core/typography'

import { Grid, Cell } from '../grid'
import { Footer } from '../page-layout/footer'
import LoginForm from './login-form'
import { LogoIconStyled, EnvLabelStyled } from '../page-layout/header/header.style'
import LanguageMenu from '../language-menu'
import { Carousel, CarouselItem } from '../carousel-slider'
import {
    LoginPageStyled,
    ContentStyled,
    GradientBackgroundStyled,
    HeaderStyled,
    HeaderWrapperStyled,
    PhoneLabelStyled,
    PhoneStyled,
    HeadlineStyled,
    WhiteBtnStyled,
    LinkStyled,
    ButtonStyled
} from './style'

import logoIcon from './assets/logo.svg'

export const Header = () => {
    const { t } = useTranslation('shared')

    // if (window.location.host === 'banking.sberbank.kz') {
    //     window.location.href = _.replace(
    //         window.location.href,
    //         'banking.sberbank.kz',
    //         'banking.berekebank.kz'
    //     )
    // }

    return (
        <HeaderStyled>
            <Grid>
                <Cell lg={58} md={38} sm={23}>
                    <HeaderWrapperStyled>
                        <LogoIconStyled
                            loginPage
                            to="/"
                            title={t('layout.pageTitle')}
                            aria-label={t('layout.pageTitle')}
                            dangerouslySetInnerHTML={{ __html: logoIcon }}
                        />
                        {process.env.ENVIRONMENT !== 'prom' && (
                            <EnvLabelStyled login>
                                {process.env.ENVIRONMENT === 'development'
                                    ? '.dev'
                                    : `.${process.env.ENVIRONMENT}`}
                            </EnvLabelStyled>
                        )}
                        <PhoneLabelStyled colorScheme="whiteSecondary">
                            {t('auth.helpLabel')}
                        </PhoneLabelStyled>
                        <PhoneStyled>{t('auth.phone1')}</PhoneStyled>
                        <PhoneStyled>{t('auth.phone3')}</PhoneStyled>
                        <LanguageMenu isWhite />
                    </HeaderWrapperStyled>
                </Cell>
            </Grid>
        </HeaderStyled>
    )
}

export const CarouselBlock = () => {
    const { t } = useTranslation(['common', 'shared'])

    return (
        <Carousel autoplay>
            <CarouselItem>
                <div>
                    <HeadlineStyled>{t('shared:auth.headlineTitle')}</HeadlineStyled>
                    <Body1 colorScheme="white" verticalMargin="zero">
                        <Trans i18nKey="shared:auth.headlineSubtitle">
                            Осуществляйте платежи и переводы <br /> Быстро и легко!
                        </Trans>
                    </Body1>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div>
                    <HeadlineStyled>{t('shared:auth.headline2Title')}</HeadlineStyled>
                    <Body1 colorScheme="white" verticalMargin="zero">
                        <Trans i18nKey="shared:auth.headline2Subtitle">
                            Получите результат за секунду
                        </Trans>
                    </Body1>
                    <WhiteBtnStyled
                        title={t('shared:navigation.checkDocs')}
                        to="/utility/check-docs"
                    />
                </div>
            </CarouselItem>
        </Carousel>
    )
}

export default () => {
    const { t } = useTranslation('shared')

    return (
        <LoginPageStyled>
            <GradientBackgroundStyled />
            <ContentStyled>
                <div style={{ zIndex: 1 }}>
                    <Header />
                    <Grid>
                        <Cell lg={28} md={20} sm={23}>
                            <LoginForm />
                            {/* <LinkStyled
                                href="https://www.sberbank.kz/ru/pincode"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <ButtonStyled title={t('auth.pin')} />
                            </LinkStyled> */}
                        </Cell>
                        <Cell lg={26} offsetLg={4} md={16} offsetMd={2} sm={23}>
                            <CarouselBlock />
                        </Cell>
                    </Grid>
                </div>
            </ContentStyled>
            <Footer />
        </LoginPageStyled>
    )
}

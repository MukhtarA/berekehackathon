import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Body2 } from '@sbol/design-system/core/typography'
import { Loader } from '@sbol/design-system/core/loader'
import { Alert, AlertDescription, AlertTitle } from '@sbol/design-system/core/alert'

import { setRequisites } from '@web_sbol/payments-kz/src/features/payment/slice'
import { clearTempData } from '@web_sbol/payments-kz/src/features/temp/slice'
import { PageLayout } from '../../page-layout'
import { Offers } from '../../offers'
import { StatusStep } from './status-step'
import { ValueView } from './value-view'
import {
    StatusScreenStyled,
    ImageStyled,
    HeadlineStyled,
    HeadlineTextStyled,
    IconStyled,
    OffersWrapperStyled,
    TableTitleStyled,
    RowStyled,
    ButtonStyled,
    LinkStyled,
    InnerActionButton,
    AlertWrapperStyled
} from './style'

import maleSuccess from '../assets/male-success.png'
import maleError from '../assets/male-error.png'
import maleWaiting from '../assets/male-waiting.png'

const picsNames = {
    success: maleSuccess,
    supplierCreated: maleSuccess,
    error: maleError,
    failed: maleError,
    waiting: maleWaiting,
    async: maleWaiting
}

const iconNames = {
    success: 'icon:core/common/ic24CheckmarkCircle',
    supplierCreated: 'icon:core/common/ic24CheckmarkCircle',
    info: 'icon:core/common/ic24InfoCircle',
    error: 'icon:core/common/ic24CrossCircle',
    failed: 'icon:core/common/ic24CrossCircle',
    waiting: 'icon:core/common/ic24StatusWaiting',
    async: 'icon:core/common/ic24StatusWaiting'
}

export const StatusScreen = ({
    headline,
    steps,
    offers,
    tableTitle,
    rows,
    status,
    buttonTitle,
    buttonLink,
    goBackLink,
    offerIsLoading,
    goBackToPrevStep
}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { t } = useTranslation('shared')
    const providerId = useSelector((state) => state.simplePayment.requisites.data?.providerId)
    const tempData = useSelector((state) => state.temp.data)
    const { isDeeplink, requisites, path } = tempData || {}

    const handleGoBack = useCallback(() => {
        history.goBack()
    }, [history])

    const handleInnerAction = useCallback(
        (actionType) => {
            if (actionType === 'TO_LOAN_HISTORY_APPLICATIONS') {
                return () => history.push(`/payments-kz/pkb-history/${providerId}`)
            }

            return void 0
        },
        [history, providerId]
    )

    const handleGoToPrevStep = async () => {
        await dispatch(setRequisites(requisites))
        await history.push(path)
        await dispatch(clearTempData())
    }

    return (
        <PageLayout status={status}>
            <PageLayout.Header noPadding>
                <StatusScreenStyled>
                    <ImageStyled src={picsNames[status]} />
                    <HeadlineStyled>
                        <IconStyled mode={status} name={iconNames[status]} />
                        <HeadlineTextStyled indent="zero" fontWeight="semibold">
                            {headline}
                        </HeadlineTextStyled>
                    </HeadlineStyled>
                    {steps.map(({ ...props }) => (
                        <StatusStep key={_.uniqueId()} mode={status} {...props} />
                    ))}
                    <OffersWrapperStyled>
                        <Offers>
                            {offers.map((offer) => {
                                if (offerIsLoading === 'loading') {
                                    return <Loader />
                                } else if (offerIsLoading === 'failed') {
                                    return (
                                        <>
                                            <Offers.Offer key={_.uniqueId()} {...offer} />
                                            <Alert mode="warning">
                                                <AlertTitle>{t('offer.error.title')}</AlertTitle>
                                                <AlertDescription>
                                                    {t('offer.error.description')}
                                                </AlertDescription>
                                            </Alert>
                                        </>
                                    )
                                } else if (offer?.actionType === 'INFO_BANNER') {
                                    return (
                                        <AlertWrapperStyled>
                                            <Alert mode="info">
                                                <AlertTitle>{offer?.title}</AlertTitle>
                                                <AlertDescription>
                                                    {offer?.description}
                                                </AlertDescription>
                                                {offer.innerActionName && (
                                                    <InnerActionButton
                                                        onClick={handleInnerAction(
                                                            offer.innerActionType
                                                        )}
                                                    >
                                                        {offer.innerActionName}
                                                    </InnerActionButton>
                                                )}
                                            </Alert>
                                        </AlertWrapperStyled>
                                    )
                                }

                                return <Offers.Offer key={_.uniqueId()} {...offer} />
                            })}
                        </Offers>
                    </OffersWrapperStyled>
                </StatusScreenStyled>
            </PageLayout.Header>
            {tableTitle && (
                <PageLayout.Content>
                    <TableTitleStyled fontWeight="semibold">{tableTitle}</TableTitleStyled>
                    {rows.map(
                        ({ title, value, type }) =>
                            value && (
                                <RowStyled key={_.uniqueId()}>
                                    <Body2 colorScheme="tertiary" verticalMargin="zero">
                                        {title}
                                    </Body2>
                                    <ValueView value={value} type={type} />
                                </RowStyled>
                            )
                    )}
                    {goBackLink && (
                        <ButtonStyled onClick={handleGoBack} fullWidth title={buttonTitle} />
                    )}
                    {buttonLink && !isDeeplink && (
                        <LinkStyled to={buttonLink}>
                            <ButtonStyled fullWidth title={buttonTitle} />
                        </LinkStyled>
                    )}
                    {isDeeplink && (
                        <ButtonStyled
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={handleGoToPrevStep}
                            fullWidth
                            title={goBackToPrevStep}
                        />
                    )}
                </PageLayout.Content>
            )}
        </PageLayout>
    )
}

StatusScreen.propTypes = {
    headline: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['success', 'info', 'waiting', 'error', 'async']),
    steps: PropTypes.arrayOf(PropTypes.shape).isRequired,
    buttonTitle: PropTypes.string,
    buttonLink: PropTypes.string,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            iconName: PropTypes.string,
            onClick: PropTypes.func,
            pinned: PropTypes.bool
        })
    ),
    tableTitle: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.shape),
    goBackLink: PropTypes.bool,
    offerIsLoading: PropTypes.string,
    goBackToPrevStep: PropTypes.string
}

StatusScreen.defaultProps = {
    status: 'success',
    offers: [],
    rows: [],
    tableTitle: null,
    buttonTitle: null,
    buttonLink: null,
    goBackLink: false,
    offerIsLoading: null,
    goBackToPrevStep: ''
}

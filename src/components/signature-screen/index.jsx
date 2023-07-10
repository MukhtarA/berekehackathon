import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import { Headline4, Typography, Caption } from '@sbol/design-system/core/typography'
import { ButtonPrimary, ButtonSecondary } from '@sbol/design-system/core/button'
import Checkbox from '@sbol/design-system/core/selection/checkbox/checkbox'

import { Modal } from '@web_sbol/shared/src/components/modal'
import { MobileActions } from '@web_sbol/shared/src/utils/mobile-actions'
import { ImgMarginStyled, ImgStyled, CheckboxWrapperStyled, CaptionWrapperStyled } from './style'

import shieldCheckedPng from '../../assets/shield-checked.png'

export const SignatureScreen = ({
    headerTitle,
    agreementTitle,
    agreement,
    title,
    description,
    img,
    ImgComponent,
    documentLink,
    documentTitle,
    buttonAgreementTitle,
    loader,
    signButtonTitle,
    onSign,
    onAgreement,
    ...rest
}) => {
    const [isSelected, setIsSelected] = useState(agreement)
    const signButtonBaseAttributes = { title: signButtonTitle, loading: loader, fullWidth: true }

    window.onPdfConfirmResult = () => {
        setIsSelected(true)
    }

    const onChange = useCallback(() => {
        if (onAgreement) {
            setIsSelected((prev) => {
                onAgreement(!prev)

                return !prev
            })
        }
    }, [onAgreement])

    const handleLinkClick = useCallback(() => {
        MobileActions.showPdf(documentLink, documentTitle, 1, true, buttonAgreementTitle)
    }, [documentLink, documentTitle, buttonAgreementTitle])

    return (
        <Modal
            fullHeight
            title={headerTitle}
            iconName="icon:core/common/ic24Cross"
            footer={
                <>
                    <CheckboxWrapperStyled>
                        <Checkbox checked={isSelected} verticalMargin="zero" onChange={onChange} />
                        <CaptionWrapperStyled>
                            <Trans i18nKey={agreementTitle}>
                                <Caption
                                    as="span"
                                    colorScheme="secondPrimary"
                                    verticalMargin="zero"
                                />
                                <Caption
                                    as="span"
                                    onClick={handleLinkClick}
                                    colorScheme="brandPrimary"
                                    size="sm"
                                    verticalMargin="zero"
                                />
                            </Trans>
                        </CaptionWrapperStyled>
                    </CheckboxWrapperStyled>
                    {isSelected ? (
                        <ButtonPrimary {...signButtonBaseAttributes} onClick={onSign} />
                    ) : (
                        <ButtonSecondary {...signButtonBaseAttributes} />
                    )}
                </>
            }
            {...rest}
        >
            <ImgMarginStyled>{ImgComponent || <ImgStyled src={img} />}</ImgMarginStyled>
            <Headline4>{title}</Headline4>
            <Typography verticalMargin="nano" colorScheme="secondary">
                {description}
            </Typography>
        </Modal>
    )
}

SignatureScreen.propTypes = {
    headerTitle: PropTypes.string,
    agreementTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    documentLink: PropTypes.string.isRequired,
    documentTitle: PropTypes.string.isRequired,
    buttonAgreementTitle: PropTypes.string.isRequired,
    signButtonTitle: PropTypes.string.isRequired,
    onSign: PropTypes.func.isRequired,
    loader: PropTypes.bool,
    onAgreement: PropTypes.func,
    img: PropTypes.string,
    ImgComponent: PropTypes.node,
    agreement: PropTypes.bool
}

SignatureScreen.defaultProps = {
    headerTitle: null,
    loader: false,
    onAgreement: null,
    img: shieldCheckedPng,
    ImgComponent: null,
    agreement: false
}

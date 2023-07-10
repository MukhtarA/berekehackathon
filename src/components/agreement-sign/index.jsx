import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@sbol/design-system/core/selection'

import { AgreementSignContainerStyled, AgreementSignTextWrapperStyled } from './style'

const AgreementSign = ({ agreementSignData, isChecked, onChange }) => {
    const textArray = agreementSignData?.text?.split(' ')
    const clickableTextIndex = textArray.findIndex(
        (item) => item === agreementSignData?.clickableText
    )
    const firstTextPart = textArray.slice(0, clickableTextIndex).join(' ')
    const restTextPart = textArray.slice(clickableTextIndex + 1).join(' ')

    return (
        <AgreementSignContainerStyled>
            <Checkbox checked={isChecked} onChange={onChange} verticalMargin="zero" />
            <AgreementSignTextWrapperStyled>
                <span>{firstTextPart}</span>
                <a href={`${agreementSignData?.link}`} target="_blank" rel="noreferrer noopener">
                    {` ${agreementSignData?.clickableText}`}
                </a>
                <span>{restTextPart}</span>
            </AgreementSignTextWrapperStyled>
        </AgreementSignContainerStyled>
    )
}

AgreementSign.propTypes = {
    agreementSignData: PropTypes.object.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default AgreementSign

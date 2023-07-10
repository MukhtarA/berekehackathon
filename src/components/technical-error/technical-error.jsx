import React from 'react'
import PropTypes from 'prop-types'

import { TechnicalErrorWrapperStyled, ImageStyled, ImageWrapperStyled } from './technical-error.style'
import { TechnicalErrorHeading } from './technical-error-heading'

export const TechnicalError = ({
    children,
    imageSrc,
    srcSet,
    title,
    description
}) => (
    <TechnicalErrorWrapperStyled verticalPadding="open">
        <ImageWrapperStyled>
            <ImageStyled src={imageSrc} srcSet={srcSet} alt={title} role="presentation" />
        </ImageWrapperStyled>

        <TechnicalErrorHeading title={title} description={description} />

        {children}
    </TechnicalErrorWrapperStyled>
)

TechnicalError.propTypes = {
    children: PropTypes.node,
    imageSrc: PropTypes.string,
    srcSet: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}

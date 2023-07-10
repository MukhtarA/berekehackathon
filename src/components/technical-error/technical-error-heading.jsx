import React from 'react'
import PropTypes from 'prop-types'

import {
    TechnicalErrorDescriptionStyled,
    TechnicalErrorTitleStyled,
    TechnicalErrorHeadingWrapperStyled
} from './technical-error.style'

export const TechnicalErrorHeading = ({
    title,
    description,
}) => (title || description) && (
    <TechnicalErrorHeadingWrapperStyled verticalPadding="open">
        {title && <TechnicalErrorTitleStyled indent="zero">
            {title}
        </TechnicalErrorTitleStyled>}

        {description && <TechnicalErrorDescriptionStyled verticalMargin="micro">
            {description}
        </TechnicalErrorDescriptionStyled>}
    </TechnicalErrorHeadingWrapperStyled>
)

TechnicalErrorHeading.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

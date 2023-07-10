import React from 'react'
import PropTypes from 'prop-types'
import { Headline2, Body2, Headline4 } from '@sbol/design-system/core/typography'

import { StepStyled, MessageContainer } from './style'

export const StatusStep = ({ mode, title, subtitle, description, message, subDescription }) => (
    <StepStyled mode={mode}>
        {subtitle && <Headline4 fontWeight="semibold">{subtitle}</Headline4>}
        {subDescription && <Body2 verticalMargin="zero">{subDescription}</Body2>}
        {title && (
            <Headline2 fontWeight="semibold" indent="zero">
                {title}
            </Headline2>
        )}
        {description && <Body2 verticalMargin="zero">{description}</Body2>}
        {message && <MessageContainer>{message}</MessageContainer>}
    </StepStyled>
)

StatusStep.propTypes = {
    mode: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    subtitle: PropTypes.string,
    subDescription: PropTypes.string,
    message: PropTypes.string
}

StatusStep.defaultProps = {
    mode: 'success',
    title: '',
    description: '',
    subtitle: '',
    subDescription: '',
    message: ''
}

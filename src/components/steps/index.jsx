import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Caption, Typography } from '@sbol/design-system/core/typography'

import {
    StepsContainerStyled,
    StepsItemTailStyled,
    StepsItemContentStyled,
    StepsItemIconStyled,
    StepsItemStyled
} from './style'

export const Steps = ({ steps }) => {
    const { t } = useTranslation()

    return (
        <StepsContainerStyled>
            {steps.map((label, idx, arr) => (
                <StepsItemStyled key={label.step}>
                    <StepsItemTailStyled hasBorder={idx !== arr.length - 1} />
                    <StepsItemIconStyled>
                        <Caption colorScheme="noColor" indent="zero">
                            {label.step}
                        </Caption>
                    </StepsItemIconStyled>
                    <StepsItemContentStyled>
                        <Typography>{t(label.title)}</Typography>
                        <Typography verticalMargin="nano" colorScheme="secondary">
                            {t(label.subtitle)}
                        </Typography>
                    </StepsItemContentStyled>
                </StepsItemStyled>
            ))}
        </StepsContainerStyled>
    )
}

Steps.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            step: PropTypes.number,
            title: PropTypes.string,
            subtitle: PropTypes.string
        })
    ).isRequired
}

import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../icon'
import { ic20Check } from '../selection/checkbox/icon'

import {
    StepPointStyled,
    StepWrapperStyled,
    StepPointWrapperStyled,
    CurrentStepCaptionWrapperStyled,
    StepTitleStyled,
    CaptionTextStyled,
    ValueTextStyled
} from './stages.style'


export const Step = ({ value, step, translations, title }) => {

    const progressMode = step === value

    /**
     * если индекс текущего шага больше - помечаем предыдущие шаги как пройденные,
     * если ни один шаг не помечен как активный, помечаем все шаги как пройденные
     * (повторяем поведение lib.ui)
     */
    const successMode = step ? value < step : true

    return (
        <StepWrapperStyled progressMode={progressMode} successMode={successMode}>
            { progressMode &&
                <CurrentStepCaptionWrapperStyled>
                    <CaptionTextStyled indent="micro">{ translations.tooltip }</CaptionTextStyled>
                </CurrentStepCaptionWrapperStyled>
            }
            <StepPointWrapperStyled
                verticalPadding="inner"
                size="sm"
            >
                <StepPointStyled>
                    {successMode
                        ? <Icon icon={ic20Check} colorScheme="white" />
                        : <ValueTextStyled verticalPadding="zero" size="sm">{value}</ValueTextStyled>
                    }
                </StepPointStyled>
            </StepPointWrapperStyled>
            { title &&
                <StepTitleStyled size="sm" verticalPadding="inner" horizontalPadding="inner">
                    {title}
                </StepTitleStyled>
            }
        </StepWrapperStyled>
    )
}

Step.propTypes = {
    value: PropTypes.number,
    step: PropTypes.number,
    translations: PropTypes.shape({
        tooltip: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
}

import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicIndent } from '../styles/dynamic-styles'
import { xsShadow } from '../styles/shadows.config.style'
import { baseX } from '../styles/semantic.config.style'
import { Caption, Typography } from '../typography'

const STEP_POINT_SIZE = 32
const STEP_WIDTH = 128
const TOOLTIP_HEIGHT = 32
// Марджин для того, чтобы ширина была 128, и горизонтальная палочка отрисовывалась
const MARGIN_STEP = baseX * 12

export const ValueTextStyled = styled(Typography)(({ theme }) => css`
    color: ${theme.stagesText};
`)

const lineStyle = css`
        content: '';
        height: 0;
        width: 80px;
        transform: translate(0, 50%);
        position: absolute;
`

const successLineStyle = (theme) => css`
        border: 0;
        border-bottom-color: ${theme.stagesSuccessBorder};
        border-bottom-width: 3px;
        border-bottom-style: solid;
`

const neutralLineStyle = (theme) => css`
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-bottom-color: ${theme.stagesBorder};
`

const stepperLineBeforeStyles = (theme, progressMode, successMode) => css`
    &::before {
        ${lineStyle};
        ${neutralLineStyle(theme)};

        right: 100%;
        ${progressMode || successMode ? successLineStyle(theme) : ''}
    }
`

const stepperLineAfterStyles = (theme, progressMode, successMode) => css`
    &::after {
        ${lineStyle};
        ${neutralLineStyle(theme)};

        left: 100%;
        ${successMode ? successLineStyle(theme) : ''}
    }
`

const pointModeStyles = (theme, progressMode, successMode) => {
    if (progressMode) {
        return css`
            background-color: ${theme.stagesSuccessBody};
            border-color: ${theme.stagesSuccessBorder};

            & ${ValueTextStyled} {
                color: ${theme.stagesSuccessText};
            }
        `
    }

    if (successMode) {
        return css`
            background-color: ${theme.stagesSuccessBody};
            border-color: ${theme.stagesSuccessBorder};
        `
    }

    return ''
}

export const StepPointStyled = styled.div`
    position: relative;
    z-index: 1;
    width: ${STEP_POINT_SIZE}px;
    height: ${STEP_POINT_SIZE}px;
    border-radius: 100%;
    text-align: center;
    line-height: 1;
    vertical-align: middle;
    margin: 0 ${MARGIN_STEP}px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ theme }) => css`
        background-color: ${theme.stagesBody};
        border: 1px solid ${theme.stagesBorder};
    `}
`

export const StepPointWrapperStyled = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    margin-top: ${dynamicIndent('sm', 'inner')};
`


export const StepWrapperStyled = styled.li(({ progressMode, successMode, theme }) => css`
        position: relative;
        width: ${STEP_WIDTH}px;
        flex-shrink: 0;

        /* отступ для tooltip'а */
        margin-top: ${TOOLTIP_HEIGHT}px;

        &:not(:first-child) {
            ${StepPointStyled} {
                ${stepperLineBeforeStyles(theme, progressMode, successMode)}
            }
        }

        &:not(:last-child) {
            ${StepPointStyled} {
                ${stepperLineAfterStyles(theme, progressMode, successMode)}
            }
        }

        ${StepPointStyled} {
            ${pointModeStyles(theme, progressMode, successMode)};
        }
`)

export const StagesStyled = styled.ul`
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: self-start;
`

export const StepTitleStyled = styled(Typography)(() => css`
    max-width: 100%;
    white-space: normal;
    text-align: center;
`)

const tooltipStyle = (theme) => css`
    background-color: ${theme.tooltipBody};
    border: solid 1px ${theme.tooltipBorder};

    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: calc(50% - 4px);
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        background-color: ${theme.tooltipBody};
    }
`

export const CurrentStepCaptionWrapperStyled = styled.span`
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 ${dynamicIndent('sm', 'micro')};
    border-radius: ${baseX}px;
    
    ${({ theme }) => css`
        ${tooltipStyle(theme)};
        box-shadow: ${xsShadow(theme)};
    `}
`

export const CaptionTextStyled = styled(Caption)`
    white-space: nowrap;
    ${({ theme }) => css`
        color: ${theme.stagesTagText};
    `}
`

export const StagesScrollAreaStyled = styled.div`
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`

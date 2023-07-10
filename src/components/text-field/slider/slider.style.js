import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../../styles/radius.config.style'
import { Typography } from '../../typography'
import { xxsShadow, xsShadow } from '../../styles/shadows.config.style'
import { sbolEase } from '../../styles/animation-timing-functions'

export const SliderStyled = styled.div`
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: column;
    opacity: 1;
    transition: 0.17s ease-in-out;
`

export const SliderBasicStyled = styled.div`
    height: 4px;
    width: 100%;
    outline: none;
    position: absolute;
    flex: none;
    bottom: 0;
    left: 0;
    margin-top: -4px;
    transition: 0.17s ease-in-out;
`

export const ProgressStyled = styled.div(({ theme, leftOffset, transitionDuration }) => css`
    z-index: 1;
    height: 4px;
    width: ${leftOffset};
    position: absolute;
    transition: background-color 0.17s ease-in-out,
        border-color 0.17s ease-in-out,
        width ${transitionDuration}s ${sbolEase};
    top: 10px;
    border-bottom-left-radius: ${xsBorderRadius};
    border-bottom-right-radius: ${xsBorderRadius};
    background-color: ${theme.fieldToggleBorderNormal};
`)

export const ThumbStyled = styled.div(({ theme, leftOffset, transitionDuration }) => css`
    text-align: center;
    background-color: ${theme.fieldToggleBody};
    border: 4px solid ${theme.fieldToggleBorderNormal};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: ${leftOffset};
    transform: translateX(-50%);
    z-index: 2;
    transform-origin: center;
    transition: background-color 0.17s ease-in-out,
        border-color 0.17s ease-in-out,
        left ${transitionDuration}s ${sbolEase},
        transform 0.3s ${sbolEase};

    &:hover {
        transform: translateX(-50%) scale(1.2);
        box-shadow: ${xsShadow(theme)};
    }

    &:active {
        transform: translateX(-50%) scale(1.2);
        box-shadow: ${xxsShadow(theme)};
    }
`)

export const TrackStyled = styled.div(({ theme }) => css`
    height: 24px;
    position: absolute;
    width: 100%;
    top: -10px;
    cursor: pointer;
    outline: none;

    &:hover {
        ${ProgressStyled} {
            background-color: ${theme.fieldToggleBorderHover};
        }

        ${ThumbStyled} {
            border-color: ${theme.fieldToggleBorderHover};
        }
    }

    &:active {
        ${ProgressStyled} {
            background-color: ${theme.fieldToggleBorderClick};
        }

        ${ThumbStyled} {
            border-color: ${theme.fieldToggleBorderClick};
        }
    }
`, ({ error, theme }) => error && css`
    ${ProgressStyled} {
        background-color: ${theme.fieldToggleBorderWarningNormal};
    }

    ${ThumbStyled} {
        border-color: ${theme.fieldToggleBorderWarningNormal};
    }

    &:hover {
        ${ProgressStyled} {
            background-color: ${theme.fieldToggleBorderWarningHover};
        }

        ${ThumbStyled} {
            border-color: ${theme.fieldToggleBorderWarningHover};
        }
    }

    &:active {
        ${ProgressStyled} {
            background-color: ${theme.fieldToggleBorderWarningClick};
        }

        ${ThumbStyled} {
            border-color: ${theme.fieldToggleBorderWarningClick};
        }
    }
`, ({ disabled, theme }) => disabled && css`
    pointer-events: none;

    ${ProgressStyled} {
        background-color: ${theme.fieldToggleBorderDisabled};
    }

    ${ThumbStyled} {
        border-color: ${theme.fieldToggleBorderDisabled};
        background-color: ${theme.fieldToggleBodyDisabled};
    }
`)

export const SegmentsStyled = styled.div`
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    line-height: 0;
    transition: opacity 0.17s ease-in-out;
`

export const SegmentStyled = styled.div`
    position: absolute;
    top: 12px;
    width: 2px;
    height: 4px;
    border-radius: 1px;
    background-color: ${({ theme }) => theme.fieldBorderNormal};
    transform: translateX(-50%);
    display: inline-block;
    margin-right: -2px;
    transition: background-color 0.17s ease-in-out;
`

export const BoundariesStyled = styled(Typography)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

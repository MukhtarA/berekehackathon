import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../../typography'
import { xsBorderRadius } from '../../styles/radius.config.style'
import { focusBorder } from '../../styles/dynamic-styles'
import { paddingStyle } from '../../indent-wrapper/padding-wrapper.style'
import { marginStyle } from '../../indent-wrapper/margin-wrapper.style'

export const SegmentedRadioStyled = styled(Typography)(({ theme }) => css`
    display: inline-block;
    border-radius: ${xsBorderRadius};
    color: ${theme.segmentedRadioOffText};
    background-color: ${theme.segmentedRadioOffBodyNormal};
    cursor: pointer;
    transition: background-color 0.17s, color 0.17s;

    & svg {
        transition: fill 0.17s;
    }

    &:hover {
        background-color: ${theme.segmentedRadioOffBodyHover};
    }

    &:active {
        background-color: ${theme.segmentedRadioOffBodyClick};
    }
`, paddingStyle)

export const LabelStyled = styled.label`
    position: relative;
    display: inline-block;
    ${({ size }) => marginStyle({ size, horizontalMargin: 'nano' })}

    &:last-of-type {
        margin-right: 0;
    }
`

export const InputStyled = styled.input(({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;

    &:checked {
        ~ ${SegmentedRadioStyled} {
            cursor: default;
            color: ${theme.segmentedRadioOnText};
            background-color: ${theme.segmentedRadioOnBody};
        }
        ~ ${SegmentedRadioStyled} svg {
            fill: ${theme.segmentedRadioOnText};
        }
    }

    &:disabled {
        ~ ${SegmentedRadioStyled} {
            color: ${theme.segmentedRadioOffTextDisabled};
            background-color: ${theme.segmentedRadioOffBodyDisabled};
            cursor: default;
        }

        ~ ${SegmentedRadioStyled} svg {
            fill: ${theme.segmentedRadioOffTextDisabled};
        }
    }

    body:not(.pointer-events) &:focus ~ ${SegmentedRadioStyled} {
        ${focusBorder(theme.focusColor)};
    }
`)

import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { focusBorder } from '../../styles/dynamic-styles'
import { xsBorderRadius } from '../../styles/radius.config.style'
import { AdditionalContentStyled } from '../text-field.style'

export const EyeBorderStyled = styled(AdditionalContentStyled)(({ theme }) => css`
    background-color: ${theme.transparent};
    position: relative;
`)

export const EyeStyled = styled.button(({ theme }) => css`
    background-color: ${theme.transparent};
    outline: none;
    cursor: pointer;
    position: relative;
    padding: 0;
    body:not(.pointer-events) &:focus {
        border-radius: ${xsBorderRadius};
        ${focusBorder(theme.focusColor)};
    }
`)

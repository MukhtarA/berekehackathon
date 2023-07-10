import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { xsBorderRadius } from '../../styles/radius.config.style'
import { TextFieldStyled, errorStyle, disabledStyle, readOnlyStyle, textFieldBorderStyle, textFieldFocusWidth } from '../text-field.style'
import { focusBorder } from '../../styles/dynamic-styles'
import { paddingStyle } from '../../indent-wrapper/padding-wrapper.style'

export const MultilineTextFieldStyled = styled(TextFieldStyled)(({ theme }) => css`
    resize: none;
    overflow: hidden;
    word-wrap: break-word;
    ${textFieldBorderStyle(theme.fieldBorderNormal)};
    background-color: ${theme.fieldBody};
    border-radius: ${xsBorderRadius};
    transition: 0.17s ease box-shadow, 0.17s ease border-color;

    &:hover {
        ${textFieldBorderStyle(theme.fieldBorderHover)};
    }

    body:not(.pointer-events) &:focus {
        border-style: solid;
        border-color: ${theme.focusColor};
        ${focusBorder(theme.focusColor, textFieldFocusWidth)};
    }
`,
disabledStyle,
({ readOnly: readonly, theme, focused }) => readOnlyStyle({ readonly, theme, focused }),
({ size, verticalPadding, horizontalPadding }) => paddingStyle({ size, verticalPadding, horizontalPadding }),
errorStyle,
).withComponent('textarea')

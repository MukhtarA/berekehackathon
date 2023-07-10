import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import {
    TypographyStyled,
} from '../components/button/button.style'
import { xsBorderRadius } from '../../styles/radius.config.style'
import { mdShadow } from '../../styles/shadows.config.style'
import { dynamicIndent } from '../../styles/dynamic-styles'
import { DropdownStyled } from '../components/dropdown/dropdown.style'
import { marginStyle } from '../../indent-wrapper/margin-wrapper.style'
import { paddingStyle } from '../../indent-wrapper'


const submitButtonStyle = ({ disabled, theme }) => {
    if (!disabled) {
        return css`
            cursor: pointer;
            background-color: ${theme.calendarSubmitButton};
        `
    }

    return css`
        background-color: ${theme.calendarSubmitButtonDisabled};
    `
}

export const ControlsStyled = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const SubmitButtonStyled = styled.button(
    ({ size = 'md' }) => css`
    border: 0;
    border-radius: ${xsBorderRadius};
    ${paddingStyle({
        size,
        verticalPadding: 'micro',
        horizontalPadding: 'micro'
    })}
    `,
    submitButtonStyle
)

export const ResetButtonStyled = styled.button(
    ({ size = 'md' }) => css`
    border: 0;
    border-radius: ${xsBorderRadius};
    margin-left: auto;
    background-color: transparent;
    ${paddingStyle({
        size,
        verticalPadding: 'micro',
        horizontalPadding: 'micro'
    })}
    ${marginStyle({
        size,
        verticalMargin: 'zero',
        horizontalMargin: 'micro'
    })}
    cursor: pointer;

    &:hover {
        ${TypographyStyled} {
            text-decoration: underline;
        }
    }
    `
)

export const InputsContainerStyled = styled.div(
    ({ size = 'md' }) => css`
    display: flex;
    justify-content: space-between;
    ${marginStyle({
        size,
        verticalMargin: 'inner',
    })}

    span:first-of-type {
        margin-right: 48px;
    }
    `
)

export const CalendarStyled = styled.div(
    ({ theme, size = 'md' }) => css`
        display: flex;
        flex-direction: column;
        padding: ${dynamicIndent(size, 'inner')};
        background-color: ${theme.dropdownBody};
        border: 1px solid ${theme.dropdownBorder};
        border-radius: ${xsBorderRadius};
        box-shadow: ${mdShadow(theme)};
        max-width: 370px;

        ${DropdownStyled} {
            position: static;
            padding: 0;
            border: 0;
            border-radius: 0;
            box-shadow: none;
        }
    `
)

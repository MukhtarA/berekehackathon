import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { lgShadow } from '@sbol/design-system/core/styles/shadows.config.style'
import { focusBorder } from '@sbol/design-system/core/styles/dynamic-styles'
import { IconLoader } from '@sbol/design-system/core/icon'

export const SectionStyled = styled.section(
    ({ theme, upComing }) => css`
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 8px;
        box-shadow: ${lgShadow(theme)};
        background-color: ${theme.noColor};
        transition: box-shadow 0.17s ease-in-out;
        padding: 24px 32px;

        :not(:last-child) {
            margin-bottom: 16px;
        }

        ${upComing &&
        css`
            border: 1px solid ${theme.additional24};
            background-color: ${theme.transparent};
            box-shadow: none;
        `}
    `
)

export const HeadingStyled = styled.button(
    ({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        background-color: ${theme.transparent};
        cursor: pointer;
        outline: none;

        body:not(.pointer-events) &:focus {
            ${focusBorder(theme.primary)};
        }
    `
)

export const ContentStyled = styled.div`
    margin-top: 8px;
`

export const IconsWrapperStyled = styled.div`
    display: flex;
    align-items: center;
`

export const SuccessIconStyled = styled(IconLoader)(
    ({ theme, isFinished }) => css`
        margin-right: 4px;

        svg {
            fill: ${isFinished ? theme.successPrimary : theme.additional8};
        }
    `
)

export const ExpandIconStyled = styled(IconLoader)(
    ({ theme, expanded, isFinished }) => css`
        transition: 0.3s ease-in-out;
        transform: rotate(${expanded ? '180deg' : '0deg'});

        svg {
            fill: ${isFinished ? theme.primary : theme.additional8};
        }
    `
)

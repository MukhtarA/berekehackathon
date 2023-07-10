import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { coolGray1 } from '@sbol/design-system/core/styles/colors.config.style'

export const CardContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
`

export const CardWrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding: 24px 0;
`

export const AdditionalStyled = styled.div`
    text-align: end;
    margin-left: 8px;

    span,
    p {
        text-align: end;
    }
`

export const SettingsCardStyled = styled.div`
    border: 1px solid ${coolGray1};
    border-radius: 4px;
`

export const UlWrapperStyled = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const LiSectionStyled = styled.li(
    ({ theme }) => css`
        position: relative;
        transition: all 0.5s ease;
        padding: 0 24px;

        &:not(:last-child) {
            border-bottom: 1px solid ${theme.dividerThin};
        }
    `
)

export const InfoCardStyled = styled.div(
    ({ theme, noPadding }) => css`
        padding: ${noPadding ? '0' : '32px 28px 12px 28px'};
        border: 1px solid ${theme.additional24};
        border-radius: 4px;
    `
)

export const FlexDivStyled = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { xsShadow } from '@sbol/design-system/core/styles/shadows.config.style'

export const CardStyled = styled.div(
    ({ theme, active }) => css`
        width: 100%;
        min-height: 160px;
        position: relative;
        border-radius: 12px;
        border: 1px solid ${active ? theme.brandPrimary : theme.additional8};
        ${active && `box-shadow: ${xsShadow(theme)};`}
        padding: 16px;
    `
)

export const CardTextStyled = styled.div`
    margin-top: 30px;
`

export const CheckboxStyled = styled.div`
    position: absolute;
    top: -6px;
    right: 6px;
`

export const CardSelectWrapperStyled = styled.div`
    display: flex;
    justify-content: center;
    margin: 16px 0;
    gap: 18px;
`

export const ImageStyled = styled.img`
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 100%;
    margin-bottom: 8px;
`

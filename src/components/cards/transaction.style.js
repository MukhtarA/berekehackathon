import styled from '@emotion/styled'
import { Caption, Typography } from '@sbol/design-system/core/typography'
import { gray1 } from '@sbol/design-system/core/styles/colors.config.style'

export const TransactionCardStyled = styled.div`
    display: flex;
    justify-content: space-between;

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${gray1};
    }
`

export const IconStyled = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    margin-right: 16px;
    width: 56px;
    min-width: 56px;
    height: 56px;
    border-radius: 50%;
    ${({ mode }) => `border: 2px solid ${mode}`}
`

export const IconWrapperStyled = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ mode }) => `background-color: ${mode}`}
`

export const CardWrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding: 24px 0;
`

export const CardContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
`

export const TitleStyled = styled(Typography)`
    font-size: 14px;
    line-height: 20px;
`

export const AdditionalStyled = styled.div`
    text-align: end;
    margin-left: 8px;
`

export const AmountStyled = styled(Typography)`
    white-space: nowrap;
    font-size: 16px;
    line-height: 24px;
    ${({ theme, mode }) => `color: ${mode === 'green' ? theme.brandPrimary : theme.primary}`}
`

export const StatusStyled = styled.span`
    line-height: 20px;
    letter-spacing: -0.3px;
    font-size: 14px;
    ${({ theme }) => `color: ${theme.warningPrimary}`}
`

export const CashBackStyled = styled(Caption)`
    text-align: right;
`

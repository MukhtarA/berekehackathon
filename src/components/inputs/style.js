import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { LabeledTextField } from '@sbol/design-system/core/text-field'

export const CommissionStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

export const ViewLabelStyled = styled.div`
    margin-top: 16px;
    width: 49%;
`

export const LabelStyled = styled.label`
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    margin-top: 16px;
`

export const StyledLabeledTextField = styled(LabeledTextField)(
    ({ theme }) => css`
        margin-top: 28px;
        margin-bottom: 0;

        :first-child {
            margin-top: 0;
        }

        p {
            color: ${theme.tertiary};
        }
    `
)

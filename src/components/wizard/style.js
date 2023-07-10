import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { ButtonPrimary, ButtonTransparent } from '@sbol/design-system/core/button'
import { Link } from '@sbol/design-system/core/link'

export const ViewOnlyStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

export const ViewOnlyColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    min-width: 48%;
`

// temporary fix for non-present style for disabled buttons in design system
const disabledButtonStyle = ({ theme }) => {
    if (theme) {
        return css`
            background-color: ${theme.brandTransparent40};
        `
    }

    return css`
        background-color: gray;
    `
}

// rewrite background-color from parent component
export const FooterStyled = styled.div`
    margin-top: 20px;

    button:disabled {
        ${disabledButtonStyle}
    }
`

export const SubmitButtonStyled = styled(ButtonPrimary)`
    margin-top: 0;
    margin-bottom: 8px;

    p {
        font-weight: normal;
    }
`

export const CancelButtonStyled = styled(ButtonTransparent)`
    margin-top: 8px;
    margin-bottom: 0;

    p {
        font-weight: normal;
    }
`

export const EditLinkStyled = styled(Link)`
    margin-top: 32px;
`

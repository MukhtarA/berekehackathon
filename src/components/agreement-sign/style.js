import styled from '@emotion/styled'
import { green3, gray3 } from '@sbol/design-system/src/styles/colors.config.style'

export const AgreementSignContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
    margin-bottom: 20px;
`

export const AgreementSignTextWrapperStyled = styled.div`
    font-size: 12px;
    color: ${gray3};

    a {
        cursor: pointer;
        text-decoration: none;
        color: ${green3};
    }
`

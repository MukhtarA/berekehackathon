import styled from '@emotion/styled'

export const ButtonContainerStyled = styled.div`
    margin-left: ${({ noHorizontalMargin }) => (noHorizontalMargin ? '' : ' 23px')};
    margin-right: ${({ noHorizontalMargin }) => (noHorizontalMargin ? '' : ' 23px ')};
`

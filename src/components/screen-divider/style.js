import styled from '@emotion/styled'

export const DividerStyled = styled.div`
    margin: ${({ noMargin }) => (noMargin ? 'auto' : '0 -23px')};
`

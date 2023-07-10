import styled from '@emotion/styled'

export const FooterWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    bottom: 0;
    padding: ${({ noPadding }) => (noPadding ? 'auto' : '0px 23px')};
    background-color: ${({ theme }) => theme.noColor};
`

import styled from '@emotion/styled'

export const LayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: ${({ theme }) => theme.noColor};

    & button:disabled {
        filter: grayscale(1);
    }
`

export const ContentStyled = styled.div`
    overflow: auto;
    flex-grow: 1;
    background-color: ${({ theme }) => theme.noColor};
    padding: ${({ noPadding }) => (noPadding ? 'auto' : '0 23px')};

    & [role='tabpanel']:focus {
        box-shadow: none !important;
    }
`

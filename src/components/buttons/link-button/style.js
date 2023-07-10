import styled from '@emotion/styled'
import { ButtonSecondary } from '../../button'

export const ButtonSecondaryStyled = styled(ButtonSecondary)`
    border: none;

    p {
        color: ${({ theme }) => theme.brandPrimary} !important;
        text-decoration: ${({ noDecoration }) => (noDecoration ? 'none' : 'underline')};
    }
`

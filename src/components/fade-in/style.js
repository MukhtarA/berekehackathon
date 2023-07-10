import styled from '@emotion/styled'

export const FadeInStyled = styled.div`
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transform: ${({ isVisible, fadeUp }) => (isVisible || !fadeUp ? 'none' : 'translate(0, 50%)')};
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'none')};
    transition: 320ms ease-in-out all;
`

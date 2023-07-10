import styled from '@emotion/styled'

export const BackdropStyled = styled.div`
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 100%;
    height: 100vh;
    backdrop-filter: ${({ $open, blur }) => $open && `blur(${blur}px) brightness(0.5)`};
    opacity: ${({ animOpen }) => (animOpen ? '100%' : '0%')};
    transition: 0.5s all;
    z-index: ${({ $zIndex }) => +$zIndex};
`

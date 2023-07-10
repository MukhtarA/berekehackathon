import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { black } from '@sbol/design-system/core/styles/colors.config.style'

export const ModalMaskStyled = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    height: 100vh;
    background-color: ${black};
    opacity: 0;
    transition: opacity, height 0.25s;

    ${({ open }) =>
        open
            ? css`
                  opacity: 0.4;
                  z-index: 1000;
                  transition: 0.25s linear opacity;
              `
            : css`
                  opacity: 0;
                  z-index: 0;
                  pointer-events: none;
                  transition: 0.25s linear opacity;
              `}
`

export const ModalStyled = styled.div(
    ({ border, open, maxHeight, fullHeight, height, selectable }) => css`
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        outline: 0;
        z-index: 1000;
        transition: ${selectable ? 'transform 0.5s' : 'transform 0.5s, height 0.5s'};
        border-radius: ${border && !fullHeight ? '12px 12px 0 0' : 0};
        height: ${height || 'auto'};
        max-height: ${maxHeight};
        display: flex;
        flex-direction: column;
        transform: ${open ? 'translateY(0)' : 'translateY(100%)'};

        & button:disabled {
            filter: grayscale(1);
        }
    `
)

export const DragableWrapperStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 3.5rem;
    margin: auto;
    padding-top: 10px;
`

export const ThumbStyled = styled.div`
    height: 4px;
    opacity: 0.3;
    border-radius: 3px;
    background: ${({ theme }) => theme.tertiary};
`

import styled from '@emotion/styled'
import { gray2 } from '@sbol/design-system/core/styles/colors.config.style'

export const RootElementStyled = styled.div`
    width: 100%;
    position: relative;
`

// With hocs not working
export const InputRangeStyled = styled.input`
    position: absolute;
    pointer-events: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    z-index: 4;
    height: 4px;
    width: 100%;
    opacity: 0;
    background: red;
    outline: none;

    /* joining multiple css selectors not work, use separated */
    &::-webkit-slider-thumb {
        position: relative;
        pointer-events: all;
        width: 15px;
        height: 15px;
        border-radius: 0;
        border: 0 none;
        z-index: 4;
        -webkit-appearance: none;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        pointer-events: all;
        width: 15px;
        height: 15px;
        border-radius: 0;
        border: 0 none;
        z-index: 4;
        -moz-appearance: none;
        cursor: pointer;
    }

    &::-ms-thumb {
        pointer-events: all;
        width: 15px;
        height: 15px;
        border-radius: 0;
        border: 0 none;
        z-index: 4;
        -moz-appearance: none;
        cursor: pointer;
    }

    &.focus {
        z-index: 999;
    }
`

export const SliderWrapperStyled = styled.div`
    position: relative;
    height: 4px;
    margin: 0 3px;
`

export const TrackStyled = styled.div`
    background-color: ${({ theme }) => theme.brandSecondary};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
`

export const RangeLeftStyled = styled.div`
    background-color: ${gray2};
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    border-radius: 5px;
    transform-origin: left;
    ${({ value }) => ({ transform: `translateX(-${100 - value}%)` })}
`

export const RangeRightStyled = styled.div`
    background-color: ${gray2};
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    border-radius: 5px;
    transform-origin: left;
    ${({ value }) => ({ transform: `translateX(${value}%)` })}
`

export const ThumbStyled = styled.div`
    background-color: ${({ theme }) => theme.white};
    border: 4px solid ${({ theme }) => theme.brandSecondary};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: -8px;
    left: -8px;
    z-index: 3;
    ${({ value }) => ({ transform: `translateX(${value}px)` })};
`

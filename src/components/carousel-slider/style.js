import styled from '@emotion/styled'
import { mediaSm } from '../../utils/media.config.style'

export const CarouselStyled = styled.div`
    overflow: hidden;
    position: relative;
`

export const InnerStyled = styled.div`
    // white-space: nowrap;
    display: flex;
    transition: transform 0.3s;
    transform: ${({ activeIndex }) => `translateX(-${activeIndex * 100}%);`};
    & > div {
        flex-shrink: 0;
    }
`

export const Indicators = styled.div`
    display: flex;
    align-items: center;

    ${mediaSm} {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 8px;
    }
`

export const CarouselItemStyled = styled.div`
    display: inline-flex;
    width: ${({ width }) => width};
    overflow: hidden;

    & > img {
        width: 100%;
        height: 152px;
        object-fit: cover;
    }
`

export const DotStyled = styled.span`
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.white};
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
    transition: transform 0.3s;
    opacity: 0.39;
    cursor: pointer;

    ${({ active }) =>
        active &&
        `
            width: 10px;
            height: 10px;
            opacity: 1;
        `}

    ${mediaSm} {
        cursor: initial;
        height: 3px;
        width: 3px;
        border-radius: 100px;
        opacity: 0.89;

        ${({ active }) =>
            active &&
            `
            width: 16px; 
            height: 3px;
            opacity: 1;
        `}
    }
`

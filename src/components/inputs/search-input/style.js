import styled from '@emotion/styled'
import { dynamicIndent } from '@sbol/design-system/core/styles/dynamic-styles'

export const OuterStyled = styled.div`
    position: relative;
    margin: ${dynamicIndent('md', 'inner')} 0;
`

export const SearchInputStyled = styled.input`
    cursor: pointer;
    width: 100%;
    height: 36px;
    padding: 8px 16px;
    border-radius: 4px;
    outline: none;
    font-size: 15px;
    background: ${({ theme }) => theme.fieldBodyDisabled};
    color: ${({ theme }) => theme.primary};

    &::placeholder {
        letter-spacing: -0.3px;
        color: ${({ theme }) => theme.tertiary};
    }
`

export const SearchIconStyled = styled.span`
    position: absolute;
    z-index: 1;
    right: 16px;
    top: 8px;

    & svg {
        fill: ${({ theme }) => theme.tertiary};
    }
`

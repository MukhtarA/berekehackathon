import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicIndent } from '../styles/dynamic-styles'
import { Typography } from '../typography'
import { baseX } from '../styles/semantic.config.style'

const IconWidth = '16px'
const IconHeight = '16px'

const horizontalIndent = (size) => {
    const indent = parseInt(dynamicIndent(size, 'nano'), 10)

    return `${indent - baseX}px`
}

export const LabelStyled = styled.label``

export const HeadlineStyled = styled.div`
    margin-bottom: ${({ size }) => dynamicIndent(size, 'micro')};
`

export const InfoStyled = styled.div(({ theme, size }) => css`
    display: inline-block;
    vertical-align: top;
    margin-left: ${horizontalIndent(size)};
    background-color: ${theme.buttonTextBodyNormal};
    outline: none;

    & svg {
        width: ${IconWidth};
        height: ${IconHeight};
        transition: fill 0.17s;
    }

    & svg path {
        fill: ${theme.fieldLabelIconNormal};
    }

    &:hover svg path {
        fill: ${theme.fieldLabelIconHover};
    }

`)

export const LabelTitleStyled = styled(Typography)(({ active, theme }) => css`
    display: inline-block;
    vertical-align: bottom;
    transition: color .3s ease-in-out;
    margin: 0;
    color: ${active ? theme.fieldLabelFilled : theme.fieldLabel};
`)

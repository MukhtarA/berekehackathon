import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Typography } from '../typography'
import { dynamicHeight } from '../styles/dynamic-styles'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'

export const WrapperStyled = styled.div`
    position: relative;
`

export const TargetStyled = styled.div``

export const NoMatchesStyled = styled(Typography)(({ theme, size }) => css`
    display: flex;
    align-items: center;
    margin: 0;
    ${paddingStyle({
        size,
        horizontalPadding: 'inner',
        verticalPadding: 'zero'
    })};
    width: 100%;
    outline: none;
    color: ${theme.fieldPlaceholder};
    background-color: ${theme.fieldBody};
    min-height: ${dynamicHeight({ size })}px;
`)

export const LoaderWrapperStyled = styled.div`
    position: relative;
    width: 100%;
    min-height: ${dynamicHeight}px;
`

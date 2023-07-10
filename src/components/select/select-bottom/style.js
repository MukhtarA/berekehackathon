import styled from '@emotion/styled'
import { Icon } from '@sbol/design-system/core/icon'
import { dynamicIndent } from '@sbol/design-system/core/styles/dynamic-styles'
import { borderRadius } from '@sbol/design-system/core/styles/radius.config.style'

export const OuterStyled = styled.div`
    margin: 8px 0 16px;
    padding: ${dynamicIndent('md', 'inner')};
    border: 1px solid ${({ theme }) => theme.fieldBorderNormal};
    ${borderRadius({ size: 'xs' })};
    display: flex;
    align-items: center;
`

export const IconStyled = styled(Icon)`
    margin-left: auto;
`

export const PlaceholderStyled = styled.div`
    color: ${({ theme }) => theme.fieldDescription};
`

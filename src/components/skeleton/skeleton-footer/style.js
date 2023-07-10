import styled from '@emotion/styled'
import { mdShadow } from '@sbol/design-system/core/styles/shadows.config.style'

export const SkeletonFooterWrapper = styled.div`
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: ${mdShadow};
    position: fixed;
    bottom: 0;
    width: 100%;
`

export const FooterItemStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FooterWrapperItemStyled = styled.div`
    margin-top: 5px;
`

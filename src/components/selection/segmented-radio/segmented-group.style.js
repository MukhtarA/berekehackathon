import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Container } from '../../indent-wrapper/container/container.style'
import { xsBorderRadius } from '../../styles/radius.config.style'
import { paddingStyle } from '../../indent-wrapper/padding-wrapper.style'

export const SegmentedGroupStyled = styled(Container)(({ theme }) => css`
    display: inline-block;
    border: 1px solid ${theme.segmentedRadioGroupBorder};
    border-radius: ${xsBorderRadius};
`, ({ size }) => paddingStyle({ size, verticalPadding: 'nano', horizontalPadding: 'nano' }))

export const SegmentedScrollGroupStyled = styled(SegmentedGroupStyled)`
    display: block;
`

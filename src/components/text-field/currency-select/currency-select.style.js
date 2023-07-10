import styled from "@emotion/styled/macro"

import { SegmentedRadio, SegmentedGroup } from '../../selection'
import { AdditionalContentStyled } from '../text-field.style'

const currencySelectButtonWidth = '36px'

export const SegmentedRadioStyled = styled(SegmentedRadio)`
        min-width: ${currencySelectButtonWidth};
        height: ${currencySelectButtonWidth};
        text-align: center;
`

export const SegmentedGroupStyled = styled(SegmentedGroup)`
    flex: none;
    max-width: 70%;
    overflow-y: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }
`.withComponent(AdditionalContentStyled)

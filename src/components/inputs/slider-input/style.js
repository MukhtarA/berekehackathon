import styled from '@emotion/styled'
import { LabeledSlider } from '@sbol/design-system/core/text-field/slider'
import { gray1 } from '@sbol/design-system/core/styles/colors.config.style'

export const LabeledSliderStyled = styled(LabeledSlider)`
    & > label > p {
        display: none;
    }

    & > label > div > span {
        border: none;
        background-color: ${({ theme }) => theme.brandTransparent8} !important;
    }

    & > label > div > div {
        background-color: ${gray1};
    }
`

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Headline1, Headline3, Headline5 } from '@sbol/design-system/core/typography'
import { red5 } from '@sbol/design-system/core/styles/colors.config.style'

import { mediaSm, mediaMd } from '../../utils/media.config.style'

const colors = {
    red5
}

export const FormTitleStyled = styled(Headline1)`
    margin-top: 16px;
    margin-bottom: 28px;
`

export const BlockTitleStyled = styled(Headline3)(
    ({ customColor }) => css`
        font-size: 24px;
        margin-top: 64px;
        margin-bottom: 32px;
        padding: 0;
        color: ${colors[customColor]};

        ${mediaMd} {
            margin-top: 48px;
        }

        ${mediaSm} {
            margin-top: 32px;
        }
    `
)

export const DateTitleStyled = styled(Headline5)`
    margin-top: 32px;
    margin-bottom: 16px;
    letter-spacing: -0.3px;

    ${mediaSm} {
        margin-top: 16px;
    }
`

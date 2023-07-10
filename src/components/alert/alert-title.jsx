import React from 'react'
import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Headline5, Typography } from '../typography'


const TitleStyled = styled(Headline5)(({ theme }) => css`
    color: ${theme.alertTitle};
`)

const DescriptionStyled = styled(Typography)(({ theme }) => css`
    color: ${theme.alertDescription};
`).withComponent('div')

export const AlertTitle = (props) => (
    <TitleStyled fontWeight="semibold" verticalMargin="zero" {...props} />
)

export const AlertDescription = (props) => (
    <DescriptionStyled size="md" verticalPadding="nano" {...props} />
)

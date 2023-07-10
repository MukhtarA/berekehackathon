import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { smBorderRadius } from '../styles/radius.config.style'
import { Icon } from '../icon'
import { MarginWrapper } from '../indent-wrapper/margin-wrapper.style'
import { paddingStyle } from '../indent-wrapper/padding-wrapper.style'
import { dynamicIndent } from '../styles/dynamic-styles'

const iconOffset = dynamicIndent('md', 'nano')

const modes = (mode, theme) => {
    switch (mode) {
        case 'success':
            return {
                background: theme.alertSuccessBody,
                contour: theme.alertSuccessBorder,
            }
        case 'info':
            return {
                background: theme.alertInfoBody,
                contour: theme.alertInfoBorder
            }
        case 'warning':
            return {
                background: theme.alertWarningBody,
                contour: theme.alertWarningBorder
            }
        case 'draft':
        default:
            return {
                background: theme.alertDraftBody,
                contour: theme.alertDraftBorder
            }
    }
}

const dynamicMode = ({ mode, theme }) => {
    const color = modes(mode, theme)
    return css`
        background: ${color.background};
        border: solid 1px ${color.contour};
    `
}

const dynamicColor = ({ mode, theme }) => {
    switch (mode) {
        case 'success':
            return theme.alertSuccessIcon
        case 'info':
            return theme.alertInfoIcon
        case 'warning':
            return theme.alertWarningIcon
        case 'draft':
        default:
            return theme.alertDraftIcon
    }
}

export const AlertStyled = styled.div`
    position: relative;

    ${({ size }) => paddingStyle({ size, horizontalPadding: 'inner' })};

    ${({ noIcon }) => !noIcon && css`
        padding-left: calc(${iconOffset} * 2 + 36px);
        min-height: calc(${iconOffset} * 2 + 36px);
    `}
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: ${smBorderRadius};

    ${dynamicMode};

    svg path {
        fill: ${dynamicColor};
    }
`.withComponent(MarginWrapper)

export const IconStyled = styled(Icon)`
    position: absolute;
    top: ${iconOffset};
    left: ${iconOffset};
`


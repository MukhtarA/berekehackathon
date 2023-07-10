import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { lgShadow } from '../styles/shadows.config.style'
import { zIndexTooltip } from '../styles/z-index.config.style'
import { xsBorderRadius, lgBorderRadius } from '../styles/radius.config.style'
import { Container } from '../indent-wrapper/container'
import { verticalMarginStyle } from '../indent-wrapper/margin-wrapper.style'
import { baseX } from '../styles/semantic.config.style'
import { Typography } from '../typography'

const tipMaxWidthDesktop = '288px'
const tipMaxWidthMobile = '256px'
const tooltipIndent = `${2 * baseX}px`

const DIRECTION = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    center: 'center',
    right: 'right'
}

const dynamicComposeDirection = ({ vd, hd }) => {
    if (vd === DIRECTION.top && hd === DIRECTION.left) {
        return css`
            border-bottom-left-radius: ${xsBorderRadius};
        `
    }
    if (vd === DIRECTION.top && hd === DIRECTION.right) {
        return css`
            border-bottom-right-radius: ${xsBorderRadius};
        `
    }
    if (vd === DIRECTION.bottom && hd === DIRECTION.left) {
        return css`
            border-top-left-radius: ${xsBorderRadius};
        `
    }
    if (vd === DIRECTION.bottom && hd === DIRECTION.right) {
        return css`
            border-top-right-radius: ${xsBorderRadius};
        `
    }
    return null
}

export const ContentsStyled = styled(Container)(({ theme }) => css`
    display: block;
    position: relative;
    margin: 0;
    height: auto;
    max-width: ${tipMaxWidthDesktop};
    border-radius: ${lgBorderRadius};
    
    background-color: ${theme.tooltipBody};
    border: solid 1px ${theme.tooltipBorder};
    box-shadow: ${lgShadow(theme)};
    overflow: hidden;
    text-overflow: ellipsis;

    ${theme.media?.sm && css`
        @media ${theme.media.sm} {
            width: ${tipMaxWidthMobile};
        }
    `}
`,
dynamicComposeDirection
)

export const ActiveZoneStyled = styled.div`
    pointer-events: auto;
`

const dynamicVerticalDirection = ({ vd }) => {
    switch (vd) {
        case DIRECTION.top:
            return css`
                bottom: calc(100% + ${tooltipIndent});
            `
        case DIRECTION.bottom:
            return css`
                top: calc(100% + ${tooltipIndent});
            `
        default:
    }
    return null
}

const dynamicHorizontalDirection = ({ hd }) => {
    switch (hd) {
        case DIRECTION.left:
            return css`
                left: 0;
                justify-content: flex-start;
            `
        case DIRECTION.center:
            return css`
                left: 50%;
                transform: translate(-50%);
                justify-content: center;
            `
        case DIRECTION.right:
            return css`
                right: 0;
                justify-content: flex-end;
            `
        default:
    }
    return null
}

export const TipStyled = styled.div`
    width: ${tipMaxWidthDesktop};
    pointer-events: none;
    position: absolute;
    display: none;
    z-index: ${zIndexTooltip};

    ${dynamicVerticalDirection};
    ${dynamicHorizontalDirection};

    ${({ theme }) => theme.media?.sm && css`
        @media ${theme.media.sm} {
            width: ${tipMaxWidthMobile};
        }
    `}

    ${({ opened }) => opened && css`
        display: flex;
    `}
`

export const TooltipWrapperStyled = styled.div`
    cursor: pointer;
    display: inline;
    text-decoration: none;

    & > ${Typography} {
        border-bottom: 1px dashed ${({ theme }) => theme.tooltipTextBorder};
    }

    width: 100%;
`

export const TooltipStyled = styled.div(() => css`
    width: auto;
    outline: none;
    position: relative;
    display: inline-block;
`,
verticalMarginStyle
)

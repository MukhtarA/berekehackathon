import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicIndent } from '../styles/dynamic-styles'

export const verticalMarginStyle = ({
    size = 'md',
    verticalMargin,
    verticalMarginDirection = 'both'
}) => {
    if (verticalMargin) {
        switch (verticalMarginDirection) {
            case 'both':
                return css`
                    margin-top: ${dynamicIndent(size, verticalMargin)};
                    margin-bottom: ${dynamicIndent(size, verticalMargin)};
                `

            case 'top':
                return css`
                    margin-top: ${dynamicIndent(size, verticalMargin)};
                `
            case 'bottom':
                return css`
                    margin-bottom: ${dynamicIndent(size, verticalMargin)};
                `
            default:
                return null
        }
    }
    return null
}

export const horizontalMarginStyle = ({
    size = 'md',
    horizontalMargin,
    horizontalMarginDirection = 'right'
}) => {
    if (horizontalMargin) {
        switch (horizontalMarginDirection) {
            case 'both':
                return css`
                    margin-right: ${dynamicIndent(size, horizontalMargin)};
                    margin-left: ${dynamicIndent(size, horizontalMargin)};
                `
            case 'left':
                return css`
                    margin-left: ${dynamicIndent(size, horizontalMargin)};
                `
            case 'right':
                return css`
                    margin-right: ${dynamicIndent(size, horizontalMargin)};
                `
            default:
                return null
        }
    }
    return null

}

export const marginStyle = (props) => css`
    margin: 0;
   
    ${verticalMarginStyle(props)};
    ${horizontalMarginStyle(props)};
   
`

export const MarginWrapper = styled.div(marginStyle)

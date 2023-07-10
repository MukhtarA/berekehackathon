import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { dynamicIndent } from '../styles/dynamic-styles'

export const verticalPaddingStyle = ({
    size = 'md',
    verticalPadding,
    verticalPaddingDirection = 'both'
}) => {
    if (verticalPadding) {
        switch (verticalPaddingDirection) {
            case 'both':
                return css`
                    padding-top: ${dynamicIndent(size, verticalPadding)};
                    padding-bottom: ${dynamicIndent(size, verticalPadding)};
                `

            case 'top':
                return css`
                    padding-top: ${dynamicIndent(size, verticalPadding)};
                `
            case 'bottom':
                return css`
                    padding-bottom: ${dynamicIndent(size, verticalPadding)};
                `
            default:
                return null
        }
    }
    return null
}

export const horizontalPaddingStyle = ({
    size = 'md',
    horizontalPadding,
    horizontalPaddingDirection = 'both'
}) => {
    if (horizontalPadding) {
        switch (horizontalPaddingDirection) {
            case 'both':
                return css`
                    padding-right: ${dynamicIndent(size, horizontalPadding)};
                    padding-left: ${dynamicIndent(size, horizontalPadding)};
                `
            case 'left':
                return css`
                    padding-left: ${dynamicIndent(size, horizontalPadding)};
                `
            case 'right':
                return css`
                    padding-right: ${dynamicIndent(size, horizontalPadding)};
                `
            default:
                return null
        }
    }
    return null

}

export const paddingStyle = (props) => css`
    padding: 0;
   
    ${verticalPaddingStyle(props)};
    ${horizontalPaddingStyle(props)};
   
`

export const PaddingWrapper = styled.div(paddingStyle)

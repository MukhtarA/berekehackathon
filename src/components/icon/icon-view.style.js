import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { Icon } from './icon'
import { IconLoader } from './icon-loader'

const dynamicIconStyle = ({ clipContent = true, width = 20, height = 20 }) => css`
    display: inline-block;
    position: relative;
    width: ${width}px;
    height: ${height}px;
    ${clipContent && 'overflow: hidden;'}
    flex-shrink: 0;

    svg {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export const IconViewBoxStyled = styled(Icon)`${dynamicIconStyle}`
export const IconLoaderViewBoxStyled = styled(IconLoader)`${dynamicIconStyle}`
export const IconWrapperStyled = styled('div')`${dynamicIconStyle}`

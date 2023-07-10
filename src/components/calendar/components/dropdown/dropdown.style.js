import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { zIndexDropdown } from '../../../styles/z-index.config.style'
import { xsBorderRadius } from '../../../styles/radius.config.style'
import { mdShadow } from '../../../styles/shadows.config.style'
import { dynamicSize, dynamicIndent } from '../../../styles/dynamic-styles'
import { letterSpacing } from '../../../styles/font-sizes.config.style'
import { DefaultButtonStyled } from '../button/button.style'

export const DropdownStyled = styled.div(
    ({ theme, size = 'md' }) => css`
        position: absolute;
        top: calc(100% + ${dynamicIndent(size, 'nano')});
        right: 0;
        padding: ${dynamicIndent(size, 'inner')};
        background-color: ${theme.calendarBody};
        border: 1px solid ${theme.calendarBorder};
        box-shadow: ${mdShadow(theme)};
        border-radius: ${xsBorderRadius};
        letter-spacing: ${letterSpacing};
        color: ${theme.calendarTextNormal};
        z-index: ${zIndexDropdown};
    `,
    dynamicSize
)

export const HeaderStyled = styled.header(
    ({ size = 'md' }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: ${dynamicIndent(size, 'inner')} 0;

        ${DefaultButtonStyled}:first-of-type {
            margin-left: -${dynamicIndent(size, 'nano')};
        }

        ${DefaultButtonStyled}:last-of-type {
            margin-right: -${dynamicIndent(size, 'nano')};
        }
    `
)

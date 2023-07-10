import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Icon, IconLoader } from '@sbol/design-system/core/icon'
import { Headline5 } from '@sbol/design-system/core/typography'
import { dynamicSvgColor } from '@sbol/design-system/core/styles/dynamic-styles'

export const TitleStyled = styled(Headline5)`
    flex: 1;
    margin-left: 16px;
`

export const IconStyled = styled(Icon)(
    ({ theme, colorScheme }) => css`
        svg {
            ${dynamicSvgColor(theme.successPrimary)({ colorScheme, theme })};
        }
    `
)

export const IconLoaderStyled = styled(IconLoader)(({ theme, colorScheme }) => {
    return css`
        svg {
            ${dynamicSvgColor(theme.successPrimary)({ colorScheme, theme })};
        }
    `
})

export const ArrowIconStyled = styled(IconLoader)(
    ({ theme, colorScheme, isOpen }) => css`
        transition: transform 0.25s ease-in-out;
        transform: rotate(${isOpen ? '180deg' : '0deg'});
        svg {
            ${dynamicSvgColor(theme.primary)({ colorScheme, theme })};
        }
    `
)

export const HeaderButton = styled.button`
    margin: 24px 0 0;
    background: none;
    position: relative;
    transition: all 0.5s ease !important;
    width: 100%;
    padding: 0 0 24px;
    box-sizing: content-box;
    text-align: left;
    user-select: none;
    height: 28px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;

    body:not(:global(.pointer-events)) &:focus {
        outline: none;

        &::before {
            outline: none;
            top: 0;
            left: 0;
            position: absolute;
            content: '';
            width: 100%;
            height: 28px;
            ${({ theme }) => `border: 1px solid ${theme.primary}`}
        }
    }
`

export const CollapseWrapperStyled = styled.div(
    ({ paddingBottom }) => css`
        padding-bottom: ${`${paddingBottom}px`};
    `
)

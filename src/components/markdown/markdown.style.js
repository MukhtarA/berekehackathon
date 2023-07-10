import styled from "@emotion/styled/macro"
import { css } from '@emotion/react'

import { marginStyle, MarginWrapper } from '../indent-wrapper/margin-wrapper.style'
import { PaddingWrapper } from '../indent-wrapper/padding-wrapper.style'
import { dynamicIndent, dynamicSize, getColor } from '../styles/dynamic-styles'

const dynamicColor = ({ theme, colorScheme }) => {
    const color = getColor(theme, colorScheme, theme.primary)

    return css`
        color: ${color};

        a {
            color: ${color};

            svg {
                fill: ${color};
            }

            body:not(.pointer-events) &:focus {
                border-color: ${theme.primary};
            }
        }

        hr {
            background-color: ${theme.additional16};
        }

        abbr {
            color: ${color};
            border-color: ${color};

            &:hover {
                border-bottom-color: ${theme.noColor};
            }
        }
    `
}

const Container = styled.div`
    ${dynamicColor}
    ${dynamicSize}
    h1 {
        ${dynamicSize({ size: 'h1' })}
        ${marginStyle({ size: 'h1', verticalMargin: 'open' })};
    }

    h2 {
        ${dynamicSize({ size: 'h2' })}
        ${marginStyle({ size: 'h2', verticalMargin: 'open' })};
    }

    h3 {
        ${dynamicSize({ size: 'h3' })}
        ${marginStyle({ size: 'h3', verticalMargin: 'open' })};
    }

    h4 {
        ${dynamicSize({ size: 'h4' })}
        ${marginStyle({ size: 'h4', verticalMargin: 'open' })};
    }

    h5 {
        ${dynamicSize({ size: 'h5' })}
        ${marginStyle({ size: 'h5', verticalMargin: 'open' })};
    }

    sub {
        font-size: smaller;
        vertical-align: sub;
    }

    sup {
        font-size: smaller;
        vertical-align: super;
    }

    /* заголовки */
    h1,
    h2,
    h3,
    h4,
    h5 {
        font-family: SBSansDisplay, Arial, Helvetica, sans-serif;
        font-weight: 600;
        letter-spacing: -0.3px;
    }

    /* параграфы */
    p {
        margin: 0 0 ${({ size }) => dynamicIndent(size, 'open')};
    }

    /* ссылки (для внешних ссылок автоматически проставляется \\\`target="_blank" rel="noopener noreferrer"\\\`) */
    a {
        text-decoration: none;
        padding: 3px;
        margin: -3px;
        outline: none;

        & > span:last-child {
            white-space: nowrap;
        }

        svg {
            vertical-align: middle;
            margin-left: 4px;
        }

        &:hover > span {
            text-decoration: underline;
        }

        &:active > span {
            text-decoration: none;
        }

        body:not(.pointer-events) &:focus {
            border-bottom-width: 2px;
            border-bottom-style: solid;
        }
    }

    /* изображения */
    img {
        max-width: 64px;
        max-height: 64px;
    }

    /* выделение курсивом */
    em {
        font-style: italic;
    }

    /* выделение жирным */
    b {
        font-weight: bold;
    }

    /* неупорядоченный и упорядоченный список (с вложенностью) */
    ul,
    ol {
        padding: 0 0 0 24px;

        ul,
        ol {
            padding: 0 24px;
            margin: 16px 0;
        }

        li {
            margin-bottom: 8px;
        }

        li:last-child {
            margin-bottom: 0;
        }

        p {
            margin: 0;
        }
    }

    /* разделители */
    hr {
        height: 1px;
        border: 0;
        width: 100%;
        margin: 24px 0;
    }

    /* аббревиатуры */
    abbr {
        border-bottom-width: 1px;
        border-bottom-style: dotted;
        transition: border-bottom 0.17s ease-in-out;
        text-decoration: none;
    }

    > :last-child {
        margin-bottom: 0 !important; /* stylelint-disable-line declaration-no-important, comment: не должно быть отступов никогда */
    }
`
    .withComponent(MarginWrapper)
    .withComponent(PaddingWrapper)

export const FullStyled = Container
export const ShortStyled = Container

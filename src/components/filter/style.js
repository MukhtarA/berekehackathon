import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { IconLoader } from '@sbol/design-system/core/icon'

import { mediaSm } from '@web_sbol/shared/src/utils/media.config.style'

export const FilterPeriodStyled = styled.div(({ verticalPadding, customPadding }) => {
    const getPadding = () => {
        if (customPadding) {
            return customPadding
        }

        if (verticalPadding) {
            return '16px 0'
        }

        return '0'
    }

    return css`
        display: flex;
        align-items: center;
        padding: ${getPadding()};

        ${mediaSm} {
            flex-direction: column;
            align-items: flex-start;
        }
    `
})

export const RadioButtonStyled = styled.div(({ theme, active }) => {
    return css`
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        border-radius: 4px;
        background: ${active ? theme.successPrimary : theme.whitePrimary};
        cursor: pointer;
        width: max-content;
        padding: 8px;
        transition: 0.15s;

        &:hover {
            background: ${active ? '' : theme.successPrimary};

            p {
                color: ${active ? '' : theme.whitePrimary} !important;
            }

            svg {
                fill: ${active ? '' : theme.whitePrimary} !important;
            }
        }

        &:last-child {
            margin-right: 0;
        }

      ${mediaSm} { {
            > p {
                font-size: 13px;
            }
        }
    `
})

export const DatePickerStyled = styled.div(
    ({ theme }) => css`
        border: 1px solid ${theme.additional8};
        border-radius: 4px;
        position: relative;
        margin-left: 24px;

        ${mediaSm} {
            margin: 0;
        }
    `
)

export const RadioGroupStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    flex-wrap: wrap;
`

export const ChevronDownStyled = styled(IconLoader)(
    ({ theme, active }) => css`
        margin-left: 8px;

        svg {
            fill: ${active ? theme.whitePrimary : theme.primary};
        }
    `
)

export const CalendarWrapperStyled = styled.div`
    position: absolute;
    top: 58px;
    left: 80px;
    z-index: 5;

    ${mediaSm} {
        left: 0;
    }
`

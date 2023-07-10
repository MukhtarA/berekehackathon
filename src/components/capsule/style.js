import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { IconLoader } from '@sbol/design-system/core/icon'
import { Typography } from '@sbol/design-system/core/typography'
import {
    coolGray9,
    orange5,
    red5,
    green5
} from '@sbol/design-system/core/styles/colors.config.style'

const statusColors = {
    gray: coolGray9,
    orange: orange5,
    red: red5,
    green: green5
}

export const CapsuleStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 80px;
    min-width: 80px;
    height: 160px;
    border-radius: 40px;
    padding: 0;
    ${({ theme }) => css`
        background: ${theme.whitePrimary};
        border: 1px solid ${theme.dividerThin};
    `}
    box-shadow: 0 4px 8px rgba(210, 219, 224, 0.6);
    cursor: pointer;

    :not(:last-child) {
        margin-right: 24px;
    }

    ${({ status }) =>
        status &&
        css`
            border-color: ${statusColors[status]};
            transition: all 1s ease-out;
        `}
`

export const IconStyled = styled(IconLoader)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 100%;
    ${({ theme }) => `border-bottom: 1px solid ${theme.dividerThin};`}

    ${({ status }) =>
        status
            ? `
                  border-color: ${statusColors[status]};
                  transition: all 1s ease-out;
                  path {
                      fill: ${statusColors[status]};
                  }
              `
            : `
                  fill-opacity: 0.32;
              `}
`

export const DateStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 84px;
`

export const MonthStyled = styled(Typography)`
    font-size: 16px;
`

export const DayStyled = styled(Typography)`
    font-size: 16px;
    margin-top: 4px;
`

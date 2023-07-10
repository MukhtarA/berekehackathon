import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const StepsContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
`

export const StepsItemStyled = styled.div`
    display: flex;
    margin-bottom: 5px;
    flex: 1 0 auto;
    position: relative;
    min-height: 38px;
`

export const StepsItemTailStyled = styled.div(
    ({ hasBorder, theme }) => css`
        position: absolute;
        bottom: 0;
        left: 9px;
        top: 25px;
        padding: 3px;
        border-left: ${hasBorder ? `2px solid ${theme.additional16}` : null};
    `
)

export const StepsItemContentStyled = styled.div`
    display: inline-block;
    position: relative;
    width: 80%;
`

export const StepsItemIconStyled = styled.div`
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.additional40};
    margin-right: 24px;

    & :first-child {
        transform: translateY(20%);
        text-align: center;
    }
`

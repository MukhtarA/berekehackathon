import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Typography } from '@sbol/design-system/core/typography'
import { dynamicIndent } from '@sbol/design-system/core/styles/dynamic-styles'

/*
 * TODO: Remove horizontal padding instead of overwriting styles
 * or use MarginWrapper
 */
export const OuterStyled = styled.div(({ theme, noHorizontalPadding }) => {
    const xPadding = dynamicIndent('md', noHorizontalPadding ? 'zero' : 'inner')
    const yPadding = dynamicIndent('md', 'inner')

    return css`
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid ${theme.alertDraftBorder};
        padding: ${yPadding} ${xPadding};

        &:last-child {
            border-bottom: none;
        }
    `
})

export const ListItemImageStyled = styled.div`
    border-bottom: ${({ theme }) => `1px solid ${theme.alertDraftBorder}`};
    display: flex;
    padding: 16px;

    &:last-child {
        border-bottom: none;
    }
`

export const InnerStyled = styled.div`
    display: flex;
    align-items: center;

    &:first-child:not(:empty) {
        margin-right: ${dynamicIndent('md', 'inner')};
    }

    &:last-child {
        margin-left: auto;
    }
`

export const CenterStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const FlexStyled = styled.div`
    display: flex;
    width: 100%;
`

export const ItemTitleStyled = styled(Typography)`
    margin: 4px 0;
`

export const ImageContainerStyled = styled.div`
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;

    & > img {
        max-width: 100%;
        height: auto;
        margin: 10px 12px 10px 0;
    }
`

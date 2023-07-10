import styled from '@emotion/styled'
import { IconLoader } from '@sbol/design-system/core/icon'
import { Typography } from '@sbol/design-system/core/typography'
import { dynamicIndent } from '@sbol/design-system/src/styles/dynamic-styles'

export const FileUploadStyled = styled.div(
    ({ theme }) => `
        margin: ${dynamicIndent('md', 'inner')} 0;
        border: 1px dashed ${theme.alertDraftBorder};
        background-color: ${theme.backgroundOne}; 
        padding: 17px;
    `
)

export const FileListStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const NoFileStyled = styled.div`
    min-height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`

export const FileStyled = styled.div`
    display: flex;
    align-items: center;
`

export const IconStyled = styled(IconLoader)`
    padding: 19px;
`

export const LinkStyled = styled(Typography)`
    cursor: pointer;
`

export const DeleteStyled = styled.div`
    cursor: pointer;
`

import styled from "@emotion/styled/macro"

import { MarginWrapper } from '../indent-wrapper/margin-wrapper.style'

const dynamicColor = ({ mode, theme }) => {
    switch (mode) {
        case 'success':
            return theme.alertSuccessActions
        case 'info':
            return theme.alertInfoActions
        case 'warning':
            return theme.alertWarningActions
        case 'draft':
        default:
            return theme.alertDraftActions
    }
}

export const ActionsStyled = styled(MarginWrapper)`
    color: ${dynamicColor};
`

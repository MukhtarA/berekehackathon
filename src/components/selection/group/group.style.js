import styled from "@emotion/styled/macro"

import { Container } from '../../indent-wrapper/container/container.style'
import { MarginWrapper } from '../../indent-wrapper/margin-wrapper.style'

export const GroupFieldsetStyled = styled(MarginWrapper)`
    border: 0;
    padding: 0;
    min-width: 0;
`.withComponent('fieldset')

export const ContentStyled = styled(Container)``

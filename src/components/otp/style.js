import styled from '@emotion/styled'
import { Link } from '@sbol/design-system/core/link'

export const SingleInputStyled = styled.div`
    width: 56px;

    &:not(:last-child) {
        margin-right: 8px;
    }
`

export const OtpInputStyled = styled.div`
    display: flex;
    padding-top: 24px;

    span {
        padding: 0;
    }

    input {
        padding: 0;
        text-align: center;
        font-size: 29px;
    }
`

export const LinkStyled = styled(Link)`
    margin: 24px 0;
`

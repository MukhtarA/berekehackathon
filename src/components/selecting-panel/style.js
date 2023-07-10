import styled from '@emotion/styled'
import { smShadow } from '@sbol/design-system/core/styles/shadows.config.style'
import { ButtonPrimary, ButtonSecondary } from '@sbol/design-system/core/button'
import { css } from '@emotion/react'

export const SelectingPanelContainerStyled = styled.div`
    margin-top: 30px;
    margin-bottom: 28px;

    ${({ initial }) =>
        initial
            ? css`
                  display: initial;

                  & > button {
                      margin-right: 16px;
                  }

                  & > button:last-child {
                      margin-right: 0;
                  }
              `
            : css`
                  display: flex;
                  justify-content: space-between;
              `}
`

const buttonsStyleObj = {
    padding: '8px 10px',
    margin: 0
}

const ButtonPrimaryStyled = styled(ButtonPrimary)(buttonsStyleObj, ({ theme, noShodow }) => ({
    boxShadow: noShodow ? smShadow(theme) : 'none'
}))

const ButtonSecondaryStyled = styled(ButtonSecondary)(buttonsStyleObj)

export const ButtonSelectedStyled = styled(ButtonPrimaryStyled)`
    flex-basis: ${({ count }) => `calc(100% / ${count} - 10px)`};

    p {
        text-align: center;
    }
`

export const ButtonUnselectedStyled = styled(ButtonSecondaryStyled)`
    flex-basis: ${({ count }) => `calc(100% / ${count} - 10px)`};

    p {
        text-align: center;
    }
`

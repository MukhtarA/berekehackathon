import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Headline4, Typography } from '@sbol/design-system/core/typography'
import { ButtonPrimary } from '@sbol/design-system/core/button'

import { ErrorWrapperStyled, ErrorTextWrapperStyled } from './style'
import { ScreenLayout } from '../../screen-layout'
import { MobileActions } from '../../../utils/mobile-actions'
import ErrorSvg from './error-svg'

export const NotAvailableScreen = ({ headerTitle, bodyTitle, bodyDescription, buttonTitle }) => {
    const handleExit = useCallback(() => {
        MobileActions.exit()
    }, [])

    return (
        <ScreenLayout>
            <ScreenLayout.Header onClick={handleExit} title={headerTitle} />
            <ScreenLayout.Content>
                <ErrorWrapperStyled>
                    <ErrorSvg />
                    <ErrorTextWrapperStyled>
                        <Headline4>{bodyTitle}</Headline4>
                        <Typography colorScheme="tertiary">{bodyDescription}</Typography>
                    </ErrorTextWrapperStyled>
                </ErrorWrapperStyled>
            </ScreenLayout.Content>
            <ScreenLayout.Footer>
                <ButtonPrimary fullWidth title={buttonTitle} onClick={handleExit} />
            </ScreenLayout.Footer>
        </ScreenLayout>
    )
}

NotAvailableScreen.propTypes = {
    headerTitle: PropTypes.string.isRequired,
    bodyTitle: PropTypes.string.isRequired,
    bodyDescription: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

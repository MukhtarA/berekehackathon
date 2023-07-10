import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ButtonPrimary, ButtonSecondary } from '@sbol/design-system/core/button'

import { ButtonContainerStyled } from './style'

export const BottomButtons = ({
    primaryTitle,
    primaryPath,
    primaryDisabled,
    onPrimaryClick,
    secondaryTitle,
    secondaryPath,
    noHorizontalMargin
}) => {
    const history = useHistory()

    const goPath = useCallback((path) => (path ? history.push(path) : history.goBack()), [history])

    const switchPath = useCallback(
        (path, additionalAction) => () => {
            if (path) {
                goPath(path)
            }

            if (additionalAction) {
                additionalAction()
            }
        },
        [goPath]
    )

    const primaryBtnAttributes = {
        title: primaryTitle,
        onClick: switchPath(primaryPath, onPrimaryClick),
        fullWidth: true
    }

    return (
        <ButtonContainerStyled noHorizontalMargin={noHorizontalMargin}>
            {primaryTitle && primaryDisabled && (
                <ButtonSecondary {...primaryBtnAttributes} disabled={primaryDisabled} />
            )}
            {primaryTitle && !primaryDisabled && <ButtonPrimary {...primaryBtnAttributes} />}
            {secondaryTitle && (
                <ButtonSecondary
                    title={secondaryTitle}
                    fullWidth
                    onClick={switchPath(secondaryPath)}
                />
            )}
        </ButtonContainerStyled>
    )
}

BottomButtons.propTypes = {
    primaryTitle: PropTypes.string,
    primaryPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    primaryDisabled: PropTypes.bool,
    onPrimaryClick: PropTypes.func,
    secondaryTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    secondaryPath: PropTypes.string,
    noHorizontalMargin: PropTypes.bool
}

BottomButtons.defaultProps = {
    primaryTitle: null,
    primaryPath: null,
    primaryDisabled: false,
    onPrimaryClick: () => {},
    secondaryTitle: null,
    secondaryPath: null,
    noHorizontalMargin: false
}

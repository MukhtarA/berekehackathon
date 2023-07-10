import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Caption, Headline5, Typography } from '@sbol/design-system/core/typography'

import {
    AlertButtonsStyled,
    AlertButtonStyled,
    AlertMessageStyled,
    AlertStyled,
    AlertWrapperStyled,
    BackdropStyled
} from './style'

const AlertModal = ({ buttons, title, message, open, onClose, hasColumn, disabledBg }) => {
    const [animOpen, setAnimOpen] = useState(false)

    const handleClose = useCallback(
        (handler) => () => {
            setAnimOpen(!animOpen)

            if (typeof handler === 'function') {
                setTimeout(() => {
                    handler()
                    onClose()
                }, 500)
            } else {
                setTimeout(() => {
                    onClose()
                }, 500)
            }
        },
        [animOpen, onClose]
    )

    useEffect(() => {
        if (open) {
            setAnimOpen(true)
        }
    }, [open])

    return (
        open && (
            <>
                <BackdropStyled $open={animOpen} onClick={handleClose()} $disabledBg={disabledBg} />
                <AlertWrapperStyled open={animOpen}>
                    <AlertStyled>
                        <Headline5 fontWeight="semibold" indent="zero">
                            {title}
                        </Headline5>
                        <AlertMessageStyled>
                            {!_.isEmpty(message) && (
                                <Caption indent="inner" colorScheme="tertiary">
                                    {message}
                                </Caption>
                            )}
                        </AlertMessageStyled>
                    </AlertStyled>
                    <AlertButtonsStyled $hasColumn={hasColumn}>
                        {buttons.map((button, idx) => (
                            // eslint-disable-next-line react/jsx-handler-names
                            <AlertButtonStyled
                                key={button.role || button}
                                disabled={button.disabled}
                                onClick={handleClose(button.handler)}
                            >
                                <Typography
                                    colorScheme={
                                        button.colorScheme ||
                                        (idx === 0 && buttons.length > 1
                                            ? 'warning'
                                            : 'brandPrimary')
                                    }
                                    fontWeight={
                                        // eslint-disable-next-line no-nested-ternary
                                        button.fontWeight
                                            ? button.fontWeight
                                            : idx === 1 || buttons.length === 1
                                            ? 'semibold'
                                            : 'regular'
                                    }
                                >
                                    {button.text || button}
                                </Typography>
                            </AlertButtonStyled>
                        ))}
                    </AlertButtonsStyled>
                </AlertWrapperStyled>
            </>
        )
    )
}

AlertModal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    buttons: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    message: PropTypes.string,
    open: PropTypes.bool,
    hasColumn: PropTypes.bool,
    disabledBg: PropTypes.bool
}

AlertModal.defaultProps = {
    buttons: ['OK'],
    message: '',
    open: false,
    hasColumn: false,
    disabledBg: false
}

export default AlertModal

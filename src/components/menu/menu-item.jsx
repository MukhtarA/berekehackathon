import React, { useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { OptionStyled, TypographyStyled, IconStyled } from './menu.style'


export const MenuItem = ({ icon, title, activeDescendant, onClose, onClick = noop, ...rest }) => {
    const buttonRef = useRef()
    const handleClick = useCallback((event) => {
        onClick(event)
        onClose(false)
    }, [])

    useEffect(() => {
        if (activeDescendant === title) {
            buttonRef.current.focus()
        }
    }, [activeDescendant])

    return (
        <OptionStyled role="option" {...rest}>
            <button onClick={handleClick} ref={buttonRef} role="menuitem">
                {icon && (
                    <IconStyled
                        name={icon}
                        width={32}
                        height={32}
                    />
                )}
                <TypographyStyled colorScheme="primary">
                    {title}
                </TypographyStyled>
            </button>
        </OptionStyled>
    )
}

MenuItem.propTypes = {
    onClose: PropTypes.func,
    activeDescendant: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
}

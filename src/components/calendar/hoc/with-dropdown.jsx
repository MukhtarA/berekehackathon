import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Dropdown } from '../components/dropdown'
import { Perimeter } from '../../perimeter'
import { CalendarStyled } from '../calendar.style'
import { getDisplayName } from '../../utils/get-display-name'
import { InputMode, ViewMode } from '../constants'

export const withDropdown = (WrappedInput) => {
    const WithDropdown = ({ onFocus, onBlur, mode, viewMode, viewModeLight = false, mask, className, validation }) => {
        const [isOpened, setOpened] = useState(false)

        const handleClose = useCallback(() => {
            setOpened(false)
        }, [])

        const handleToggle = useCallback(() => {
            setOpened(!isOpened)
        }, [isOpened])

        return (<Perimeter onClickOutside={handleClose}>
            <CalendarStyled data-testid="calendar">
                <WrappedInput
                    className={className}
                    mode={mode}
                    onClick={handleToggle}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    viewModeLight={viewModeLight}
                    mask={mask}
                />
                {isOpened && <Dropdown
                    viewMode={viewMode}
                    onClick={handleClose}
                    viewModeLight={viewModeLight}
                    validation={validation}
                />}
            </CalendarStyled>
        </Perimeter>)
    }

    WithDropdown.propTypes = {
        mode: PropTypes.oneOf(Object.keys(InputMode)),
        viewMode: PropTypes.oneOf(Object.keys(ViewMode)),
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        viewModeLight: PropTypes.bool,
        mask: PropTypes.object,
        className: PropTypes.string
    }
    WithDropdown.displayName = `withDropdown${getDisplayName(WrappedInput)}`

    return WithDropdown
}

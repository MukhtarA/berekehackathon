import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import { TextField } from '../text-field'
import { Eye } from '../password/eye'
import { withLabel } from '../../labeled'

export const TextFieldPassword = ({
    mode = 'hideOnEmpty',
    disabled = false,
    value = void 0,
    onChange = () => {},
    a11y = { title: 'Показать пароль' },
    size = 'md',
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const showEye = useMemo(
        () => !disabled && mode !== 'noEye' && (mode !== 'hideOnEmpty' || value),
        [disabled, mode, value]
    )
    const handleClick = useCallback(() => setShowPassword(!showPassword), [showPassword])

    return (
        <TextField
            value={value}
            size={size}
            disabled={disabled}
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            additionalChild={
                showEye && <Eye
                    onClick={handleClick}
                    isOpen={showPassword}
                    a11y={a11y}
                    size={size}
                />
            }
            {...rest}
        />
    )
}

TextFieldPassword.propTypes = {
    mode: PropTypes.oneOf(['hideOnEmpty', 'noEye', 'showOnEmpty']),
    disabled: PropTypes.bool,
    value: PropTypes.string,
    size: PropTypes.oneOf(['md', 'lg']),
    a11y: PropTypes.shape({
        title: PropTypes.string
    }),
    onChange: PropTypes.func,
}

export const LabeledTextFieldPassword = withLabel(TextFieldPassword)

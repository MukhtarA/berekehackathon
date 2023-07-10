import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { SwitchStyled } from './style'

const Switch = ({ checked: defaultChecked, onChange, id, ...props }) => {
    const [checked, setChecked] = useState(defaultChecked)

    const toggleAccepted = useCallback(() => {
        setChecked((value) => !value)
        onChange(checked)
    }, [onChange, checked])

    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked, id])

    return (
        <SwitchStyled
            checked={checked}
            onChange={toggleAccepted}
            mode="switch"
            verticalMargin="zero"
            {...props}
        />
    )
}

Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string
}

Switch.defaultProps = {
    checked: false,
    onChange: () => {},
    id: ''
}

export default Switch

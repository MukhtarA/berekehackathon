import React from 'react'
import PropTypes from 'prop-types'
import { extend, omit } from 'lodash'

import { disableHandler, preventHandler } from '../../utils/handlers'
import { plus, minus } from '../../icon/common'

import { CounterButtonStyled, IconStyled } from './text-field-counter.style'

const iconMap = {
    increase: plus,
    decrease: minus
}

export const CounterControl = ({ onClick, disabled, mode, ...rest }) => (
    <CounterButtonStyled
        type="button"
        onClick={disableHandler(preventHandler(onClick), disabled)}
        disabled={disabled}
        tabIndex={-1}
        {...rest}
    >
        <IconStyled icon={iconMap[mode]} />
    </CounterButtonStyled>
)

CounterControl.propTypes = {
    mode: PropTypes.oneOf(['increase', 'decrease']).isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

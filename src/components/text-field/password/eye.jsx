import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Icon } from '../../icon'
import { ic36Eye, ic36EyeCrossed } from '../../icon/common'

import { EyeStyled, EyeBorderStyled } from './eye.styled'

export const Eye = ({
    onClick = _.noop,
    isOpen = false,
    a11y,
    size,
}) => (
    <EyeBorderStyled>
        <EyeStyled
            type="button"
            onClick={onClick}
            size={size}
            title={a11y.title}
        >
            <Icon icon={isOpen ? ic36Eye : ic36EyeCrossed} />
        </EyeStyled>
    </EyeBorderStyled>
)

Eye.propTypes = {
    onClick: PropTypes.func,
    isOpen: PropTypes.bool,
    size: PropTypes.string,
    a11y: PropTypes.shape({
        title: PropTypes.string
    }),
}

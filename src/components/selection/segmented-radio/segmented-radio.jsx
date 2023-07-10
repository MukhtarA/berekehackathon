import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { disableHandler } from '../../utils/handlers'

import {
    LabelStyled,
    InputStyled,
    SegmentedRadioStyled,
} from './segmented-radio.style'

export const SegmentedRadio = ({
    value,
    onChange = noop,
    disabled,
    name,
    children,
    a11y = { title: '' },
    size = 'md',
    className,
    ...props
}) => (
    <LabelStyled size={size}>
        <InputStyled
            {...props}
            type="radio"
            name={name}
            value={value}
            onChange={disableHandler(onChange, disabled)}
            disabled={disabled}
            title={a11y.title}
        />
        <SegmentedRadioStyled
            as="span"
            size={size}
            fontWeight="medium"
            className={className}
            verticalPadding="nano"
            horizontalPadding="micro"
        >
            {children}
        </SegmentedRadioStyled>
    </LabelStyled>
)

SegmentedRadio.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    a11y: PropTypes.shape({
        /**
         * заголовок кнопки, если отображение не представлено текстом
         */
        title: PropTypes.string,
    }),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
}

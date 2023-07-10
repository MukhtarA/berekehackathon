import React from 'react'
import PropTypes from 'prop-types'
import { extend } from 'lodash'

import { disableHandler } from '../../utils/handlers'
import { autoSizeFactory } from '../hoc/auto-size'
import { withLabel } from '../../labeled'

import { MultilineTextFieldStyled } from './multiline-text-field.style'

// comment: Ошибка side-effects
export const MultilineTextField = autoSizeFactory({ minHeight: 56 })(
    ({
        size = 'md',
        verticalPadding = 'inner',
        horizontalPadding = 'inner',
        a11y,
        error,
        id,
        formName,
        refWrapper,
        onChange,
        disabled,
        readonly,
        onClick,
        ...props
    }) => {
        const passedProps = extend(props, {
            ref: refWrapper,
            onChange: disableHandler(onChange, disabled),
            form: formName,
            disabled,
            bordered: onClick,
            readOnly: readonly,
            error,
            size,
            verticalPadding,
            horizontalPadding,
        })

        return (
            <MultilineTextFieldStyled
                id={id}
                {...passedProps}
                aria-label={a11y?.label}
            />
        )
    }
)

MultilineTextField.propTypes = {
    id: PropTypes.string,
    additionalText: PropTypes.string,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    icon: PropTypes.node,
    size: PropTypes.oneOf(['md', 'lg']),
    refWrapper: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    formName: PropTypes.string,
    a11y: PropTypes.shape({
        label: PropTypes.string
    }),
    additionalChild: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero'])
}

export const LabeledMultilineTextField = withLabel(MultilineTextField)

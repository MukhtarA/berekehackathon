import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { extend, noop } from 'lodash'

import { disableHandler } from '../utils/handlers'
import { metaOmitter } from '../utils/hoc/omittere'
import { withLabel } from '../labeled'
import { baseX } from '../styles/semantic.config.style'

import {
    TextFieldStyled,
    WrapperButtonStyled,
    WrapperStyled,
    AdditionalTextWrapperStyled,
    AdditionalTextStyled,
    IconStyled,
    IconWrapperStyled
} from './text-field.style'


const iconSizes = {
    sm: baseX * 8,
    md: baseX * 9,
    lg: baseX * 12,
}

const mapTypographySize = {
    lg: 'md',
    md: 'sm',
    sm: 'sm'
}
// comment: Ошибка side-effects
export const TextField = metaOmitter(
    // comment: Ошибка side-effects
    ({
        size = 'md',
        verticalPadding = 'inner',
        horizontalPadding = 'inner',
        a11y,
        additionalText,
        additionalChild,
        icon,
        error,
        id,
        formName,
        refWrapper,
        onChange = noop,
        disabled,
        readonly,
        onFocus,
        onBlur,
        onClick = noop,
        className,
        ...props
    }) => {

        const handleChange = useCallback((e) => {
            if (onChange) {
                onChange(e?.target?.value, e)
            }
        }, [onChange])

        const passedProps = extend(props, {
            ref: refWrapper,
            onChange: disableHandler(handleChange, disabled),
            form: formName,
            disabled,
            readOnly: readonly,
            error,
            size,
            verticalPadding: !additionalChild ? verticalPadding : 'inner',
            horizontalPadding,
            icon,
            additionalText
        })

        const [focused, setFocused] = useState(false)

        const handleFocus = useCallback(
            (e) => {
                setFocused(true)
                if (onFocus) {
                    onFocus(e)
                }
            },
            [onFocus]
        )

        const handleClick = useCallback(() => {
            setFocused(true)
        }, [])

        const handleBlur = useCallback(
            (e) => {
                setFocused(false)
                if (onBlur) {
                    onBlur(e)
                }
            },
            [onBlur]
        )

        return (
            <WrapperStyled
                size={size}
                verticalPadding={verticalPadding}
                horizontalPadding={horizontalPadding}
                focused={focused}
                disabled={disabled}
                readonly={readonly}
                error={error}
                className={className}
            >
                <TextFieldStyled
                    id={id}
                    {...passedProps}
                    aria-label={a11y?.label}
                    onFocus={handleFocus}
                    onClick={handleClick}
                    onBlur={handleBlur}
                    horizontalMargin={(additionalText || additionalChild) ? 'inner' : 'zero'}
                    horizontalMarginDirection="right"
                />
                {!additionalChild && additionalText && (
                    <AdditionalTextWrapperStyled
                        size={size}
                    >
                        <AdditionalTextStyled
                            size={mapTypographySize[size]}
                            colorScheme="fieldAdditional"
                            verticalMargin="zero"
                        >
                            {additionalText}
                        </AdditionalTextStyled>
                    </AdditionalTextWrapperStyled>
                )}
                {!additionalChild && !additionalText && icon && (
                    <WrapperButtonStyled
                        as={onClick !== noop && !disabled && !readonly ? 'button' : 'span'}
                        bordered={onClick !== noop && !readonly}
                        onClick={onClick}
                        title={onClick !== noop ? a11y.title : void 0}
                        size={size}
                        {...(onClick !== noop && !disabled && !readonly ? { type: 'button' } : {})}
                    >
                        {/*  TODO: remove string icons with 0.8.0 minor */}
                        {typeof icon === 'string' ?
                            (<IconStyled
                                icon={icon}
                                size={size}
                            />)
                            : (
                                <IconWrapperStyled
                                    width={iconSizes[size] || iconSizes.md}
                                    height={iconSizes[size] || iconSizes.md}
                                    clipContent={false}
                                >
                                    { icon }
                                </IconWrapperStyled>)
                        }

                    </WrapperButtonStyled>
                )}
                {additionalChild &&
                    React.cloneElement(
                        additionalChild,
                        extend({}, additionalChild.props, {
                            readonly,
                            disabled
                        })
                    )}
            </WrapperStyled>
        )
    }
)

TextField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    additionalText: PropTypes.string,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    label: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    size: PropTypes.oneOf(['md', 'lg']),
    refWrapper: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    formName: PropTypes.string,
    a11y: PropTypes.shape({
        label: PropTypes.string,
        /**
         * заголовок кнопки, если переданы icon и onClick
         */
        title: PropTypes.string
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

export const LabeledTextField = withLabel(TextField)

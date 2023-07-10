import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { omit, extend } from 'lodash'

import { disableHandler } from '../../utils/handlers'
import { metaOmitter } from '../../utils/hoc/omittere'
import { MarginWrapper } from '../../indent-wrapper/margin-wrapper.style'

import { ic20Check } from './icon'
import {
    CheckboxWrapperStyled,
    InputStyled,
    CheckboxTypographyStyled,
    SwitchStyled,
    CheckboxStyled,
    IconStyled,
    CheckboxDescriptionStyled
} from './checkbox.style'

export const LabeledCheckbox = ({
    onChange = () => {},
    size = 'md',
    mode = 'checkbox',
    description = '',
    error = '',
    children,
    ...props
}) => {

    const handleChange = useCallback((event) => {
        onChange(event?.currentTarget?.checked, event)
    }, [onChange])

    const inputProps = extend(
        omit({ ...props, error }, ['formName']),
        {
            value: props.value,
            type: 'checkbox',
            disabled: props.disabled,
            onChange: disableHandler(handleChange, props.disabled),
            form: props.formName,
            size,
            mode
        }
    )

    return (
        <MarginWrapper size={size} verticalMargin={props.verticalMargin || 'micro'}>
            <CheckboxWrapperStyled size={size} error={props.error} disabled={props.disabled}>
                <InputStyled {...inputProps} />

                {mode === 'switch' ? (
                    <SwitchStyled size={size} />
                ) : (
                    <CheckboxStyled size={size}>
                        <IconStyled
                            icon={ic20Check}
                            size={size}
                            colorScheme="white"
                            fullWidth
                        />
                    </CheckboxStyled>
                )}
                {(children || description || error) && (
                    <CheckboxTypographyStyled as="span" size={size} verticalMargin="zero">
                        {children}
                        { description && <CheckboxDescriptionStyled
                            size={size}
                            error={error}
                            verticalMargin="nano"
                            verticalMarginDirection="top"
                        >
                            {description}
                        </CheckboxDescriptionStyled>}
                        { error && <MarginWrapper
                            size={size}
                            verticalMargin="micro"
                            verticalMarginDirection="top"
                            role="alert"
                        >
                            {error}
                        </MarginWrapper>}
                    </CheckboxTypographyStyled>
                )}
            </CheckboxWrapperStyled>
        </MarginWrapper>
    )
}

LabeledCheckbox.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    onChange: PropTypes.func,
    description: PropTypes.string,
    error: PropTypes.string,
    formName: PropTypes.string,
    mode: PropTypes.oneOf(['switch', 'checkbox']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    verticalMargin: PropTypes.string,
}

export default metaOmitter(LabeledCheckbox)

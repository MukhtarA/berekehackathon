import React from 'react'
import PropTypes from 'prop-types'
import { omit, extend } from 'lodash'

import { disableHandler } from '../../utils/handlers'
import { metaOmitter } from '../../utils/hoc/omittere'
import { MarginWrapper } from '../../indent-wrapper/margin-wrapper.style'
import { CheckboxDescriptionStyled } from '../checkbox/checkbox.style'

import { RadioWrapperLabelStyled, InputStyled, ButtonStyled, RadioTypograpyStyled } from './radio.style'

/**
 * [Zeplin](https://app.zeplin.io/project/59312e1ebdf1da6fc8d37ffb/dashboard?q=Selection%20Radio)
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const LabeledRadio = (props) => {
    const inputProps = extend(
        omit(props, ['children', 'formName', 'size']),
        {
            type: 'radio',
            disabled: props.disabled,
            name: props.name,
            value: props.value,
            onChange: disableHandler(props.onChange, props.disabled),
            form: props.formName
        }
    )

    const { size = 'md', className, children, description = '', error = '' } = props
    return (
        <MarginWrapper
            size={size}
            verticalMargin={props.verticalMargin || 'micro'}
        >
            <RadioWrapperLabelStyled
                className={className}
            >
                <InputStyled {...inputProps} size={size} />
                <ButtonStyled
                    size={size}
                />
                {(children || description || error) &&
                    <RadioTypograpyStyled as="span" size={size} verticalMargin="zero">
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
                    </RadioTypograpyStyled>
                }
            </RadioWrapperLabelStyled>
        </MarginWrapper>
    )
}

LabeledRadio.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    formName: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    description: PropTypes.string,
    className: PropTypes.string,
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero'])
}

export default metaOmitter(LabeledRadio)

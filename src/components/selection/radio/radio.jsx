import React from 'react'
import PropTypes from 'prop-types'
import { omit, extend } from 'lodash'

import { disableHandler } from '../../utils/handlers'
import { metaOmitter } from '../../utils/hoc/omittere'
import { MarginWrapper } from '../../indent-wrapper/margin-wrapper.style'

import { RadioWrapperLabelStyled, InputStyled, ButtonStyled, RadioTypograpyStyled } from './radio.style'

/**
 * [Zeplin](https://app.zeplin.io/project/59312e1ebdf1da6fc8d37ffb/dashboard?q=Selection%20Radio)
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const Radio = (props) => {
    const {
        children,
        size = 'md',
        verticalMargin = 'micro',
        className,
    } = props

    const inputProps = extend(
        omit(props, ['children', 'formName', 'size', 'className']),
        {
            type: 'radio',
            disabled: props.disabled,
            name: props.name,
            value: props.value,
            onChange: disableHandler(props.onChange, props.disabled),
            form: props.formName
        }
    )

    return (
        <MarginWrapper
            size={size}
            verticalMargin={verticalMargin}
        >
            <RadioWrapperLabelStyled
                className={className}
            >
                <InputStyled {...inputProps} size={size} />
                <ButtonStyled
                    size={size}
                />
                <RadioTypograpyStyled size={size} verticalMargin="zero">{children}</RadioTypograpyStyled>
            </RadioWrapperLabelStyled>
        </MarginWrapper>
    )
}

Radio.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    formName: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero'])
}

export default metaOmitter(Radio)

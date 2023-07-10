/* eslint-disable  react/jsx-no-bind */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { SelectBottom } from '../select-bottom'
import { GridStyled, ItemStyled } from './style'

export const PaymentDayPicker = ({ onChange, ...props }) => {
    const { t } = useTranslation()
    const [value, setValue] = useState(props.value)

    const handleClick = useCallback(
        (index) => () => {
            setValue(index)
            onChange(index)
        },
        [onChange]
    )

    const render = () => (
        <GridStyled>
            {Array.from({ length: 25 }, (_, i) => i + 1).map((index) => (
                <ItemStyled selected={value === index} key={index} onClick={handleClick(index)}>
                    {index}
                </ItemStyled>
            ))}
        </GridStyled>
    )

    return (
        <SelectBottom
            {...props}
            modalTitle={t('shared:form.setPayDate')}
            placeholder={t('shared:form.setPayDate')}
            acceptButtonTitle={t('shared:form.confirm')}
            btnDisabled={!value}
            value={value}
            render={render}
        />
    )
}

PaymentDayPicker.propTypes = {
    onChange: PropTypes.func
}

PaymentDayPicker.defaultProps = {
    onChange: () => {}
}

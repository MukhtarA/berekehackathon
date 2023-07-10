import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Typography } from '@sbol/design-system/core/typography'
import { Radio } from '@sbol/design-system/core/selection'
import { IconLoader } from '@sbol/design-system/core/icon'
import { Alert, AlertTitle } from '@sbol/design-system/core/alert'

import { CardStyled, CardTextStyled, CheckboxStyled, CardSelectWrapperStyled } from './style'

export const CardSelect = ({ options, activeValue, onChange, error }) => {
    const { t } = useTranslation()

    const handleChange = useCallback(
        (e) => {
            e.stopPropagation()
            onChange(e.target.value)
        },
        [onChange]
    )

    const handleSelect = useCallback(
        (optionType) => () => {
            onChange(optionType)
        },
        [onChange]
    )

    return (
        <>
            <CardSelectWrapperStyled>
                {_.map(options, (option) => (
                    <CardStyled
                        key={option.id}
                        active={activeValue === option.type}
                        onClick={handleSelect(option.type)}
                    >
                        {option.icon && (
                            <IconLoader colorScheme="brandPrimary" name={option.icon} />
                        )}
                        <CheckboxStyled>
                            <Radio
                                type="checkbox"
                                value={option.type}
                                checked={activeValue === option.type}
                                onChange={handleChange}
                            />
                        </CheckboxStyled>
                        <CardTextStyled>
                            {option.imgFirstRectangle}
                            {option.imgBackRectangle}
                            {option.imgBackSquare}
                            <Typography>{t(option.title)}</Typography>
                            <Typography colorScheme="secondary">{t(option.subtitle)}</Typography>
                        </CardTextStyled>
                    </CardStyled>
                ))}
            </CardSelectWrapperStyled>
            {error ? (
                <Alert mode="warning">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            ) : null}
        </>
    )
}

CardSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string,
            icon: PropTypes.string,
            title: PropTypes.string,
            subtitle: PropTypes.string,
            imgFirstRectangle: PropTypes.string,
            imgBackRectangle: PropTypes.string,
            imgBackSquare: PropTypes.string
        })
    ).isRequired,
    activeValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

CardSelect.defaultProps = {
    activeValue: '',
    error: ''
}

import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ic24CrossSmall } from '../icon/common'
import { disableHandler } from '../utils/handlers'
import { lineHeightLg, lineHeightMd } from '../styles/font-sizes.config.style'

import {
    MultiSelectedListStyled,
    MultiSelectedItemStyled,
    MultiSelectedTitleStyled,
    MultiSelectedButtonStyled,
    MultiSelectedIconStyled
} from './value-select.style'

export const MultiSelectedOptions = ({ options, onChange, size, disabled }) => {
    const handleClick = useCallback(
        (value) => (event) => {
            event.stopPropagation()

            const newSelected = options
                .map((option) => option.value)
                .filter((val) => val !== value)
            onChange(newSelected)
        },
        [options]
    )

    return (
        <MultiSelectedListStyled>
            {options.map((option) => (
                <MultiSelectedItemStyled key={option.value} size={size} disabled={disabled}>
                    <MultiSelectedTitleStyled size={size} fontWeight="medium" disabled={disabled}>
                        {option.title}
                    </MultiSelectedTitleStyled>

                    {!disabled && <MultiSelectedButtonStyled
                        role="button"
                        aria-label="Закрыть"
                        tabIndex={0}
                        size={size}
                        onClick={disableHandler(handleClick(option.value), disabled)}
                    >
                        <MultiSelectedIconStyled
                            icon={ic24CrossSmall}
                            width={10}
                            height={parseInt(size === 'lg' ? lineHeightLg : lineHeightMd, 10)}
                        />
                    </MultiSelectedButtonStyled>}
                </MultiSelectedItemStyled>
            ))}
        </MultiSelectedListStyled>
    )
}

MultiSelectedOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}

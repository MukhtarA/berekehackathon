import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { find, first, last, noop } from 'lodash'

import { Typography } from '../../typography'
import { ic24ChevronDown } from '../../icon/common'
import { metaOmitter } from '../../utils/hoc/omittere'
import { keyCodes, nextItem, prevItem } from '../../utils/dropdown-utils'
import { Perimeter } from '../../perimeter'

import {
    TypographyStyled,
    ContentItemStyled,
    DropdownButtonStyled,
    DropdownContentStyled,
    IconStyled,
    FieldsetStyled,
    InputStyled
} from './text-field-dropdown.style'

// comment: Ошибка side-effects
export const TextFieldDropdown = metaOmitter(({ readonly, disabled, size = 'md', options, value, onChange = noop, onKeyDown = noop, name, ...props }) => {
    const [opened, setOpened] = useState(false)

    const activeOption = find(options, { value })

    const handleClose = useCallback(() => setOpened(false))
    const openedStatusToggle = useCallback(() => setOpened(!opened))

    const handleChange = useCallback((e) => {
        onChange(e.target.value)
        handleClose()
    }, [onChange])

    const handleSelect = (option) => {
        if (option?.value) {
            onChange(option.value)
        }
    }

    const handleKeyDown = useCallback((event) => {
        switch (event.keyCode) {
            case keyCodes.KEY_ESCAPE:
            case keyCodes.KEY_TAB: {
                handleClose()
                break
            }
            case keyCodes.KEY_ENTER:
            case keyCodes.KEY_SPACE: {
                event.preventDefault()

                setOpened(!opened)

                break
            }
            case keyCodes.KEY_ARROW_DOWN: {
                event.preventDefault()

                const nextOption = nextItem(
                    options,
                    activeOption?.value
                )

                handleSelect(nextOption)
                break
            }

            case keyCodes.KEY_ARROW_UP: {
                event.preventDefault()
                const nextOption = prevItem(
                    options,
                    activeOption?.value
                )

                handleSelect(nextOption)
                break
            }

            case keyCodes.KEY_HOME: {
                event.preventDefault()

                const nextOption = first(options)

                handleSelect(nextOption)
                break
            }

            case keyCodes.KEY_END: {
                event.preventDefault()

                const nextOption = last(options)

                handleSelect(nextOption)
                break
            }

            default: {
                break
            }
        }
    }, [value, options, onKeyDown, opened])

    return (
        <Perimeter
            onClickOutside={handleClose}
        >
            <FieldsetStyled onKeyDown={handleKeyDown} size={size}>
                <DropdownButtonStyled
                    type="button"
                    onClick={openedStatusToggle}
                    opened={opened}
                    disabled={disabled || readonly}
                    size={size}
                    tabIndex={disabled ? -1 : 0}
                >
                    <TypographyStyled
                        size={size}
                        fontWeight="medium"
                        disabled={disabled}
                    >
                        {activeOption?.title}
                    </TypographyStyled>

                    {!disabled && !readonly && (
                        <IconStyled
                            opened={opened}
                            icon={ic24ChevronDown}
                        />
                    )}
                </DropdownButtonStyled>

                <DropdownContentStyled opened={opened} size={size}>
                    {options.map((option) => (
                        <ContentItemStyled
                            key={option.value}
                            selected={value === option.value}
                        >
                            <InputStyled
                                {...props}
                                type="radio"
                                name={name || 'dropdown-control'}
                                value={option.value}
                                checked={value === option.value}
                                onChange={handleChange}
                            />
                            <Typography size={size} fontWeight="medium">
                                {option.title}
                            </Typography>
                        </ContentItemStyled>
                    ))}
                </DropdownContentStyled>
            </FieldsetStyled>
        </Perimeter>
    )
})

TextFieldDropdown.propTypes = {
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    name: PropTypes.string
}

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-virtualized'
import { noop, uniqueId, find, last } from 'lodash'

import { TextField } from '../text-field'
import { keyCodes } from '../utils/dropdown-utils'
import { preventHandler, disableHandler } from '../utils/handlers'
import { Perimeter } from '../perimeter'
import { ContainedLoader } from '../loader/contained-loader'
import { currentIndex, nextValue, prevValue } from '../value-select/utils'
import { ValueOption } from '../value-select'
import { withLabel } from '../labeled'
import { dynamicHeight } from '../styles/dynamic-styles'
import {
    ContentsStyled,
    ContentsViewStyled,
    ItemStyled,
    ITEMS_IN_LIST
} from '../value-select/value-select.dropdown.style'

import {
    WrapperStyled,
    TargetStyled,
    NoMatchesStyled,
    LoaderWrapperStyled
} from './autocomplete.style'

export const mapTypographySize = {
    lg: 'md',
    md: 'sm'
}

export const Autocomplete = ({
    id,
    value,
    onChange,
    onBlur = noop,
    onFocus = noop,
    size = 'md',
    placeholder,
    children = [],
    icon,
    mode,
    disabled,
    readonly,
    error,
    autoComplete = 'off',
    inputMode,
    ariaLabelledby,
    ariaLabel,
    translations = {
        noMatches: 'Нет совпадений',
        loadingError: 'Ошибка загрузки'
    }
}) => {
    const inputId = useMemo(() => id || uniqueId('autocomplete'), [id])
    const enhancedChildren = useMemo(() => React.Children.map(
        children, (child) => React.cloneElement(child, { size })
    ), [children, size])
    const filteredChildren = useMemo(() => enhancedChildren.filter(
        (child) => child?.type === ValueOption ||
        child.type?.displayName === 'ValueOption'
    ), [enhancedChildren])
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(null)
    const [checked, setChecked] = useState(
        filteredChildren.find((child) => child.props.value === value) || null
    )
    const activeIndex = useMemo(() => currentIndex(enhancedChildren, active), [enhancedChildren, active])
    const rowHeight = useMemo(() => parseInt(dynamicHeight(size), 10), [size])

    const target = useRef(null)
    const contents = useRef(null)
    const perimeter = useRef(null)

    useEffect(() => {
        if (open) {
            perimeter.current.enableOnClickOutside()
        } else {
            perimeter.current.disableOnClickOutside()
        }
    }, [open])

    const isOpen = useMemo(
        () => (filteredChildren.length || mode) && open,
        [filteredChildren, open]
    )

    const handleClose = useCallback(() => {
        setOpen(false)
        setActive(null)
    }, [])

    const handleFocus = useCallback(
        (event) => {
            setActive(checked)
            setOpen(true)
            onFocus(event)
        },
        [checked]
    )

    const handleBlur = useCallback(() => {
        onBlur(value)
    }, [value])

    const handleClear = useCallback(() => {
        setActive(null)
        setChecked(null)
        setOpen(true)
        onChange('')
    }, [])

    const handleOptionChoose = useCallback((option) => {
        setChecked(option.props.value)
        onChange(option.props.title, option.props.value)
        handleClose()
    }, [onChange])

    const handleChange = useCallback(
        (val) => {
            onChange(val)
            if (!open) {
                setOpen(true)
            }
        },
        [onChange, open]
    )

    const handleKeyDownTarget = useCallback(
        /* comment: Обработчик событий клавиатуры */
        /* eslint-disable-next-line complexity*/
        (event) => {
            switch (event.keyCode) {
                case keyCodes.KEY_ESCAPE: {
                    event.preventDefault()
                    handleClear()
                    break
                }

                case keyCodes.KEY_ENTER: {
                    event.preventDefault()
                    const activeChild = find(filteredChildren, { props: { value: active } })

                    if (activeChild) {
                        handleOptionChoose(activeChild)
                    }
                    break
                }

                case keyCodes.KEY_TAB: {
                    handleClose()
                    break
                }

                case keyCodes.KEY_ARROW_DOWN: {
                    event.preventDefault()
                    const nextVal = nextValue(filteredChildren, active || checked)

                    if (nextVal) {
                        setActive(nextVal)
                    }
                    break
                }

                case keyCodes.KEY_ARROW_UP: {
                    event.preventDefault()
                    const prevVal = prevValue(filteredChildren, active || checked)

                    if (prevVal) {
                        setActive(prevVal)
                    }
                    break
                }

                case keyCodes.KEY_HOME: {
                    event.preventDefault()
                    setActive(filteredChildren[0]?.props.value)
                    break
                }

                case keyCodes.KEY_END: {
                    event.preventDefault()
                    setActive(last(filteredChildren)?.props.value)
                    break
                }

                default: {
                    break
                }
            }
        },
        [filteredChildren, active, checked]
    )


    const rowRenderer = useCallback(({ key, index, style }) => {
        const child = enhancedChildren[index]
        const isOption = child?.type === ValueOption || child.type?.displayName === 'ValueOption'

        return (
            <ItemStyled
                id={`${inputId}-option-${child.props.value}`}
                key={key}
                style={style}
                size={size}
                isOption={isOption}
                focused={active === child.props.value}
                checked={checked === child.props.value}
                ariaSelected={checked === child.props.value}
                onClick={isOption ? preventHandler(() => handleOptionChoose(child)) : noop}
                role={isOption ? 'option' : ''}
            >
                {child}
            </ItemStyled>
        )
    }, [enhancedChildren, size, active])

    const renderContent = useMemo(() => {
        if (mode === 'error') {
            return (
                <NoMatchesStyled size={size} as="li" fontWeight="medium">
                    {translations.loadingError}
                </NoMatchesStyled>
            )
        }
        if (mode === 'loading') {
            return (
                <LoaderWrapperStyled size={size} >
                    <ContainedLoader />
                </LoaderWrapperStyled>
            )
        }
        if (mode === 'noMatches') {
            return (
                <NoMatchesStyled size={size} as="li" fontWeight="medium">
                    {translations.noMatches}
                </NoMatchesStyled>
            )
        }

        return (
            <List
                rowCount={enhancedChildren.length}
                rowRenderer={rowRenderer}
                width={target?.current?.clientWidth}
                rowHeight={rowHeight}
                height={rowHeight * Math.min(ITEMS_IN_LIST, enhancedChildren.length)}
                scrollToIndex={activeIndex}
                style={{ outline: 'none' }}
            />
        )
    }, [filteredChildren, open, active, mode])

    return (
        <Perimeter
            onClickOutside={handleClose}
            disableOnClickOutside
            ref={perimeter}
        >
            <WrapperStyled
                id={`${inputId}-wrapper`}
            >
                <TargetStyled
                    role="combobox"
                    ref={target}
                    aria-expanded={isOpen || false}
                    aria-haspopup="listbox"
                    aria-owns={`${inputId}-contents`}
                >
                    <TextField
                        id={inputId}
                        placeholder={placeholder}
                        value={value}
                        icon={icon}
                        onChange={handleChange}
                        onFocus={disableHandler(handleFocus, readonly)}
                        onBlur={disableHandler(handleBlur, readonly)}
                        onKeyDown={disableHandler(handleKeyDownTarget, readonly)}
                        disabled={disabled}
                        readonly={readonly}
                        error={error}
                        aria-autocomplete="list"
                        size={size}
                        verticalMargin="zero"
                        autoComplete={autoComplete}
                        inputMode={inputMode}
                    />
                </TargetStyled>

                {open && <ContentsStyled>
                    <ContentsViewStyled
                        id={`${inputId}-contents`}
                        ref={contents}
                        tabIndex={-1}
                        role="listbox"
                        aria-expanded={isOpen}
                        aria-activedescendant={
                            isOpen ? `${inputId}-option-${active}` : void 0
                        }
                        aria-labelledby={ariaLabelledby}
                        aria-label={ariaLabel}
                    >
                        {renderContent}
                    </ContentsViewStyled>
                </ContentsStyled>}
            </WrapperStyled>
        </Perimeter>
    )
}

Autocomplete.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.oneOf(['md', 'lg']),
    placeholder: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    mode: PropTypes.oneOf(['loading', 'error', 'noMatches']),
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
    inputMode: PropTypes.oneOf(['text', 'none', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']),
    ariaLabelledby: PropTypes.string,
    ariaLabel: PropTypes.string,
    translations: PropTypes.shape({
        noMatches: PropTypes.string
    })
}

export const LabeledAutocomplete = withLabel(Autocomplete)

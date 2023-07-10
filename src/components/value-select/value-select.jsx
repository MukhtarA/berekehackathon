// comment: a11 specific rule
/* eslint-disable jsx-a11y/click-events-have-key-events */
// comment: a11 specific rule
/* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import { find, last, noop, uniq, uniqueId } from 'lodash'

import { preventHandler } from '../utils/handlers'
import { Icon } from '../icon'
import { Perimeter } from '../perimeter'
import { withLabel } from '../labeled'
import { ic24ChevronDown } from '../icon/common'

import {
    currentIndex,
    currentValue,
    prevValue,
    nextValue,
    keyCodes,
    makeArray,
    getValues
} from './utils'
import {
    ArrowStyled,
    ItemNotChosenStyled,
    TargetStyled,
    WrapperStyled,
    dynamicHeight,
} from './value-select.style'
import {
    ContentsStyled,
    ContentsViewStyled,
    ItemStyled
} from './value-select.dropdown.style'
import { MultiSelectedOptions } from './multi-selected-options'
import { ValueOption } from './value-option'

const LIST_HEIGHT = 368

export const ValueSelect = ({
    children = [],
    value = void 0,
    onChange = noop,
    onFocus = noop,
    onBlur = noop,
    error = void 0,
    id = void 0,
    mode = 'select',
    size = 'md',
    disabled = false,
    readonly = false,
    translations = {
        // comment: Нет объянения
        placeholder: 'Выберите из списка'
    },
    ariaLabel = '',
    ariaLabelledby = ''
}) => {
    const enhancedChildren = useMemo(() => React.Children.map(
        children, (child) => React.cloneElement(child, { size })
    ), [children])
    const filteredChildren = useMemo(() => enhancedChildren.filter(
        (child) => child?.type === ValueOption ||
        child.type?.displayName === 'ValueOption'
    ), [enhancedChildren])

    const [open, setOpen] = useState(null)
    const [active, setActive] = useState(filteredChildren[0]?.props.value)
    const activeIndex = useMemo(() => currentIndex(enhancedChildren, active), [enhancedChildren, active])
    const rowHeight = useMemo(() => parseInt(dynamicHeight(size), 10), [size])
    const firstChildValue = useMemo(() => filteredChildren[0]?.props.value, [filteredChildren])
    const selectId = useMemo(() => id || uniqueId('ui-select'), [])
    const isMultiSelect = useMemo(() => mode === 'multiselect', [mode])
    const isAutoSelect = useMemo(() => mode === 'autoselect', [mode])
    const isDisabled = useMemo(
        () => disabled || readonly || !filteredChildren.length,
        [disabled, readonly, filteredChildren]
    )
    const minHeight = enhancedChildren.length * rowHeight
    const fixHeight = LIST_HEIGHT > minHeight ? minHeight : LIST_HEIGHT
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: rowHeight,
        minHeight: rowHeight,
    })

    const isSelected = useCallback(
        (val) => isMultiSelect ? value.includes(val) : value === val,
        [value]
    )

    if (isAutoSelect && !value) {
        onChange(firstChildValue)
    }

    const target = useRef(null)
    const contents = useRef(null)
    const perimeter = useRef(null)

    useEffect(() => {
        // Не нужен фокус при первом рендере
        if (open === null) {
            return
        }

        if (open) {
            contents.current.focus()
            perimeter.current.enableOnClickOutside()
        } else {
            target.current.focus()
            perimeter.current.disableOnClickOutside()
        }
    }, [open])

    const handleOpen = useCallback(() => setOpen(true), [])
    const handleClose = useCallback(() => setOpen(false), [])
    const handleFocus = useCallback((event) => onFocus && onFocus(event), [])
    const handleBlur = useCallback(() => onBlur && onBlur(value), [value])
    const handleTargetClick = useCallback(() => open ? handleClose() : handleOpen(), [open])

    const handleOptionChoose = (val, close) => {
        setActive(val)
        onChange(isMultiSelect ? getValues(makeArray(value), val) : val)

        if (close) {
            handleClose()
        }
    }

    const handleOptionSetChoose = (options) => {
        const valuesArray = makeArray(value)

        if (options.length === valuesArray.length) {
            setActive(firstChildValue)
            onChange([])
        } else {
            setActive(last(options).props.value)

            const optionsValues = options.map((option) => option.props.value)
            const nextValues = uniq([...optionsValues, ...valuesArray])

            onChange(nextValues)
        }
    }

    const handleSelectKey = (val) => {
        setActive(val)
        if (isAutoSelect) {
            handleOptionChoose(val)
        }
    }
    // comment: Обработчик событий клавиатуры
    const handleKeyDownContents = useCallback((event) => {
        switch (event.keyCode) {
            case keyCodes.KEY_TAB: {
                handleClose()
                break
            }
            case keyCodes.KEY_ENTER:
            case keyCodes.KEY_SPACE: {
                event.preventDefault()
                handleOptionChoose(currentValue(filteredChildren, active), !isMultiSelect)
                break
            }

            case keyCodes.KEY_ESCAPE: {
                event.preventDefault()
                handleClose()
                break
            }

            case keyCodes.KEY_ARROW_DOWN: {
                event.preventDefault()
                const nextVal = nextValue(filteredChildren, active)

                if (nextVal) {
                    if (isMultiSelect && event.shiftKey) {
                        handleOptionChoose(nextVal)
                    }

                    handleSelectKey(nextVal)
                }
                break
            }

            case keyCodes.KEY_ARROW_UP: {
                event.preventDefault()
                const prevVal = prevValue(filteredChildren, active)

                if (prevVal) {
                    if (isMultiSelect && event.shiftKey) {
                        handleOptionChoose(prevVal)
                    }

                    handleSelectKey(prevVal)
                }
                break
            }

            case keyCodes.KEY_HOME: {
                event.preventDefault()

                if (isMultiSelect && event.shiftKey && event.ctrlKey) {
                    const currIndex = currentIndex(filteredChildren, active)

                    handleOptionSetChoose(
                        filteredChildren.slice(0, currIndex + 1)
                    )
                }

                handleSelectKey(filteredChildren[0]?.props.value)
                break
            }

            case keyCodes.KEY_END: {
                event.preventDefault()

                if (isMultiSelect && event.shiftKey && event.ctrlKey) {
                    const currIndex = currentIndex(filteredChildren, active)

                    handleOptionSetChoose(filteredChildren.slice(currIndex))
                }

                handleSelectKey(last(filteredChildren)?.props.value)
                break
            }

            case keyCodes.KEY_A: {
                if (isMultiSelect && event.ctrlKey) {
                    event.preventDefault()
                    handleOptionSetChoose(filteredChildren)
                }
                break
            }

            default: {
                break
            }
        }
    },
    [filteredChildren, active, isMultiSelect]
    )

    const selectedItem = useMemo(() => {
        if (isMultiSelect) {
            const selectedOptions = enhancedChildren.map((child) => ({
                value: child.props.value,
                title: child.props.title
            })).filter((option) => value.includes(option.value))

            if (selectedOptions.length) {
                return (
                    <MultiSelectedOptions
                        options={selectedOptions}
                        onChange={onChange}
                        size={size}
                        disabled={isDisabled}
                    />
                )
            }
        }

        const selectedOption = find(filteredChildren, { props: { value } })

        if (selectedOption) {
            return selectedOption
        }

        return (
            <ItemNotChosenStyled size={size} fontWeight="medium">
                {translations.placeholder}
            </ItemNotChosenStyled>
        )
    }, [enhancedChildren, filteredChildren, isMultiSelect])

    const rowRenderer = useCallback(({ key, index, style, parent }) => {
        const child = enhancedChildren[index]
        const isOption = child?.type === ValueOption || child.type?.displayName === 'ValueOption'

        return (
            <CellMeasurer
                key={key}
                cache={cache}
                columnIndex={0}
                rowIndex={index}
                parent={parent}
            >
                <ItemStyled
                    style={style}
                    id={`${selectId}-option-${child.props.value}`}
                    size={size}
                    isOption={isOption}
                    focused={active === child.props.value}
                    checked={isSelected(child.props.value)}
                    ariaSelected={isSelected(child.props.value)}
                    onClick={isOption ? preventHandler(() => handleOptionChoose(child.props.value, !isMultiSelect)) : noop}
                    role={isOption ? 'option' : ''}
                >
                    {child}
                </ItemStyled>
            </CellMeasurer>
        )
    }, [enhancedChildren, size, active, open])

    return (
        <Perimeter
            onClickOutside={handleClose}
            disableOnClickOutside
            ref={perimeter}
        >
            <WrapperStyled id={`${selectId}-wrapper`}>
                <TargetStyled
                    type="button"
                    id={selectId}
                    ref={target}
                    onClick={handleTargetClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-haspopup="listbox"
                    aria-expanded={open ? true : void 0}
                    // listbox должен связать себя с назначением
                    aria-labelledby={ariaLabelledby || selectId}
                    aria-label={ariaLabel}
                    disabled={isDisabled}
                    open={open}
                    error={error}
                    readonly={readonly}
                    size={size}
                >
                    {selectedItem}

                    <ArrowStyled open={open}>
                        <Icon icon={ic24ChevronDown} colorScheme="primary" />
                    </ArrowStyled>
                </TargetStyled>

                {open && <ContentsStyled>
                    <ContentsViewStyled
                        id={`${selectId}-contents`}
                        ref={contents}
                        onKeyDown={handleKeyDownContents}
                        tabIndex={-1}
                        role="listbox"
                        aria-activedescendant={
                            open ? `${selectId}-option-${active}` : void 0
                        }
                        // фишка мультиселекта в листбоксе
                        aria-multiselectable={isMultiSelect}
                        // listbox должен связать себя с назначением
                        aria-labelledby={ariaLabelledby}
                        aria-label={ariaLabel}
                    >
                        <List
                            role="listbox"
                            rowCount={enhancedChildren.length}
                            rowRenderer={rowRenderer}
                            width={target?.current?.clientWidth}
                            rowHeight={cache.rowHeight}
                            deferredMeasurementCache={cache}
                            height={fixHeight}
                            scrollToIndex={activeIndex}
                            style={{ outline: 'none' }}
                        />
                    </ContentsViewStyled>
                </ContentsStyled>}
            </WrapperStyled>
        </Perimeter>
    )
}

ValueSelect.propTypes = {
    children: PropTypes.node,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    mode: PropTypes.oneOf(['select', 'autoselect', 'multiselect']),
    size: PropTypes.oneOf(['md', 'lg']),
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    translations: PropTypes.shape({
        placeholder: PropTypes.string
    }),
    ariaLabelledby: PropTypes.string,
    ariaLabel: PropTypes.string,
}

export const LabeledValueSelect = withLabel(ValueSelect)

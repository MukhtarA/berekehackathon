import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { ValueSelect, ValueOption } from '../../value-select'
import { TextFieldMasked } from '../masked'
import { omittere } from '../../utils/hoc/omittere'
import { withLabel } from '../../labeled'
import { makeFieldMoneyMask } from '../money/make-field-money-mask'

import { BaseSlider } from './base-slider'
import { SliderStyled } from './slider.style'
import { getBoundaries, getValuePrefixSuffix } from './utils'
import { Boundaries } from './boundaries'

const formOmitProps = [
    'asyncValidating',
    'autofilled',
    'dirty',
    'dispatch',
    'hasServerError',
    'initialValue',
    'invalid',
    'pristine',
    'submitFailed',
    'submitting',
    'touched',
    'valid',
    'visited',
    'warning'
]

// comment: Ошибка side-effects
export const Slider = omittere(formOmitProps)(
    ({
        value,
        onChange = () => {},
        onFocus = () => {},
        onBlur = () => {},
        disabled,
        readonly,
        error,
        mode,
        colorScheme,
        min,
        max,
        step,
        digits,
        grid,
        options,
        transitionDuration,
        tabIndex,
        id,
        placeholder,
        active,
        formName,
        size = 'md',
        maskOptions,
        prefix,
        suffix = void 0,
        ...props
    }) => {
        const sliderMode =
            mode === 'input:segmented' || mode === 'segmented'
                ? 'segmented'
                : void 0

        const onChangeOption = useCallback((index) => onChange(options[index].value), [])

        return (
            <>
                <SliderStyled>
                    {options ? (
                        <ValueSelect
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            tabIndex={tabIndex}
                            active={active}
                            formName={formName}
                            error={error}
                            disabled={disabled}
                            readonly={readonly}
                            id={id}
                            size={size}
                            mode="autoselect"
                        >
                            {options.map((option) => (
                                <ValueOption key={option.value} {...option} />
                            ))}
                        </ValueSelect>
                    ) : (
                        <TextFieldMasked
                            inputMode={min < 0 ? 'text' : 'decimal'}
                            {...props}
                            value={value.toString()}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            maskOptions={{
                                mask: getValuePrefixSuffix(
                                    'num',
                                    prefix,
                                    typeof suffix === 'string' ? suffix : suffix?.value
                                ),
                                blocks: {
                                    num: {
                                        mask: Number,
                                        ...getBoundaries({ options, grid, min, max }),
                                        ...makeFieldMoneyMask(maskOptions)
                                    },
                                },
                                lazy: false,
                            }}
                            disabled={disabled}
                            readonly={readonly}
                            tabIndex={tabIndex}
                            placeholder={placeholder}
                            active={active}
                            formName={formName}
                            error={error}
                            size={size}
                            id={id}
                        />
                    )}

                    {!readonly && (
                        <BaseSlider
                            value={
                                options
                                    ? options.findIndex(
                                        (item) => item.value === value
                                    )
                                    : value
                            }
                            onChange={options ? onChangeOption : onChange}
                            mode={sliderMode}
                            colorScheme={colorScheme}
                            min={min}
                            max={max}
                            step={step}
                            digits={digits}
                            error={error}
                            disabled={disabled}
                            transitionDuration={transitionDuration}
                            grid={
                                options
                                    ? options.map((item, index) => index)
                                    : grid
                            }
                        />
                    )}
                </SliderStyled>

                <Boundaries
                    prefix={prefix}
                    suffix={suffix}
                    size={size}
                    options={options}
                    grid={grid}
                    min={min}
                    max={max}
                />
            </>
        )
    }
)

Slider.propTypes = {
    colorScheme: PropTypes.string,
    /**
     * "segmented" for render delimiters
     */
    mode: PropTypes.oneOf(['segmented']),

    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    formName: PropTypes.string,
    active: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Auto generation of step. props.step with this prop is wanted step size or below
     */
    digits: PropTypes.arrayOf(PropTypes.number),
    /**
     * Array of prepared grid values (for example 100, 200, 500, 1000, 10000, 100000)
     */
    grid: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    /**
     * Array of select options (title, value)
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ),

    error: PropTypes.string,
    prefix: PropTypes.string,
    /**
     * Можно передать единое значение или объект, где будут значения максимальное, минимальное, значение в поле ввода
     */
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        max: PropTypes.string,
        min: PropTypes.string,
        value: PropTypes.string,
    })]),
    placeholder: PropTypes.string,
    id: PropTypes.string,
    transitionDuration: PropTypes.number,
    tabIndex: PropTypes.number
}

export const LabeledSlider = withLabel(Slider)

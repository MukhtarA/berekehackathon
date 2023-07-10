import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { IMaskMixin } from 'react-imask'

import { TextField } from '../text-field'
import { withLabel } from '../../labeled'

export const TextFieldMasked = ({
    onChange = () => {},
    onBlur = () => {},
    onKeyPress = () => {},
    refWrapper = () => {},
    maskOptions,
    ...rest
}) => {
    const [inputRef, setInputRef] = useState(null)

    const getInputRef = useCallback((node) => {
        setInputRef(node)
        refWrapper(node)
    }, [refWrapper])

    const handleAccept = useCallback((unmaskedValue, mask) => {
        // В случае с масками может не всегда хватать только unmaskedValue
        // Например, календарь. Там удобнее сразу получать mask.masked.date - объект даты
        onChange(unmaskedValue, mask)
    }, [onChange])

    const handleBlur = useCallback(() => {
        const mask = inputRef.maskRef
        const unmaskedValue = mask?._unmaskedValue

        onBlur(unmaskedValue, mask)
    }, [onBlur, inputRef])

    const handleKeyPress = useCallback((e) => {
        const mask = inputRef.maskRef
        const unmaskedValue = mask?._unmaskedValue

        onKeyPress(e, unmaskedValue, mask)
    }, [onKeyPress, inputRef])

    return (
        <MaskedStyledInput
            ref={getInputRef}
            {...rest}
            onAccept={handleAccept}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            unmask
            // Добавляем возможность перебить unmask={true} (на false или typed) через maskOptions
            {...maskOptions}
        />)
}

TextFieldMasked.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Mask of TextField. For details see: react-imask package
     */
    maskOptions: PropTypes.shape({}),
    refWrapper: PropTypes.func
}

const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
    <TextField
        {...props}
        refWrapper={inputRef}
    />
))

export const LabeledTextFieldMasked = withLabel(TextFieldMasked)

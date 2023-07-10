import React, { memo, useRef, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '../text-field'

import { usePrevious } from '../../utils'
import { SingleInputStyled } from './style'

const SingleOTPInputComponent = ({ focus, autoFocus, ...rest }) => {
    const inputRef = useRef(null)
    const prevFocus = usePrevious(!!focus)

    const setRef = useCallback((c) => (inputRef.current = c), [])

    useLayoutEffect(() => {
        if (inputRef.current) {
            if (focus && autoFocus) {
                inputRef.current.focus()
            }
            if (focus && autoFocus && focus !== prevFocus) {
                inputRef.current.focus()
                inputRef.current.select()
            }
        }
    }, [autoFocus, focus, prevFocus])

    return (
        <SingleInputStyled>
            <TextField refWrapper={setRef} {...rest} />
        </SingleInputStyled>
    )
}

SingleOTPInputComponent.propTypes = {
    focus: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool.isRequired
}

const SingleOTPInput = memo(SingleOTPInputComponent)

export default SingleOTPInput

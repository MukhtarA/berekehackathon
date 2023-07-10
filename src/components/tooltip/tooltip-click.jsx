import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { noop, omit, extend } from 'lodash'

import { Perimeter } from '../perimeter'
import { preventHandler } from '../utils/handlers'

import { Tooltip } from './tooltip'

export const TooltipClick = ({
    onOpen = noop,
    onClose = noop,
    ...rest
}) => {
    const [open, setOpen] = useState(false)
    const perimeter = useRef(null)

    useEffect(() => {
        if (open) {
            perimeter.current.enableOnClickOutside()
        } else {
            perimeter.current.disableOnClickOutside()
        }
    }, [open])

    const handleTooltipClick = useCallback((event) => {
        setOpen(!open)
        onOpen(event)
    }, [open])

    const handleClose = useCallback((event) => {
        setOpen(false)
        onClose(event)
    }, [])

    const extendValues = {
        onClick: preventHandler(handleTooltipClick),
        forceOpened: open
    }

    const passedProps = extend(
        omit(rest, ['target', 'onOpen', 'onClose']),
        extendValues
    )

    return (
        <Perimeter
            onClickOutside={handleClose}
            disableOnClickOutside
            ref={perimeter}
        >
            <Tooltip {...passedProps} />
        </Perimeter>
    )
}

TooltipClick.propTypes = {
    // comment: более краткая запись компонента, но в API указать надо
    children: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
}

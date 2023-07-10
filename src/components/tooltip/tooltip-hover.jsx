import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { noop, omit, extend } from 'lodash'

import { Tooltip } from './tooltip'

export const TooltipHover = ({
    onOpen = noop,
    onClose = noop,
    forceOpened = void 0,
    ...rest
}) => {
    const [open, SetOpen] = useState(false)

    const handleTooltipFocus = (event) => {
        if (!open) {
            SetOpen(true)
            onOpen(event)
        }
    }

    const handleTooltipBlur = (event) => {
        if (open) {
            SetOpen(false)
            onClose(event)
        }
    }

    const extendValues = {
        onFocus: handleTooltipFocus,
        onBlur: handleTooltipBlur,
        onMouseOver: handleTooltipFocus,
        onMouseLeave: handleTooltipBlur,
        forceOpened: forceOpened || open
    }

    const passedProps = extend(
        omit(rest, ['onOpen', 'onClose', 'forceOpened']),
        extendValues
    )

    return <Tooltip {...passedProps} />
}

TooltipHover.propTypes = {
    // comment: более краткая запись компонента, но в API указать надо
    children: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    forceOpened: PropTypes.bool
}


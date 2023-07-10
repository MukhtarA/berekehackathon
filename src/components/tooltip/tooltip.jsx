import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop, uniqueId, omit } from 'lodash'

import { Typography } from '../typography'

import { Tip } from './tip'
import { TooltipWrapperStyled, TooltipStyled } from './tooltip.style'

export const Tooltip = ({
    forceOpened = false,
    onClick = noop,
    children = null,
    ...rest
}) => {
    const tooltipId = uniqueId('tooltip-')
    let verticalMargin = 'zero'

    const parsedChildren = useMemo(() => React.Children.map(children, (child) => {
        if (!child) {
            return child
        } else if (child?.type === Tip || child?.type?.displayName === 'Tip') {
            return React.cloneElement(child, {
                id: tooltipId,
                forceOpened,
            })
        }

        if (child.props) {
            const passedChildIndent = typeof child.type === 'string' ? void 0 : { verticalMargin: 'zero' }

            const passedChild = React.cloneElement(child, {
                'aria-controls': tooltipId,
                'aria-describedby': tooltipId,
                ...passedChildIndent
            })

            verticalMargin = child.props.verticalMargin || 'zero'

            return (
                <TooltipWrapperStyled
                    onClickCapture={onClick}
                >
                    {passedChild}
                </TooltipWrapperStyled>
            )
        }

        return (
            <TooltipWrapperStyled
                onClickCapture={onClick}
                aria-controls={tooltipId}
                aria-describedby={tooltipId}
            >
                <Typography>{child}</Typography>
            </TooltipWrapperStyled>
        )
    }))

    const passedProps = omit(rest, ['children', 'forceOpened', 'onClick', 'id'])

    return (
        <TooltipStyled
            {...passedProps}
            verticalMargin={verticalMargin}
        >
            {parsedChildren}
        </TooltipStyled>
    )
}

Tooltip.propTypes = {
    children: PropTypes.node,
    forceOpened: PropTypes.bool,
    onClick: PropTypes.func
}

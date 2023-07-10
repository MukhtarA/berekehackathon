import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Collapse, UnmountClosed } from 'react-collapse'
import { extend } from 'lodash'

import {
    AccordionItemStyled,
    HeadingStyled,
    CollapseWrapperStyled,
} from './accordion.style'
import { AccordionHeading } from './accordion-heading'
import { AccordionSummary } from './accordion-summary'

const KEY_ENTER = 13

export const AccordionItem = (props) => {
    const {
        children,
        forceOpened = false,
        onChange,
        onKeyDown,
        id,
        statusIcon = void 0,
        'aria-level': ariaLevel = '2',
        collapsible,
        refWrapper,
        size,
        unmountClosed,
        ...rest
    } = props

    const CollapseComponent = useMemo(() => unmountClosed ? UnmountClosed : Collapse, [unmountClosed])

    const [active, updateState] = useState(forceOpened)

    const [heading, ...panel] = React.Children.toArray(children)

    const isOpened = collapsible ? active : forceOpened

    const handleOnChange = useCallback((event) => {
        if (collapsible) {
            updateState(!active)
        }
        onChange(id, event, isOpened)
    })

    const handleOnKeyDown = useCallback((event) => {
        if (collapsible && event?.keyCode === KEY_ENTER) {
            event.preventDefault()
            updateState(!active)
        }
        onKeyDown(id, event)
    })

    const renderChild = (child) => child && React.cloneElement(
        child,
        extend({}, child.props, {
            size,
            statusIcon,
            isOpened,
        })
    )

    return (
        <AccordionItemStyled
            {...rest}
            isOpened={isOpened}
            ref={refWrapper}
        >
            <HeadingStyled
                id={`${id}-title`}
                isOpened={isOpened}
                type="button"
                role="heading"
                aria-level={ariaLevel}
                aria-expanded={isOpened}
                aria-controls={`${id}-section`}
                onClick={handleOnChange}
                onKeyDown={handleOnKeyDown}
                size={size}
                verticalPadding="inner"
                statusIcon={statusIcon}
            >
                {React.Children.map(heading, renderChild)}
            </HeadingStyled>
            <CollapseWrapperStyled
                role="region"
                id={`${id}-section`}
                aria-labelledby={`${id}-title`}
                isOpened={isOpened}
            >
                <CollapseComponent isOpened={isOpened}>
                    {panel}
                </CollapseComponent>
            </CollapseWrapperStyled>
        </AccordionItemStyled>
    )
}

AccordionItem.propTypes = {
    children (props) {
        const summary = React.Children.toArray(props.children)[0]

        if (!React.isValidElement(summary)) {
            return new Error(
                'Expected the first child of Accordion to be a valid element.'
            )
        }

        if (summary?.type !== AccordionHeading &&
        summary?.type?.displayName !== 'AccordionHeading' &&
        summary?.type !== AccordionSummary &&
        summary?.type?.displayName !== 'AccordionSummary') {
            return new Error(
                'Expected the first child of Accordion to be AccordionHeading or AccordionSummary'
            )
        }
        return null
    },
    id: PropTypes.string.isRequired,
    statusIcon: PropTypes.oneOf(['success', 'info', 'warning']),
    size: PropTypes.oneOf(['h3', 'h4', 'h5']),
    forceOpened: PropTypes.bool,
    onKeyDown: PropTypes.func,
    'aria-level': PropTypes.string,
    collapsible: PropTypes.bool,
    refWrapper: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]),
    unmountClosed: PropTypes.bool
}

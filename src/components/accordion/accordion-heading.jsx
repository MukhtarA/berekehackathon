import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { extend } from 'lodash'

import { Typography } from '../typography'
import { Icon, IconLoader } from '../icon'

import {
    AccordionHeadingStyled,
    AccordionDescriptionStyled,
    AccordionDeprecatedStyled
} from './accordion.style'
import { AccordionIcon } from './accordion-summary'

export const AccordionHeading = ({ children, isOpened, statusIcon, ...rest }) => {

    const renderChildren = useMemo(() => {
        let icon = null
        let title = null
        const description = React.Children.map(children, (child) => {
            if (child?.type === Icon || child?.type === IconLoader ||
                child?.type?.displayName === 'Icon' ||
                child?.type?.displayName === 'IconLoader') {
                icon = child
                return false
            } else if (!title) {
                if (typeof child === 'object') {
                    title = React.cloneElement(
                        child,
                        extend({}, child.props, { indent: 'zero' })
                    )
                } else {
                    title = <Typography>{child}</Typography>
                }
                return false
            }

            return (
                typeof child === 'object'
                    ? React.cloneElement(child, { verticalMargin: 'nano' })
                    : React.cloneElement(<Typography>{child}</Typography>, { verticalMargin: 'nano' })
            )
        })

        return (
            <>
                <AccordionDeprecatedStyled icon={icon} statusIcon={statusIcon}>
                    {icon}
                    {title}
                </AccordionDeprecatedStyled>
                <AccordionDescriptionStyled icon={icon}>
                    {description}
                </AccordionDescriptionStyled>
                <AccordionIcon isOpened={isOpened} statusIcon={statusIcon} />
            </>
        )
    }, [children])

    return (
        <AccordionHeadingStyled {...rest}>
            {renderChildren}
        </AccordionHeadingStyled>
    )
}

AccordionHeading.propTypes = {
    children: PropTypes.node.isRequired,
    isOpened: PropTypes.bool,
    statusIcon: PropTypes.oneOf(['success', 'info', 'warning']),
}

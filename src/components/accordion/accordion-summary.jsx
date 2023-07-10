import React from 'react'
import PropTypes from 'prop-types'

import { ic24ChevronDown, ic36Info, ic36Checkmark, ic36CircleCross } from '../icon/common'

import {
    AccordionHeadingStyled,
    AccordionTitleStyled,
    AccordionDescriptionStyled,
    AccordionIconStyled,
    AccordionHeaderTextStyled,
    ChevronIconStyled,
    StatusIconStyled,
} from './accordion.style'

const iconMap = {
    success: ic36Checkmark,
    info: ic36Info,
    warning: ic36CircleCross,
}

export const AccordionIcon = ({
    isOpened = false,
    statusIcon = null
}) =>
    (<>
        {statusIcon && <StatusIconStyled
            width={28}
            height={28}
            icon={iconMap[statusIcon]}
            colorScheme={statusIcon}
        />}
        <ChevronIconStyled
            width={12}
            height={28}
            isOpened={isOpened}
            icon={ic24ChevronDown}
            colorScheme="primary"
        />
    </>)


export const AccordionSummary = ({
    children = void 0,
    title = '',
    description = '',
    icon = null,
    size,
    statusIcon,
    isOpened,
    ...rest
}) => {
    if (title) {
        return (
            <AccordionHeadingStyled {...rest}>
                <AccordionHeaderTextStyled>
                    {icon && <AccordionIconStyled>
                        {icon}
                    </AccordionIconStyled>}
                    <AccordionTitleStyled
                        statusIcon={statusIcon}
                        size={size}
                        variant={size}
                        as={size}
                        indent="zero"
                        icon={icon}
                    >
                        {title}
                    </AccordionTitleStyled>
                    <AccordionIcon isOpened={isOpened} statusIcon={statusIcon} />
                </AccordionHeaderTextStyled>
                {description && <AccordionDescriptionStyled
                    icon={icon}
                    colorScheme="tertiary"
                    verticalMargin="zero"
                >
                    {description}
                </AccordionDescriptionStyled>}
            </AccordionHeadingStyled>
        )
    }

    return (
        <AccordionHeadingStyled {...rest}>
            {children}
            <AccordionIcon isOpened={isOpened} statusIcon={statusIcon} />
        </AccordionHeadingStyled>
    )
}

AccordionSummary.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    icon: PropTypes.object,
    description: PropTypes.string,
    statusIcon: PropTypes.oneOf(['success', 'info', 'warning']),
    isOpened: PropTypes.bool,
    size: PropTypes.oneOf(['h3', 'h4', 'h5'])
}

import React from 'react'
import PropTypes from 'prop-types'

import { Body2 } from '../../typography'
import { MarginWrapper } from '../../indent-wrapper'

import { SegmentButtonStyled } from './segmented-horizontal-scroll.styles'

export const ScrollSegment = ({
    title,
    onClick,
    active,
    disabled,
    className
}) => (
    <MarginWrapper
        size="md"
        horizontalMargin="open"
        horizontalMarginDirection="right"
        className={className}
    >
        <SegmentButtonStyled onClick={onClick} disabled={disabled}>
            <Body2 colorScheme={active ? 'primary' : 'additional24'}>
                {title}
            </Body2>
        </SegmentButtonStyled>
    </MarginWrapper>
)

ScrollSegment.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
}

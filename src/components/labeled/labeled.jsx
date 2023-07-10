import React from 'react'
import PropTypes from 'prop-types'

import { MarginWrapper } from '../indent-wrapper/margin-wrapper.style'
import { MarkdownFull } from '../markdown/markdown-full'

import { Info } from './info'
import {
    HeadlineStyled,
    LabelTitleStyled,
    LabelStyled
} from './labeled.style'

const mapTypographySize = {
    lg: 'md',
    md: 'sm',
    sm: 'sm'
}

export const Labeled = ({
    as,
    className,
    verticalMargin = 'inner',
    verticalMarginDirection,
    horizontalMargin,
    horizontalMarginDirection,
    size = 'md',
    label,
    children,
    error,
    description,
    tooltip,
    value
}) => (
    <MarginWrapper
        className={className}
        verticalMargin={verticalMargin}
        verticalMarginDirection={verticalMarginDirection}
        horizontalMargin={horizontalMargin}
        horizontalMarginDirection={horizontalMarginDirection}
        size={size}
    >
        {label ? (
            <LabelStyled as={as}>
                <HeadlineStyled size={mapTypographySize[size]}>
                    <LabelTitleStyled
                        size={mapTypographySize[size]}
                        active={!!value}
                        verticalMargin="micro"
                        colorScheme="primary"
                        aria-label={label}
                    >
                        {label}
                    </LabelTitleStyled>
                    {tooltip && <Info size={size} {...tooltip} />}
                </HeadlineStyled>
                {children}
            </LabelStyled>
        ) :
            children
        }

        {error && (
            <MarkdownFull
                size={mapTypographySize[size]}
                colorScheme="warning"
                verticalMargin="micro"
                role="alert"
                content={error}
            />
        )}

        {description && (
            <MarkdownFull
                size={mapTypographySize[size]}
                colorScheme="secondary"
                verticalMargin="micro"
                content={description}
            />

        )}
    </MarginWrapper>
)

Labeled.propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    verticalMargin: PropTypes.string,
    verticalMarginDirection: PropTypes.oneOf([
        'both',
        'top',
        'bottom'
    ]),
    horizontalMargin: PropTypes.string,
    horizontalMarginDirection: PropTypes.oneOf([
        'both',
        'left',
        'right'
    ]),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    description: PropTypes.string,
    tooltip: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        /* В WF 3.0 передается contents, сохраняем совместимость*/
        contents: PropTypes.string
    }),
    value: PropTypes.oneOfType([
        PropTypes.string,
        /* Array in multiselect */
        PropTypes.arrayOf(PropTypes.string),
        /* Boolean in checkbox */
        PropTypes.bool
    ]),
}

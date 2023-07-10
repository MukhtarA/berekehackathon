import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { HEADERS } from '../typography'
import { getFilteredComponent } from '../utils'

import {
    LinkStyled,
    TypographyStyled,
    IconStyled,
    IconLoaderStyled
} from './link.style'

const excludedProps = [
    'size',
    'underlined',
    'colorScheme',
    'iconReverse',
    'verticalMargin',
    'horizontalMargin',
    'verticalMarginDirection',
    'horizontalMarginDirection'
]

export const Link = ({
    title,
    iconName,
    icon,
    colorScheme,
    size = 'md',
    iconReverse,
    fontWeight,
    horizontalMargin = 'inner',
    verticalMargin = 'zero',
    horizontalMarginDirection,
    verticalMarginDirection,
    ariaLabel = 'Link',
    as = 'a',
    underlined = true,
    disabled,
    onClick,
    refWrapper,
    ...rest
}) => {
    const replacementComponent = useMemo(() =>
        typeof as === 'string'
            ? as
            : getFilteredComponent(as, { excludedProps })
    , [as])

    return (
        <LinkStyled
            ref={refWrapper}
            as={replacementComponent}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={onClick}
            aria-label={title || ariaLabel}
            underlined={underlined && !(icon || iconName)}
            colorScheme={colorScheme}
            iconReverse={iconReverse}
            size={size}
            horizontalMargin={horizontalMargin}
            verticalMargin={verticalMargin}
            horizontalMarginDirection={horizontalMarginDirection}
            verticalMarginDirection={verticalMarginDirection}
            {...rest}
        >
            {title && (
                <TypographyStyled
                    as={HEADERS.includes(size) ? size : 'span'}
                    verticalMargin="zero"
                    size={size}
                    fontWeight={fontWeight}
                >
                    {title}
                </TypographyStyled>
            )}
            {iconName && (
                <IconLoaderStyled
                    name={iconName}
                    size={size}
                    iconReverse={iconReverse}
                    hasTitle={!!title}
                />
            )}
            {icon && !iconName && (
                <IconStyled
                    icon={icon}
                    size={size}
                    iconReverse={iconReverse}
                    hasTitle={!!title}
                />
            )}
        </LinkStyled>
    )
}

Link.propTypes = {
    /**
     * Текстовое содержимое ссылки
     */
    title: PropTypes.string,
    /**
     * Наименование иконки из сформированного namespace с помощью IconLoader.addIcons
     * или готового iconPacka предоставляемого дизайн-системой
     */
    iconName: PropTypes.string,
    /**
     * svg файл
     */
    icon: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'h1', 'h2', 'h3', 'h4', 'h5']),
    fontWeight: PropTypes.oneOf(['regular', 'medium', 'semibold']),
    colorScheme: PropTypes.oneOf(['success', 'warning', 'info', 'primary']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf([
        'open',
        'inner',
        'micro',
        'nano',
        'zero',
    ]),
    horizontalMarginDirection: PropTypes.string,
    verticalMarginDirection: PropTypes.string,
    refWrapper: PropTypes.func,
    /**
     * Может быть Link из react-router(-dom)
     */
    as: PropTypes.elementType,
    iconReverse: PropTypes.bool,
    disabled: PropTypes.bool,
    underlined: PropTypes.bool,
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func,
}

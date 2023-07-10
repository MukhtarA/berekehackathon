import React from 'react'
import { PropTypes } from 'prop-types'
import { noop } from 'lodash'

import { Menu } from '../menu'
import { MarginWrapper } from '../indent-wrapper/margin-wrapper.style'
import { disableHandler } from '../utils/handlers'

import { CardBody } from './card-body'
import { CardHeading } from './card-heading'
import { CardBaseStyled } from './card.style'


export const Card = ({
    as,
    a11y,
    children,
    size = 'md',
    icon = '',
    iconName = '',
    iconColorScheme,
    loaderColorScheme,
    imageSrc = '',
    srcSet = '',
    title = '',
    href = void 0,
    external = false,
    story = false,
    viewed,
    additionalButton = void 0,
    onAdditionalButtonClick = noop,
    loading,
    onClick = noop,
    description = '',
    colorScheme = '',
    refWrapper = noop,
    className,
    verticalMargin,
    verticalMarginDirection,
    horizontalMargin,
    horizontalMarginDirection,
    ...rest
}) => {

    const menu = (children?.type === Menu) || (children?.type?.displayName === 'Menu') ? children : void 0

    const externalProps = external
        ? {
            rel: 'noopener noreferrer',
            target: '_blank'
        }
        : {}

    return (
        <MarginWrapper
            size={size}
            ref={refWrapper}
            className={className}
            verticalMargin={verticalMargin}
            verticalMarginDirection={verticalMarginDirection}
            horizontalMargin={horizontalMargin}
            horizontalMarginDirection={horizontalMarginDirection}
        >
            <CardBaseStyled
                as={as}
                size={size}
                href={href}
                onClick={disableHandler(onClick, loading)}
                tabIndex="0"
                viewed={viewed}
                {...externalProps}
                {...rest}
            >
                <CardHeading
                    icon={icon}
                    iconName={iconName}
                    iconColorScheme={iconColorScheme}
                    loaderColorScheme={loaderColorScheme}
                    external={external}
                    story={story}
                    additionalButton={additionalButton}
                    onAdditionalButtonClick={onAdditionalButtonClick}
                    additionalButtonTitle={a11y?.additionalButtonTitle}
                    menu={menu}
                    srcSet={srcSet}
                    imageSrc={imageSrc}
                    colorScheme={colorScheme}
                    loading={loading}
                    title={title}
                />

                {title && (
                    <CardBody
                        size={size}
                        title={title}
                        description={description}
                    />
                )}
            </CardBaseStyled>
        </MarginWrapper>
    )
}

Card.propTypes = {
    as: PropTypes.elementType,
    children: PropTypes.node,
    size: PropTypes.oneOf([
        'md',
        'lg'
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    iconName: PropTypes.string,
    iconColorScheme: PropTypes.oneOf([
        'light',
        'dark'
    ]),
    loaderColorScheme: PropTypes.oneOf([
        'light',
        'dark'
    ]),
    imageSrc: PropTypes.string,
    srcSet: PropTypes.string,
    onClick: PropTypes.func,
    additionalButton: PropTypes.oneOf([
        'plus',
        'cross'
    ]),
    onAdditionalButtonClick: PropTypes.func,
    loading: PropTypes.bool,
    href: PropTypes.string,
    external: PropTypes.bool,
    story: PropTypes.bool,
    viewed: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    colorScheme: PropTypes.string,
    refWrapper: PropTypes.func,
    a11y: PropTypes.shape({
        additionalButtonTitle: PropTypes.string,
    }),
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
    ])
}

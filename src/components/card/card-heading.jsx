import React, { useMemo, useState } from 'react'
import { PropTypes } from 'prop-types'
import { flow, noop } from 'lodash'

import { Icon, IconLoader } from '../icon'
import { LoaderIcon } from '../loader-icon'
import { ic24CrossSmall, externalBold, ic24Plus, playStory } from '../icon/common'
import { handlePreventDefault, stopPropagationHandler } from '../utils/handlers'

import {
    LabelStyled,
    CardHeadingStyled,
    CloseButtonStyled,
    PlusButtonStyled,
    ExternalLinkIconWrapperStyled,
    MenuWrapperStyled,
    StoryIconStyled,
    StoryIconWrapperStyled,
    LabelIconStyled
} from './card.style'

export const CardHeading = ({
    icon,
    iconName,
    iconColorScheme,
    loaderColorScheme,
    imageSrc,
    srcSet,
    external,
    story,
    additionalButton,
    onAdditionalButtonClick,
    additionalButtonTitle,
    loading,
    menu,
    title,
    colorScheme
}) => {
    const [isMenuClosed, setIsMenuClosed] = useState(true)

    const loaderDefaultColorScheme = icon || iconName ? 'dark' : 'light'
    const labelDefaultColorScheme = icon || iconName ? 'cardIconTransparentBody' : 'cardIconSolidBody'

    const handleMenuOpen = () => setIsMenuClosed(false)
    const handleMenuClose = () => setIsMenuClosed(true)

    const label = useMemo(() => {
        if (loading) {
            return <LoaderIcon mode={loaderColorScheme || iconColorScheme || loaderDefaultColorScheme} />
        }

        if (icon) {
            if (typeof icon === 'string') {
                return <LabelIconStyled icon={icon} iconColorScheme={iconColorScheme} />
            }

            return icon
        }

        if (iconName) {
            return <IconLoader name={iconName} />
        }

        if (imageSrc) {
            return <img src={imageSrc} alt={title} srcSet={srcSet} role="presentation" />
        }

        return null
    }, [icon, iconName, iconColorScheme, loaderColorScheme, imageSrc, srcSet, loading, loaderDefaultColorScheme])

    const cardMode = useMemo(() => {
        if (menu) {
            const { onOpen, onClose } = menu.props

            const cardMenu = React.cloneElement(
                menu,
                {
                    onOpen: flow(onOpen || noop, handleMenuOpen),
                    onClose: flow(onClose || noop, handleMenuClose)
                }
            )

            return (
                <MenuWrapperStyled onClick={handlePreventDefault} isClosed={isMenuClosed}>
                    {cardMenu}
                </MenuWrapperStyled>
            )

        } else if (external) {
            return <ExternalLinkIconWrapperStyled icon={externalBold} colorScheme="cardButtonIconNormal" />

        }

        switch (additionalButton) {
            case 'plus':
                return (
                    <PlusButtonStyled
                        tabIndex="0"
                        title={additionalButtonTitle}
                        onClick={stopPropagationHandler(onAdditionalButtonClick)}
                    >
                        <Icon icon={ic24Plus} colorScheme="cardButtonIconBrand" />
                    </PlusButtonStyled>
                )
            case 'cross':
                return (
                    <CloseButtonStyled
                        tabIndex="0"
                        title={additionalButtonTitle}
                        onClick={stopPropagationHandler(onAdditionalButtonClick)}
                    >
                        <Icon icon={ic24CrossSmall} colorScheme="cardButtonIconNormal" />
                    </CloseButtonStyled>
                )
            default:
                return void 0
        }

    }, [menu, onAdditionalButtonClick, external, isMenuClosed, handleMenuClose, handleMenuOpen, additionalButtonTitle])

    return (
        <CardHeadingStyled>
            <LabelStyled
                story={story}
                colorScheme={colorScheme || labelDefaultColorScheme}
            >
                {label}
            </LabelStyled>

            {story &&
                <StoryIconWrapperStyled>
                    <StoryIconStyled icon={playStory} />
                </StoryIconWrapperStyled>
            }

            {cardMode}
        </CardHeadingStyled>
    )
}

CardHeading.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    iconColorScheme: PropTypes.oneOf([
        'light',
        'dark'
    ]),
    loaderColorScheme: PropTypes.oneOf([
        'light',
        'dark'
    ]),
    iconName: PropTypes.string,
    imageSrc: PropTypes.string,
    srcSet: PropTypes.string,
    onAdditionalButtonClick: PropTypes.func,
    additionalButton: PropTypes.oneOf([
        'plus',
        'cross'
    ]),
    additionalButtonTitle: PropTypes.string,
    loading: PropTypes.bool,
    external: PropTypes.bool,
    story: PropTypes.bool,
    menu: PropTypes.node,
    colorScheme: PropTypes.string,
}

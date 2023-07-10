import React from 'react'
import PropTypes from 'prop-types'
import { Caption } from '@sbol/design-system/core/typography'
import { IconLoader } from '@sbol/design-system/core/icon'

import { ListItemImage } from './list-item-img'
import { Reverse } from './reverse'
import { OuterStyled, InnerStyled, CenterStyled, ItemTitleStyled } from './style'

export const ListItem = ({
    label,
    title,
    description,
    icon,
    children,
    reversed,
    onIconClick,
    ...rest
}) => (
    <OuterStyled {...rest}>
        <Reverse reversed={reversed}>
            {icon && (
                <InnerStyled onClick={onIconClick}>
                    <IconLoader name={icon.name} colorScheme={icon.colorScheme} />
                </InnerStyled>
            )}
            <CenterStyled>
                {label && (
                    <Caption colorScheme="tertiary" indent="zero">
                        {label}
                    </Caption>
                )}
                <ItemTitleStyled fontWeight={rest.isBold ? 'semibold' : 'regular'}>
                    {title}
                </ItemTitleStyled>
                {description && (
                    <Caption colorScheme="tertiary" indent="zero">
                        {description}
                    </Caption>
                )}
            </CenterStyled>
            <InnerStyled>{children}</InnerStyled>
        </Reverse>
    </OuterStyled>
)

ListItem.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    reversed: PropTypes.bool,
    children: PropTypes.node,
    icon: PropTypes.object,
    onIconClick: PropTypes.func
}

ListItem.defaultProps = {
    label: null,
    description: null,
    reversed: false,
    children: null,
    icon: null,
    onIconClick: () => {}
}

ListItem.Image = ListItemImage

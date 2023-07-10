import React from 'react'
import { PropTypes } from 'prop-types'

import {
    CardBodyStyled,
    CardTitleStyled,
    CardDescriptionStyled
} from './card.style'

export const CardBody = ({
    size,
    title,
    description
}) => (
    <CardBodyStyled>
        <CardTitleStyled
            size={size}
            title={title}
            description={Boolean(description)}
            fontWeight="medium"
        >
            {title}
        </CardTitleStyled>

        {description && (
            <CardDescriptionStyled
                size={size === 'lg' ? 'md' : 'sm'}
                title={description}
            >
                {description}
            </CardDescriptionStyled>
        )}
    </CardBodyStyled>
)

CardBody.propTypes = {
    size: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
}

import React from 'react'
import PropTypes from 'prop-types'

import { ListItemImageStyled, InnerStyled, ItemTitleStyled, ImageContainerStyled } from './style'

export const ListItemImage = ({ img, title, children, Image, ...rest }) => (
    <ListItemImageStyled {...rest}>
        <ImageContainerStyled>{Image || <img src={img} alt={title} />}</ImageContainerStyled>
        <InnerStyled>
            {title ? <ItemTitleStyled>{title}</ItemTitleStyled> : <div>{children}</div>}
        </InnerStyled>
    </ListItemImageStyled>
)

ListItemImage.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    img: PropTypes.string,
    Image: PropTypes.node
}

ListItemImage.defaultProps = {
    img: null,
    title: null,
    children: null,
    Image: null
}

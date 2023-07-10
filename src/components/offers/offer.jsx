import React from 'react'
import PropTypes from 'prop-types'

import {
    DescriptionStyled,
    IconStyled,
    OfferStyled,
    TitleStyled,
    ImgWrapperStyled,
    ImgStyled
} from './style'

const Offer = ({ title, description, img, onClick, iconName, iconUrl, disabled }) => {
    return (
        <OfferStyled img={img} disabled={disabled} onClick={disabled ? void 0 : onClick}>
            {!img && !iconUrl && <IconStyled name={iconName} />}
            {iconUrl && (
                <ImgWrapperStyled>
                    <ImgStyled src={iconUrl} />
                </ImgWrapperStyled>
            )}
            <TitleStyled img={img}>{title}</TitleStyled>
            {description && (
                <DescriptionStyled indent="zero" colorScheme={img ? 'noColor' : 'tertiary'}>
                    {description}
                </DescriptionStyled>
            )}
        </OfferStyled>
    )
}

Offer.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    img: PropTypes.string,
    iconName: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    iconUrl: PropTypes.string
}

Offer.defaultProps = {
    img: null,
    description: null,
    iconName: 'icon:core/common/ic_24_arrow_right_alt1',
    onClick: void 0,
    disabled: false,
    iconUrl: null
}

export default Offer

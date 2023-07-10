import React from 'react'
import PropTypes from 'prop-types'
import { HorizontalScroll } from '@sbol/design-system/core/horizontal-scroll'

import { useWindowSize } from '../../utils'
import Offer from './offer'
import { OffersWrapperStyled } from './style'

const mobileWidth = 732

const Offers = ({ children }) => {
    const { width } = useWindowSize()
    const component = <OffersWrapperStyled>{children}</OffersWrapperStyled>

    if (width < mobileWidth) {
        return <HorizontalScroll>{component}</HorizontalScroll>
    }

    return component
}

Offers.propTypes = {
    children: PropTypes.node.isRequired
}

Offers.Offer = Offer

export default Offers

import React from 'react'
import PropTypes from 'prop-types'

import { InfoCardStyled } from './style'

export const InfoCard = ({ children, noPadding }) => (
    <InfoCardStyled noPadding={noPadding}>{children}</InfoCardStyled>
)

InfoCard.defaultProps = {
    noPadding: false
}

InfoCard.propTypes = {
    children: PropTypes.node.isRequired,
    noPadding: PropTypes.bool
}

export default InfoCard

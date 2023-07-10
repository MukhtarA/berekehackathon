import React from 'react'
import PropTypes from 'prop-types'

import { GroupTitleStyled } from './value-select.style'

export const mapTypographySize = {
    lg: 'md',
    md: 'sm'
}

export const ValueSubheader = ({ title = '', size = 'md' }) => (
    <GroupTitleStyled size={mapTypographySize[size]}>
        {title}
    </GroupTitleStyled>
)

ValueSubheader.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

import React from 'react'
import PropTypes from 'prop-types'

import { BadgeStyled } from './style'

const Badge = ({ value, ...props }) => {
    return <BadgeStyled {...props}>{value}</BadgeStyled>
}

Badge.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

export default Badge

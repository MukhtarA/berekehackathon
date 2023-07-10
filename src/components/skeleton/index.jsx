import React from 'react'
import PropTypes from 'prop-types'

import { SkeletonStyled } from './style'
import SkeletonHeader from './skeleton-header'
import SkeletonFooter from './skeleton-footer'

const Skeleton = ({ width, height, marginTop, borderRadius, isPulse }) => {
    return (
        <SkeletonStyled
            $width={width}
            $height={height}
            marginTop={marginTop}
            borderRadius={borderRadius}
            isPulse={isPulse}
        />
    )
}

Skeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    marginTop: PropTypes.string,
    borderRadius: PropTypes.string,
    isPulse: PropTypes.bool
}

Skeleton.defaultProps = {
    width: '0px',
    height: '0px',
    marginTop: '0px',
    borderRadius: '0px',
    isPulse: true
}

Skeleton.Header = SkeletonHeader
Skeleton.Footer = SkeletonFooter

export default Skeleton

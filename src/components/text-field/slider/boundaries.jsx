import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber, makeMoneyMask } from '../../utils'

import { BoundariesStyled } from './slider.style'
import { getBoundaries, getValuePrefixSuffix } from './utils'

const mapTypographySize = {
    lg: 'md',
    md: 'sm',
    sm: 'sm',
}

export const Boundaries = (props) => {
    const { prefix, suffix, size, options } = props
    const { min, max } = getBoundaries(props)

    return (
        <BoundariesStyled
            size={mapTypographySize[size]}
            verticalMargin="micro"
            colorScheme="secondary"
        >
            <span>
                {getValuePrefixSuffix(
                    options
                        ? min
                        : formatNumber(min, makeMoneyMask({ padFractionalZeros: false })),
                    prefix,
                    typeof suffix === 'string' ? suffix : suffix?.min
                )}
            </span>
            <span>
                {getValuePrefixSuffix(
                    options
                        ? max
                        : formatNumber(max, makeMoneyMask({ padFractionalZeros: false })),
                    prefix,
                    typeof suffix === 'string' ? suffix : suffix?.max
                )}
            </span>
        </BoundariesStyled>
    )
}


Boundaries.propTypes = {
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    prefix: PropTypes.string,
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        max: PropTypes.string,
        min: PropTypes.string,
        value: PropTypes.string,
    })]),
    grid: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    )
}

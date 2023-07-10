import React from 'react'
import PropTypes from 'prop-types'

import { makeDelimiters } from './utils'
import { SegmentsStyled, SegmentStyled } from './slider.style'

export const Segments = ({ min, max, step, grid }) => {
    const delimiters = makeDelimiters(min, max, step, grid)

    if (!delimiters || !delimiters.length) {
        return null
    }

    return (
        <SegmentsStyled>
            {delimiters.map((left) => (
                <SegmentStyled
                    key={left}
                    style={{ left: `${left}%` }}
                />
            ))}
        </SegmentsStyled>
    )
}

Segments.propTypes = {
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    grid: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
}

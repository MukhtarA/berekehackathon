import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { BackdropStyled } from './style'

const Backdrop = ({ open, zIndex, onClose, blur, dataTestId }) => {
    const [animOpen, setAnimOpen] = useState(false)

    const handleClose = useCallback(() => {
        if (typeof onClose === 'function') {
            setAnimOpen(!animOpen)
            setTimeout(() => {
                onClose()
            }, 550)
        }
    }, [animOpen, onClose])

    useEffect(() => {
        if (open) {
            setAnimOpen(true)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = null
        }
    }, [open])

    return open ? (
        <BackdropStyled
            $open={open}
            animOpen={animOpen}
            $zIndex={zIndex}
            onClick={handleClose}
            blur={blur}
            data-testid={dataTestId}
        />
    ) : null
}

Backdrop.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    blur: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zIndex: PropTypes.number,
    dataTestId: PropTypes.string
}

Backdrop.defaultProps = {
    zIndex: 1000,
    blur: 0,
    dataTestId: null
}

export default Backdrop

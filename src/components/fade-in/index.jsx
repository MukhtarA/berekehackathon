import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { FadeInStyled } from './style'

const FadeIn = ({ fadeUp, children }) => {
    const ref = useRef()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(ref.current)
                }
            },
            { rootMargin: '0px' }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])

    return (
        <FadeInStyled ref={ref} isVisible={isVisible} fadeUp={fadeUp}>
            {children}
        </FadeInStyled>
    )
}

FadeIn.propTypes = {
    children: PropTypes.node.isRequired,
    fadeUp: PropTypes.bool
}

FadeIn.defaultProps = {
    fadeUp: false
}

export default FadeIn

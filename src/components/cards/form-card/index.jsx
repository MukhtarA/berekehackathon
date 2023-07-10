import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Title } from './title'
import { SectionStyled, HeadingStyled, ContentStyled } from './style'

export const FormCard = ({ children, title, upComing, isFinished, alwaysShow = false }) => {
    const [expanded, setExpanded] = useState(!isFinished)
    const handleToggle = useCallback(() => setExpanded(!expanded), [expanded])

    useEffect(() => {
        if (isFinished) {
            setExpanded(alwaysShow)
        }
    }, [isFinished, alwaysShow])

    return (
        <SectionStyled upComing={upComing}>
            <HeadingStyled onClick={handleToggle} type="button">
                <Title
                    title={title}
                    isFinished={isFinished}
                    upComing={upComing}
                    expanded={expanded}
                />
            </HeadingStyled>
            {!upComing && expanded && <ContentStyled>{children}</ContentStyled>}
        </SectionStyled>
    )
}

FormCard.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    upComing: PropTypes.bool,
    isFinished: PropTypes.bool,
    alwaysShow: PropTypes.bool
}

FormCard.defaultProps = {
    title: void 0,
    upComing: false,
    isFinished: false,
    alwaysShow: false
}

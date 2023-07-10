import React from 'react'
import PropTypes from 'prop-types'

import { Container } from '../indent-wrapper'
import { HEADERS, Typography } from '../typography'

import { WrapperStyled } from './button.dashed.style'

export const ButtonDashed = ({
    title,
    colorScheme,
    size = 'md',
    fontWeight,
    horizontalMargin = 'inner',
    verticalMargin = 'zero',
    onClick,
    ...rest
}) => (
    <Container>
        <WrapperStyled
            onClick={onClick}
            horizontalMargin={horizontalMargin}
            verticalMargin={verticalMargin}
            colorScheme={colorScheme}
            {...rest}
        >
            {title && <Typography
                as={HEADERS.includes(size) ? size : 'span'}
                verticalMargin="zero"
                size={size}
                fontWeight={fontWeight}
            >
                {title}
            </Typography>}
        </WrapperStyled>
    </Container>
)

ButtonDashed.propTypes = {
    title: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'h1', 'h2', 'h3', 'h4', 'h5']),
    fontWeight: PropTypes.oneOf(['regular', 'medium', 'semibold']),
    colorScheme: PropTypes.oneOf(['success', 'warning', 'info', 'primary']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    onClick: PropTypes.func,
}

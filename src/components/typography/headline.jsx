import React from 'react'
import PropTypes from 'prop-types'

import { HeadlineStyled } from './headline.style'

const defaultProps = {
    fontWeight: 'semibold',
    indent: 'open',
    colorScheme: 'primary'
}

export const Headline1 = ({
    fontWeight = defaultProps.fontWeight,
    indent = defaultProps.indent,
    colorScheme = defaultProps.colorScheme,
    ...rest
}) => (
    <HeadlineStyled
        variant="h1"
        as="h1"
        fontWeight={fontWeight}
        indent={indent}
        colorScheme={colorScheme}
        {...rest}
    />
)
export const Headline2 = ({
    fontWeight = defaultProps.fontWeight,
    indent = defaultProps.indent,
    colorScheme = defaultProps.colorScheme,
    ...rest
}) => (
    <HeadlineStyled
        variant="h2"
        as="h2"
        fontWeight={fontWeight}
        indent={indent}
        colorScheme={colorScheme}
        {...rest}
    />
)
export const Headline3 = ({
    fontWeight = defaultProps.fontWeight,
    indent = defaultProps.indent,
    colorScheme = defaultProps.colorScheme,
    ...rest
}) => (
    <HeadlineStyled
        variant="h3"
        as="h3"
        fontWeight={fontWeight}
        indent={indent}
        colorScheme={colorScheme}
        {...rest}
    />
)
export const Headline4 = ({
    fontWeight = defaultProps.fontWeight,
    indent = defaultProps.indent,
    colorScheme = defaultProps.colorScheme,
    ...rest
}) => (
    <HeadlineStyled
        variant="h4"
        as="h4"
        fontWeight={fontWeight}
        indent={indent}
        colorScheme={colorScheme}
        {...rest}
    />
)
export const Headline5 = ({
    fontWeight = defaultProps.fontWeight,
    indent = defaultProps.indent,
    colorScheme = defaultProps.colorScheme,
    ...rest
}) => (
    <HeadlineStyled
        variant="h5"
        as="h5"
        fontWeight={fontWeight}
        indent={indent}
        colorScheme={colorScheme}
        {...rest}
    />
)

const propTypes = {
    children: PropTypes.node.isRequired,
    fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular']),
    indent: PropTypes.oneOf(['open', 'inner', 'zero']),
    colorScheme: PropTypes.string
}

Headline1.propTypes = propTypes
Headline2.propTypes = propTypes
Headline3.propTypes = propTypes
Headline4.propTypes = propTypes
Headline5.propTypes = propTypes

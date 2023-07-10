import React from 'react'
import PropTypes from 'prop-types'
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from '@sbol/design-system/core/button'

import { LinkStyled } from './style'
import { LinkButton } from '../link-button'

export const withLink = (Component) => {
    const Wrapper = ({ to, title, replace, ...props }) => {
        return (
            <LinkStyled to={to} replace={replace}>
                <Component title={title} {...props} />
            </LinkStyled>
        )
    }

    Wrapper.propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.shape, PropTypes.func]).isRequired,
        title: PropTypes.string.isRequired,
        replace: PropTypes.bool
    }

    Wrapper.defaultProps = {
        replace: false
    }

    return Wrapper
}

export default withLink(LinkButton)

export const NavigatePrimary = withLink(ButtonPrimary)

export const NavigateSecondary = withLink(ButtonSecondary)

export const NavigateTertiary = withLink(ButtonTertiary)

import React from 'react'
import PropTypes from 'prop-types'
import { extend, noop } from 'lodash'

import { disableHandler } from '../utils/handlers'
import { getDisplayName } from '../utils/get-display-name'

import { ButtonBase } from './button.base'

export const buttonFactory = (ButtonStyled) => {
    const WrappedComponent = ({
        title,
        icon,
        iconName,
        loading = false,
        size = 'md',
        onClick = noop,
        iconReverse = false,
        fontWeight = 'medium',
        ...rest
    }) => {
        const passedProps = extend(rest, {
            onClick: disableHandler(onClick, loading),
            'aria-label': title,
            'aria-live': 'polite',
            'aria-busy': loading,
            icon: icon || iconName,
            iconReverse,
            isLoading: loading,
            size,
        })

        return (
            <ButtonStyled {...passedProps}>
                <ButtonBase
                    title={title}
                    size={size}
                    icon={icon}
                    iconName={iconName}
                    iconReverse={iconReverse}
                    fontWeight={fontWeight}
                />
            </ButtonStyled>
        )
    }

    WrappedComponent.displayName = `Based${getDisplayName(ButtonStyled)}`
    WrappedComponent.propTypes = {
        title: PropTypes.string,
        icon: PropTypes.string,
        iconName: PropTypes.string,
        loading: PropTypes.bool,
        size: PropTypes.oneOf(['md', 'sm', 'lg']),
        onClick: PropTypes.func,
        iconReverse: PropTypes.bool,
        fullWidth: PropTypes.bool,
        fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular']),
    }

    return WrappedComponent
}

import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { omit, uniqueId } from 'lodash'

import { getDisplayName } from '../utils/get-display-name'

import { Suggest } from './suggest'

export const SuggestInjector = ({
    id,
    children,
    onClick = () => {},
    options = [],
    disabled,
    size,
    a11y
}) => {
    const wrappedComponentA11y = useMemo(() => omit(a11y, ['listLabel', 'buttonLabel']), [a11y])

    const suggestA11y = useMemo(() => ({
        listLabel: a11y?.listLabel,
        buttonLabel: a11y?.buttonLabel
    }), [a11y])

    const WrappedComponent = useMemo(() =>
        React.cloneElement(children, {
            a11y: wrappedComponentA11y
        })
    , [children])

    return (
        <div
            role="combobox"
            aria-haspopup="false"
            aria-expanded="true"
        >
            {WrappedComponent}

            <Suggest
                id={id}
                options={options}
                onClick={onClick}
                size={size}
                disabled={disabled}
                a11y={suggestA11y}
            />
        </div>
    )
}

export const withSuggest = (Component) => {
    const WrappedComponent = ({
        onSuggestClick = () => {},
        options = [],
        a11y,
        ...props
    }) => {
        const suggestListId = useMemo(() => uniqueId('suggest-list-'), [])

        return (
            <SuggestInjector
                id={suggestListId}
                options={options}
                onClick={onSuggestClick}
                disabled={props.disabled}
                size={props.size}
                a11y={a11y}
            >
                <Component
                    {...props}
                    aria-autocomplete="list"
                    aria-controls={suggestListId}
                />
            </SuggestInjector>
        )
    }


    WrappedComponent.displayName = `Suggest${getDisplayName(Component)}`
    WrappedComponent.propTypes = {
        className: PropTypes.string,
        verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        options: PropTypes.arrayOf(PropTypes.string),
        onSuggestClick: PropTypes.func,
        disabled: PropTypes.bool,
        a11y: PropTypes.shape({
            listLabel: PropTypes.string,
            buttonLabel: PropTypes.string
        }),
    }

    return WrappedComponent
}

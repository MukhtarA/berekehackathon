import React from 'react'

import { getDisplayName } from '../utils/get-display-name'

import { Labeled } from './labeled'

const getLabeledProps = ({
    value,
    label,
    description,
    error,
    className,
    verticalMargin,
    horizontalMargin,
    size,
    touched,
    hint,
    tooltip
}) => ({
    value,
    label,
    description,
    error,
    className,
    verticalMargin,
    horizontalMargin,
    size,
    touched,
    hint,
    tooltip
})

export const withLabel = (WrappedComponent) => {
    const LabeledComponent = ({ className, ...props }) => (
        <Labeled {...getLabeledProps(props)} className={className}>
            <WrappedComponent {...props} />
        </Labeled>
    )

    LabeledComponent.displayName = `Labeled${getDisplayName(WrappedComponent)}`
    return LabeledComponent
}

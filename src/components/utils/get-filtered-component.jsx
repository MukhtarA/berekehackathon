import React from 'react'
import { pick, omit } from 'lodash'

export const getFilteredComponent = (Component, { passedProps, excludedProps }) => (props) => {
    let filteredProps

    if (passedProps) {
        filteredProps = pick(props, passedProps)

    } else if (excludedProps) {
        filteredProps = omit(props, excludedProps)
    }

    return <Component {...filteredProps} />
}

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'
import Header from './header'
import Title from './title'
import Content from './content'
import { passPropsToChildren } from './utils'

const CollapsiblePanel = ({ children, id }) => {
    const activeActionLabel = useSelector((state) => state.simplePayment.activeActionLabel)
    const [isOpen, toggle] = useState(false)
    const toggleState = () => toggle(!isOpen)

    // TODO: Логика Алсеко, нужно перенести после доработки универсальной формы
    useEffect(() => {
        if (activeActionLabel === id) {
            toggle(true)
            const elementToScroll = document.getElementById(activeActionLabel)
            elementToScroll?.scrollIntoView()
        }
    }, [])

    return <>{passPropsToChildren(children, { isOpen, toggleState, id })}</>
}

CollapsiblePanel.Header = Header
CollapsiblePanel.Title = Title
CollapsiblePanel.Content = Content

CollapsiblePanel.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
}

export default CollapsiblePanel

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import CollapsiblePanel from './collapsible-panel'
import { IconStyled, IconLoaderStyled, TitleStyled, ArrowIconStyled } from './style'
import { passPropsToChildren } from './utils'

const Title = ({
    children,
    as,
    title,
    toggleState,
    isOpen,
    icon,
    iconName,
    colorScheme,
    id,
    customHeader
}) => {
    const toggleStateHandler = useCallback(
        (e) => {
            toggleState()
            e?.stopPropagation()
        },
        [isOpen]
    )

    return customHeader ? (
        passPropsToChildren(children, { toggleState: toggleStateHandler, isOpen, id })
    ) : (
        <CollapsiblePanel.Header
            id={id}
            isOpen={isOpen}
            toggleState={as ? _.noop : toggleStateHandler}
        >
            {icon ? (
                <IconStyled icon={icon} colorScheme={colorScheme} />
            ) : (
                <IconLoaderStyled name={iconName} colorScheme={colorScheme} />
            )}
            {title ? <TitleStyled indent="zero">{title}</TitleStyled> : children}
            {as || <ArrowIconStyled name="icon:core/common/ic_24_chevron_down" isOpen={isOpen} />}
        </CollapsiblePanel.Header>
    )
}

Title.propTypes = {
    title: PropTypes.string,
    iconName: PropTypes.string,
    icon: PropTypes.node,
    toggleState: PropTypes.func,
    id: PropTypes.string,
    colorScheme: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    as: PropTypes.node,
    isOpen: PropTypes.bool,
    customHeader: PropTypes.bool
}

Title.defaultProps = {
    title: '',
    iconName: '',
    icon: void 0,
    toggleState: _.noop,
    id: '',
    colorScheme: '',
    children: void 0,
    as: void 0,
    isOpen: false,
    customHeader: false
}

export default Title

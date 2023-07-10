import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { ic24DotsHorizontal } from '../icon/common'
import { Perimeter } from '../perimeter'
import { keyCodes } from '../utils/dropdown-utils'

import { MenuStyled, ButtonStyled, ListStyled, TypographyStyled, IconViewBoxStyled } from './menu.style'

const getFlatChildren = (children) => {
    if (!Array.isArray(children)) {
        return [children]
    }

    return children.reduce((array, currentChild) => {
        const { children: nestedChildren } = currentChild.props

        if (nestedChildren) {
            // comment: нужно поменять,но убедится что ничего не сломалось
            array = array.concat(nestedChildren)
        } else {
            // comment: нужно поменять,но убедится что ничего не сломалось
            array = array.concat(currentChild)
        }
    
        return array
    }, [])
    
}
export const Menu = ({
    children,
    title,
    icon = ic24DotsHorizontal,
    a11y,
    onOpen = noop,
    onClose = noop,
    size = 'md',
    mode = 'hover',
    position = 'normal',
    className
}) => {
    const flatChildren = useMemo(() => getFlatChildren(children), [children])
    const [expanded, setExpanded] = useState(false)
    const [activeDescendant, setActiveDescendant] = useState('')

    const handleMouseEnter = useCallback(() => {
        setExpanded(true)
    }, [expanded])

    const handleMouseLeave = useCallback(() => {
        setExpanded(false)
    }, [expanded])

    const handleClickOutside = useCallback(() => {
        setExpanded(false)
    }, [expanded])

    const handleClick = useCallback((event) => {
        if (event.keyCode === keyCodes.KEY_ENTER) {
            setActiveDescendant(flatChildren[0])
        }

        setExpanded(!expanded)
    }, [expanded, activeDescendant])

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === keyCodes.KEY_ENTER) {
            event.preventDefault()
            setExpanded(true)

            setActiveDescendant(flatChildren[0])
        }
    })

    const handleListKeyDown = useCallback((event) => {
        switch (event.keyCode) {
            case keyCodes.KEY_ESCAPE:
            case keyCodes.KEY_TAB: {
                setExpanded(false)
                setActiveDescendant('')

                break
            }

            case keyCodes.KEY_ARROW_DOWN: {
                event.preventDefault()
                const prevActiveDescedant = event.target.textContent
                const nextActiveDescedantIndex = flatChildren.findIndex((child) => child.props.title === prevActiveDescedant) + 1
                if (flatChildren.length > nextActiveDescedantIndex) {
                    setActiveDescendant(flatChildren[nextActiveDescedantIndex])
                } else {
                    setActiveDescendant(flatChildren[0])
                }

                break
            }

            case keyCodes.KEY_ARROW_UP: {
                event.preventDefault()
                const prevActiveDescedant = event.target.textContent
                const nextActiveDescedantIndex = flatChildren.findIndex((child) => child.props.title === prevActiveDescedant) - 1

                if (nextActiveDescedantIndex < 0) {
                    setActiveDescendant(flatChildren[flatChildren.length - 1])
                } else {
                    setActiveDescendant(flatChildren[nextActiveDescedantIndex])
                }

                break
            }

            default: {
                break
            }
        }
    })

    useEffect(() => {
        if (expanded) {
            onOpen()
        } else {
            onClose()
        }
    }, [expanded])

    return (
        <Perimeter onClickOutside={handleClickOutside}>
            <MenuStyled
                size={size}
                position={position}
                expanded={expanded}
                onMouseEnter={mode === 'hover' ? handleMouseEnter : noop}
                onMouseLeave={mode === 'hover' ? handleMouseLeave : noop}
                aria-activedescendant={
                    expanded
                        ? activeDescendant
                        : noop
                }
                className={className}
            >
                <ButtonStyled
                    size={size}
                    onClick={mode === 'click' ? handleClick : noop}
                    onKeyDown={handleKeyDown}
                    aria-haspopup="true"
                    aria-label={!title ? a11y.title : noop}
                    className={className}
                >
                    {title && <TypographyStyled size={size}>{title}</TypographyStyled>}
                    <IconViewBoxStyled
                        icon={icon}
                        size={size}
                    />
                </ButtonStyled>
                <ListStyled
                    size={size}
                    onKeyDown={handleListKeyDown}
                    role="menu"
                >
                    {React.Children.map(children, (child) => React.cloneElement(child, {
                        activeDescendant: activeDescendant && activeDescendant.props.title,
                        onClose: setExpanded
                    }))}
                </ListStyled>
            </MenuStyled>
        </Perimeter>
    )
}

Menu.propTypes = {
    a11y: PropTypes.shape({
        title: PropTypes.string,
    }),
    icon: PropTypes.node,
    children: PropTypes.node,
    title: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    mode: PropTypes.oneOf(['hover', 'click']),
    position: PropTypes.oneOf(['normal', 'overlay']),
    className: PropTypes.string
}

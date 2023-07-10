import React from 'react'
import PropTypes from 'prop-types'
import { noop, indexOf, omit, extend } from 'lodash'

import { AccordionWrapperStyled } from './accordion.style'

const omitProps = ['collapsible']

export const cyclicPrevItem = (list, item) =>
    (indexOf(list, item) - 1 + list.length) % list.length
export const cyclicNextItem = (list, item) =>
    (indexOf(list, item) + 1) % list.length

const KEY_ARROW_UP = 38
const KEY_ARROW_DOWN = 40
const KEY_END = 35
const KEY_HOME = 36
const KEY_ENTER = 13

export class Accordion extends React.PureComponent {
    static defaultProps = {
        onChange: noop,
        onKeyDown: noop,
        collapsible: false,
        size: 'h3'
    }

    constructor (props) {
        super(props)
        this.state = { active: void 0 }
        if (!this.props.collapsible) {
            React.Children.forEach(this.props.children, (child) => {
                if (child?.props?.forceOpened) {
                    this.state = { active: child.props.id }
                }
            })
        }
    }

    handleChange = (active, event, isClosing) => {
        const currentActive = this.state.active === active ? void 0 : active
        this.setState({ active: currentActive })
        this.props.onChange(active, event, isClosing)
    }

    handleKeyDown = (id, event) => {
        const options = React.Children.map(this.props.children, (child) => child.props.id)

        switch (event?.keyCode) {
            case KEY_ARROW_DOWN:
            case KEY_ARROW_UP: {
                event.preventDefault()
                this.focus(id)
                break
            }
            case KEY_HOME: {
                event.preventDefault()
                this.focus(0)
                break
            }
            case KEY_END: {
                event.preventDefault()
                this.focus(options.length - 1)
                break
            }
            case KEY_ENTER: {
                event.preventDefault()
                const currentActive = this.state.active === id ? void 0 : id
                this.setState({ active: currentActive })
                this.props.onChange(currentActive, event)
                break
            }
            default: {
                break
            }
        }

        this.props.onKeyDown(event)
    }

    focus = (id) => {
        const newItem = document.getElementById(`${id}-title`)

        if (newItem) {
            newItem.focus()
        }
    }

    render () {
        return (
            <AccordionWrapperStyled
                {...omit(this.props, omitProps)}
                role="presentation"
            >
                {React.Children.map(this.props.children, this.renderChild)}
            </AccordionWrapperStyled>
        )
    }

    renderChild = (child) => {
        const { collapsible, size } = this.props

        return React.isValidElement(child) && React.cloneElement(
            child,
            extend({}, child.props, {
                forceOpened: this.state.active === child.props?.id || (collapsible && child.props.forceOpened),
                collapsible,
                size,
                onChange: this.handleChange,
                onKeyDown: this.handleKeyDown
            })
        )
    }
}

Accordion.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
     * Если нужно держать открытыми несколько блоков
     */
    collapsible: PropTypes.bool,
    size: PropTypes.oneOf(['h3', 'h4', 'h5']),
}

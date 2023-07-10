import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ScreenLayout } from '../screen-layout'
import { ModalStyled, ModalMaskStyled, DragableWrapperStyled, ThumbStyled } from './style'

const Portal = ({ children }) => {
    const root = document.getElementById('app')

    return ReactDOM.createPortal(children, root)
}

export const Modal = ({
    title,
    placeholder,
    children,
    border,
    fullHeight,
    iconName,
    noPadding,
    footer,
    onClose,
    isDraggable,
    ...rest
}) => {
    const history = useHistory()
    const selectableRef = useRef()
    const [open, setOpen] = useState(false)
    const [sheetHeight, setSheetHeight] = useState()
    const [dragPosition, setDragPosition] = useState()
    const [fixedHeight, setFixedHeight] = useState()

    const closeDialog = useCallback(() => {
        setOpen(false)
        setTimeout(() => {
            if (typeof onClose === 'function') {
                onClose()
            } else {
                history.goBack()
            }
        }, 300)
    }, [history, onClose])

    const touchPosition = useCallback((event) => {
        return event.touches ? event.touches[0] : event
    }, [])

    useEffect(() => {
        setOpen(true)

        if (fullHeight) {
            setSheetHeight(100)
        } else {
            setSheetHeight((selectableRef.current?.clientHeight / window.screen.height) * 100 + 3.7)
        }
    }, [fullHeight])

    useEffect(() => {
        if (fullHeight) {
            setFixedHeight(100)
        } else {
            setFixedHeight((selectableRef.current?.clientHeight / window.screen.height) * 100 + 3.7)
        }
    }, [fullHeight])

    const onDragStart = useCallback(
        (event) => {
            setDragPosition(touchPosition(event).pageY)
            selectableRef.current = true
        },
        [touchPosition]
    )

    const onDragMove = useCallback(
        (event) => {
            const y = touchPosition(event).pageY
            const deltaY = dragPosition - y
            const deltaHeight = (deltaY / window.innerHeight) * 100
            const sumHeight = sheetHeight + deltaHeight
            setSheetHeight(sumHeight > 0 ? sumHeight : 0)
            setDragPosition(y)
        },
        [dragPosition, sheetHeight, touchPosition]
    )

    const onDragEnd = useCallback(() => {
        setDragPosition()
        selectableRef.current = false

        if (sheetHeight < fixedHeight || (fullHeight && sheetHeight > 100)) {
            closeDialog()
        } else {
            setSheetHeight(fixedHeight)
        }
    }, [closeDialog, fixedHeight, fullHeight, sheetHeight])

    return (
        <Portal>
            <ModalMaskStyled onClick={closeDialog} open={open} />
            <ModalStyled
                border={isDraggable || border}
                maxHeight={`${window.screen.height}px`}
                height={`${sheetHeight}vh`}
                open={open}
                fullHeight={fullHeight}
                onTouchStart={isDraggable ? onDragStart : null}
                onTouchMove={isDraggable ? onDragMove : null}
                onTouchEnd={isDraggable ? onDragEnd : null}
                selectable={selectableRef.current}
                ref={selectableRef}
            >
                {isDraggable && (
                    <DragableWrapperStyled>
                        <ThumbStyled />
                    </DragableWrapperStyled>
                )}
                {title && (
                    <ScreenLayout.Header
                        iconName={iconName}
                        title={title}
                        {...rest}
                        onClick={closeDialog}
                    />
                )}
                {placeholder && (
                    <ScreenLayout.Header
                        iconName={iconName}
                        placeholder={placeholder}
                        {...rest}
                        onClick={closeDialog}
                    />
                )}
                <ScreenLayout.Content noPadding={noPadding}>
                    <div>{children}</div>
                </ScreenLayout.Content>
                {footer && <ScreenLayout.Footer>{footer}</ScreenLayout.Footer>}
            </ModalStyled>
        </Portal>
    )
}

Modal.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.string,
    children: PropTypes.node,
    border: PropTypes.bool,
    fullHeight: PropTypes.bool,
    iconName: PropTypes.string,
    noPadding: PropTypes.bool,
    isDraggable: PropTypes.bool,
    footer: PropTypes.node,
    onClose: PropTypes.func
}

Modal.defaultProps = {
    title: null,
    placeholder: null,
    children: null,
    border: false,
    fullHeight: false,
    iconName: 'icon:core/common/ic24ArrowLeft',
    isDraggable: false,
    noPadding: false,
    footer: null,
    onClose: null
}

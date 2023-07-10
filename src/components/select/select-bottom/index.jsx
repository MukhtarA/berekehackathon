import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { ButtonPrimary } from '@sbol/design-system/core/button'
import { Caption } from '@sbol/design-system/core/typography'
import { withLabel } from '@sbol/design-system/core/labeled/with-label'
import chevronDown from '@sbol/design-system/core/icon/common/ic-24-chevron-down.svg'
import chevronUp from '@sbol/design-system/core/icon/common/ic-24-chevron-up.svg'

import { Modal } from '@web_sbol/shared/src/components/modal'
import { OuterStyled, IconStyled, PlaceholderStyled } from './style'

export const SelectBottom = ({
    name,
    render,
    value,
    placeholder,
    acceptButtonTitle,
    modalTitle,
    modalSearch,
    btnDisabled,
    onSearch,
    onClose,
    onAccept,
    onSubmit,
    ...props
}) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = useCallback(() => {
        setOpen(false)
        onAccept()
    }, [onAccept])

    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
        onClose()
    }, [onClose])

    return (
        <>
            <input name={name} type="hidden" value={value} />
            <OuterStyled onClick={handleOpen}>
                {value ? (
                    <Caption verticalMargin="none">{value}</Caption>
                ) : (
                    <PlaceholderStyled>{placeholder}</PlaceholderStyled>
                )}
                <IconStyled icon={open ? chevronUp : chevronDown} />
            </OuterStyled>
            {open && (
                <Modal
                    title={modalTitle}
                    placeholder={modalSearch}
                    autoFocus={false}
                    footer={
                        <ButtonPrimary
                            type={onSubmit ? 'submit' : 'button'}
                            title={acceptButtonTitle}
                            disabled={btnDisabled}
                            fullWidth
                            onClick={onSubmit || handleSubmit}
                        />
                    }
                    onClose={handleClose}
                    onChange={onSearch}
                    {...props}
                >
                    {render()}
                </Modal>
            )}
        </>
    )
}

export const SelectBottomLabeled = withLabel(SelectBottom)

SelectBottom.propTypes = {
    placeholder: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    acceptButtonTitle: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    modalTitle: PropTypes.string,
    modalSearch: PropTypes.string,
    btnDisabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    onSearch: PropTypes.func,
    onClose: PropTypes.func,
    onAccept: PropTypes.func
}

SelectBottom.defaultProps = {
    name: '',
    value: '',
    acceptButtonTitle: '',
    modalTitle: null,
    modalSearch: null,
    btnDisabled: false,
    onSubmit: null,
    onSearch: () => {},
    onClose: () => {},
    onAccept: () => {}
}

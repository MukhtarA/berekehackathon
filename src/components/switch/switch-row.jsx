import React from 'react'
import PropTypes from 'prop-types'
import { IconLoader } from '@sbol/design-system/core/icon'

import Switch from './switch'
import { SwitchRowStyled, HeadlineStyled, TypographyStyled, RowStyled, InfoStyled } from './style'

const SwitchRow = ({ title, description, icon, ...rest }) => {
    return (
        <SwitchRowStyled>
            <RowStyled>
                <IconLoader name={icon} colorScheme="brandPrimary" />
                <InfoStyled>
                    <HeadlineStyled indent="zero">{title}</HeadlineStyled>
                    <TypographyStyled colorScheme="tertiary">{description}</TypographyStyled>
                </InfoStyled>
            </RowStyled>
            <Switch {...rest} />
        </SwitchRowStyled>
    )
}

SwitchRow.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    icon: PropTypes.string
}

SwitchRow.defaultProps = {
    checked: false,
    onChange: void 0,
    icon: '',
    description: ''
}

export default SwitchRow

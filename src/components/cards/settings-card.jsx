import React from 'react'
import PropTypes from 'prop-types'

import { SettingsCardStyled, UlWrapperStyled, LiSectionStyled } from './style'

export const SettingsCard = ({ children }) => (
    <SettingsCardStyled>
        <UlWrapperStyled>
            {React.Children.map(children, (child) => (
                <LiSectionStyled>{child}</LiSectionStyled>
            ))}
        </UlWrapperStyled>
    </SettingsCardStyled>
)

SettingsCard.propTypes = {
    children: PropTypes.node.isRequired
}

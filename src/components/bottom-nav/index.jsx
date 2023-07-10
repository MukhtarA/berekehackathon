import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import { ScreenLayout } from '@web_sbol/shared/src/components/screen-layout'

const BottomNav = ({ menu }) => {
    const { t } = useTranslation()

    return (
        <ScreenLayout.Footer>
            <ScreenLayout.BottomTabs fullWidth>
                {_.map(menu, (item) => (
                    <ScreenLayout.BottomTab
                        key={item.title}
                        to={item.url}
                        exact
                        iconName={item.iconName}
                        title={t(item.title)}
                    />
                ))}
            </ScreenLayout.BottomTabs>
        </ScreenLayout.Footer>
    )
}

BottomNav.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            iconName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}

export default BottomNav

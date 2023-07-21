import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Menu, MenuItem } from '../menu'
import { ic24ChevronDown } from '../icon/common'

import { ic24ChevronDownWhite } from '../../assets/common'
import { MenuWrapper } from './style'
import { languages } from '../../constants/languages'
import { getLanguage } from '../auth'

const LanguageMenu = ({ isWhite }) => {
    const { i18n } = useTranslation()
    const selected = getLanguage()
    const [languagesList, setLanguagesList] = useState(languages)
    const [selectedLanguage, setSelectedLanguage] = useState(_.find(languages, ['code', selected]))

    const findSetSelected = (key) => {
        setSelectedLanguage(_.find(languages, ['code', key]))
    }

    useEffect(() => {
        findSetSelected(selected)
        // i18n.changeLanguage(selected)
        //     .then(() => setLanguagesList(_.filter(languages, (item) => item.code !== selected)))
        //     .catch((e) => console.log(e))
    }, [])

    const handleSelect = (key) => {
        findSetSelected(key)
        setLanguagesList(_.filter(languages, (item) => item.code !== key))
        localStorage.setItem('language', key)
        i18n.changeLanguage(key)
            .then(() => {
                window.location.reload()
            })
   
            .catch((e) => console.log(e))
    }

    return (
        <MenuWrapper isWhite={isWhite}>
            <Menu
                icon={isWhite ? ic24ChevronDownWhite : ic24ChevronDown}
                id="language-menu"
                title={selectedLanguage?.short}
                a11y={{ title: selectedLanguage?.short }}
                mode="click"
            >
                {languagesList.map((item) => {
                    return (
                        <MenuItem
                            title={item.long}
                            value={item.code}
                            onClick={() => handleSelect(item.code)}
                            key={item.code}
                            icon={`icon:core/common/${item.icon}`}
                        />
                    )
                })}
            </Menu>
        </MenuWrapper>
    )
}

LanguageMenu.propTypes = {
    isWhite: PropTypes.bool
}

LanguageMenu.defaultProps = {
    isWhite: false
}

export default LanguageMenu

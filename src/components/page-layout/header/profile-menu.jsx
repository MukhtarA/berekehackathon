import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { Translation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { ic24ChevronDown } from '@sbol/design-system/core/icon/common'

import { Menu } from '@sbol/design-system/core/menu'
import {
    fetchProfile,
    fetchUserStatus,
    logout
} from '@web_sbol/index/src/features/profile/profile-slice'
import { capitalizeString } from '../../../utils'
import { removeTokens } from '../../auth'
import { UserMenuWrapperStyled, MenuItemStyled } from './header.style'
import { DEFAULT } from '../../../constants'

const ProfileMenu = () => {
    const { push } = useHistory()
    const dispatch = useDispatch()
    const { status, fullName, userStatus } = useSelector((state) => state.profile) || {}

    const firstName = _.get(fullName, 'fname', '')
    const lastName = _.get(fullName, 'lname', '')

    const handleLogout = useCallback(() => {
        removeTokens()
        dispatch(logout())
        push('/login')
    }, [push, dispatch])

    const handleOpenProfile = useCallback(() => {
        push('/settings')
    }, [push])

    useEffect(() => {
        if (status === DEFAULT) {
            dispatch(fetchProfile())
            dispatch(fetchUserStatus())
        }

        if (userStatus.status === DEFAULT) {
            dispatch(fetchUserStatus())
        }
    }, [status, dispatch, userStatus.status])

    return (
        <Translation ns="shared">
            {(t) => (
                <UserMenuWrapperStyled>
                    <Menu
                        id="profile-menu"
                        title={`${capitalizeString(firstName)} ${lastName.charAt(0) || ''}.`}
                        a11y={{ title: 'profile-menu' }}
                        mode="click"
                        icon={ic24ChevronDown}
                    >
                        <MenuItemStyled
                            title={t('link.settings')}
                            onClick={handleOpenProfile}
                            icon="icon:core/common/ic36Gear"
                        />
                        <MenuItemStyled
                            title={t('link.logout')}
                            onClick={handleLogout}
                            icon="icon:core/common/ic36Rocket"
                            exit
                        />
                    </Menu>
                </UserMenuWrapperStyled>
            )}
        </Translation>
    )
}

export default ProfileMenu

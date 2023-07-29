import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { IconLoader} from '../../../components'
import { Headline4, Typography } from '../../typography'

import {
    HeaderWrapperStyled,
    HeaderStyled,
    HeaderContentStyled,
    SearchIconStyled,
    SearchInputStyled
} from './style'

import searchIcon from './assets/search.svg'
import arrowLeft from './assets/arrow-left.svg'

const Header = ({
    title,
    placeholder,
    autoFocus,
    iconName,
    AdditionalIcon,
    additionalIconName,
    children,
    backgroundImg,
    colorScheme,
    path,
    onClick,
    onAdditionalClick,
    description,
    isHideScroll,
    ...rest
}) => {
    const history = useHistory()
    const headerRef = useRef(null)

    const goBack = useCallback(() => (path ? history.push(path) : history.goBack()), [
        history,
        path
    ])

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (isHideScroll) {
            let prevScrollPos = window.scrollY

            const handleScroll = () => {
                const currentScrollPos = window.scrollY
                const headerElement = headerRef.current

                if (prevScrollPos > currentScrollPos || currentScrollPos < 150) {
                    headerElement.style.top = '0px'
                } else {
                    headerElement.style.top = '-68px'
                }
                prevScrollPos = currentScrollPos
            }

            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [isHideScroll])

    return (
        <HeaderWrapperStyled backgroundImg={backgroundImg} ref={headerRef} {...rest}>
            <HeaderStyled backgroundImg={backgroundImg}>
                <img
                    style={{ width: 25, height: 25, color: '#379535' }}
                    src={arrowLeft}
                    onClick={onClick || goBack}
                />
                <HeaderContentStyled>
                    {title && (
                        <Headline4 indent="zero" colorScheme={colorScheme}>
                            {title}
                        </Headline4>
                    )}
                    {description && (
                        <Typography indent="zero" colorScheme="secondary">
                            {description}
                        </Typography>
                    )}
                    {placeholder && (
                        <>
                            {!autoFocus && <input style={{ display: 'none' }} />}
                            <SearchInputStyled placeholder={placeholder} {...rest} />
                            <SearchIconStyled dangerouslySetInnerHTML={{ __html: searchIcon }} />
                        </>
                    )}
                </HeaderContentStyled>
                {AdditionalIcon ||
                    (additionalIconName && (
                        <IconLoader
                            name={additionalIconName}
                            colorScheme={colorScheme || 'brandPrimary'}
                            onClick={onAdditionalClick}
                        />
                    ))}
            </HeaderStyled>
            {children}
        </HeaderWrapperStyled>
    )
}

Header.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    children: PropTypes.node,
    iconName: PropTypes.string,
    additionalIconName: PropTypes.string,
    AdditionalIcon: PropTypes.node,
    backgroundImg: PropTypes.string,
    colorScheme: PropTypes.string,
    path: PropTypes.string,
    onAdditionalClick: PropTypes.func,
    onClick: PropTypes.func,
    description: PropTypes.string,
    isHideScroll: PropTypes.bool
}

Header.defaultProps = {
    title: null,
    placeholder: null,
    autoFocus: true,
    children: null,
    iconName: 'icon:core/common/ic24ArrowLeft',
    additionalIconName: null,
    AdditionalIcon: null,
    backgroundImg: null,
    colorScheme: null,
    path: null,
    description: null,
    onClick: null,
    isHideScroll: false,
    onAdditionalClick: () => {}
}

export default Header

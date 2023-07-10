import React from 'react'
import PropTypes from 'prop-types'

import { isIE } from '../utils/adaptive'

import { IeCircleStyled, IeBorderStyled,
    IeLoaderStyled, BorderStyled, CircleStyled,
    LoaderIconStyled, LoaderStyled } from './loader-icon.style'

/**
 * Лоадер для иконок и мелких элементов
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const LoaderIcon = ({ size = 'lg', mode }) => {
    if (isIE) {
        return (
            <LoaderIconStyled
                size={size}
            >
                <IeCircleStyled>
                    <IeBorderStyled
                        size={size}
                        mode={mode}
                    />
                    <IeLoaderStyled
                        size={size}
                        mode={mode}
                    />
                    <IeLoaderStyled
                        size={size}
                        mode={mode}
                    />
                    <IeLoaderStyled
                        size={size}
                        mode={mode}
                    />
                </IeCircleStyled>
            </LoaderIconStyled>
        )
    }
    return (
        <LoaderIconStyled
            size={size}
        >
            <CircleStyled
                size={size}
            >
                <BorderStyled
                    cx="50%"
                    cy="50%"
                    r={size === 'sm' ? '6' : '10'}
                    fill="none"
                    size={size}
                    mode={mode}
                />
                <LoaderStyled
                    cx="50%"
                    cy="50%"
                    r={size === 'sm' ? '6' : '10'}
                    fill="none"
                    size={size}
                    mode={mode}
                />
            </CircleStyled>
        </LoaderIconStyled>
    )
}

LoaderIcon.propTypes = {
    /**
     * Размер отображаемого лоадера
     */
    size: PropTypes.oneOf(['sm', 'lg']),
    /**
     * Светлый или темный цвет лоадера
     */
    mode: PropTypes.oneOf(['dark', 'light'])
}

export default LoaderIcon

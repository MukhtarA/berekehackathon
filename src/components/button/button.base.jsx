import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

import { baseX } from '../styles/semantic.config.style'
import { IconWrapperStyled } from '../icon/icon-view.style'

import {
    ButtonContainerStyled,
    ButtonLoadingStyled,
    ButtonTypographyStyled,
    IconLoaderStyled,
    IconStyled,
} from './button.style'

const MAX_TITLE_LENGTH = 7
const iconSizes = {
    sm: baseX * 6,
    md: baseX * 7,
    lg: baseX * 8,
}

export const ButtonBase = ({ title, icon, iconName, size, iconReverse, fontWeight }) => {
    const loaderSize = useMemo(() => (icon && !title) || title?.length <= MAX_TITLE_LENGTH, [])

    return (
        <Fragment>
            <ButtonLoadingStyled size={loaderSize ? 'sm' : 'md'} />

            <ButtonContainerStyled iconReverse={iconReverse}>
                {title && (
                    <ButtonTypographyStyled size={size} fontWeight={fontWeight}>
                        {title}
                    </ButtonTypographyStyled>
                )}

                {iconName && <IconLoaderStyled name={iconName} size={size} />}

                {!iconName && icon && (typeof icon === 'string' ?
                    (<IconStyled size={size} icon={icon} />) :
                    (
                        <IconWrapperStyled
                            width={iconSizes[size] || iconSizes.md}
                            height={iconSizes[size] || iconSizes.md}
                            clipContent={false}
                        >
                            { icon }
                        </IconWrapperStyled>)
                )}
            </ButtonContainerStyled>
        </Fragment>
    )
}


ButtonBase.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['md', 'sm', 'lg']),
    fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular']),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    iconName: PropTypes.string,
    iconReverse: PropTypes.bool,
    iconIndent: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    fullWidth: PropTypes.bool,
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero'])
}

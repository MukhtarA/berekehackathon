import React from 'react'
import PropTypes from 'prop-types'

import { Headline3, Typography } from '../typography'
import { PaddingWrapper } from '../indent-wrapper/padding-wrapper.style'

import {
    ContainerStyled,
    ContentStyled,
    ImageWrapperStyled,
    ImgStyled,
} from './banner.style'

export const Banner = ({
    title,
    description,
    children,
    colorScheme,
    imageSrc,
    srcSet,
    className
}) => (
    <ContainerStyled colorScheme={colorScheme} className={className}>
        <ContentStyled size="h3" verticalPadding="inner">
            {title && <Headline3 indent="zero">{title}</Headline3>}

            {description && (
                <Typography
                    as="div"
                    size="md"
                    verticalMargin="micro"
                    colorScheme="secondary"
                >
                    {description}
                </Typography>
            )}

            {children && (
                <PaddingWrapper verticalPadding="inner">
                    {children}
                </PaddingWrapper>
            )}
        </ContentStyled>

        <ImageWrapperStyled>
            <ImgStyled src={imageSrc} srcSet={srcSet} alt={title} />
        </ImageWrapperStyled>
    </ContainerStyled>
)

Banner.propTypes = {
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    colorScheme: PropTypes.oneOf(['success', 'warning', 'info', 'draft']),
    imageSrc: PropTypes.string,
    srcSet: PropTypes.string,
    className: PropTypes.string
}

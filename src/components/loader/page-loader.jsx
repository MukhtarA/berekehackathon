import React from 'react'
import PropTypes from 'prop-types'

import { WrapperStyled, PageLoaderStyled } from './page-loader.style'

export const PageLoader = ({ className, ...rest }) => (
    <WrapperStyled className={className}>
        <PageLoaderStyled size="md" {...rest} />
    </WrapperStyled>
)

PageLoader.propTypes = {
    className: PropTypes.string
}

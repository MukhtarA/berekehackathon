import React from 'react'

import Skeleton from '..'
import { MarginLeftStyled, SchemaHeaderStyled, SkeletonWrapperStyled } from './style'

const SkeletonHeader = () => {
    return (
        <SchemaHeaderStyled>
            <SkeletonWrapperStyled>
                <Skeleton height="23px" width="23px" borderRadius="50%" />
                <MarginLeftStyled>
                    <Skeleton width="100px" height="6px" />
                </MarginLeftStyled>
            </SkeletonWrapperStyled>
            <Skeleton width="70px" height="15px" borderRadius="3px" />
        </SchemaHeaderStyled>
    )
}

export default SkeletonHeader

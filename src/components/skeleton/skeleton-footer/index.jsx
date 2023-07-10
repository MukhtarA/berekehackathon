import React, { useMemo } from 'react'
import _ from 'lodash'

import Skeleton from '..'
import { FooterItemStyled, FooterWrapperItemStyled, SkeletonFooterWrapper } from './style'

const SkeletonFooter = () => {
    const skeletons = useMemo(() => new Array(3).fill(), [])

    return (
        <SkeletonFooterWrapper>
            {skeletons.map(() => (
                <FooterItemStyled key={_.uniqueId()}>
                    <Skeleton width="24px" height="24px" borderRadius="50%" />
                    <FooterWrapperItemStyled>
                        <Skeleton width="48px" height="4px" />
                    </FooterWrapperItemStyled>
                </FooterItemStyled>
            ))}
        </SkeletonFooterWrapper>
    )
}

export default SkeletonFooter

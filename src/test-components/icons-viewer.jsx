/* eslint-disable react/no-danger */
import React from 'react'
import _ from 'lodash'
import styled from '@emotion/styled'

import * as commonIcons from '../assets/common'

const IconViewer = () => (
    <LayoutStyled>
        {_.map(commonIcons, (icon, name) => (
            <IconWrapperStyled key={name}>
                <p>{`${name}: `}</p>
                <span dangerouslySetInnerHTML={{ __html: icon }} />
            </IconWrapperStyled>
        ))}
    </LayoutStyled>
)

export default IconViewer

export const LayoutStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 64px;
`

export const IconWrapperStyled = styled.div`
    display: flex;
    width: 25%;
    align-items: center;
`

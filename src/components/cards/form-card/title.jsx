import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Headline3 } from '@sbol/design-system/core/typography'

import { IconsWrapperStyled, SuccessIconStyled, ExpandIconStyled } from './style'

export const Title = ({ title, isFinished, upComing, expanded }) => (
    <Fragment>
        <Headline3 indent="zero" colorScheme={upComing ? 'tertiary' : 'primary'}>
            {title}
        </Headline3>
        {!upComing && (
            <IconsWrapperStyled>
                <SuccessIconStyled
                    name="icon:core/common/ic_36_checkmark"
                    isFinished={isFinished}
                />
                <ExpandIconStyled
                    name="icon:core/common/ic_24_chevron_down"
                    expanded={expanded}
                    isFinished={isFinished}
                />
            </IconsWrapperStyled>
        )}
    </Fragment>
)

Title.propTypes = {
    title: PropTypes.string.isRequired,
    isFinished: PropTypes.bool.isRequired,
    upComing: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired
}

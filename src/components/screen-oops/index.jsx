import React from 'react'
import PropTypes from 'prop-types'
import { Headline4 } from '@sbol/design-system/core/typography'
import { Icon } from '@sbol/design-system/core/icon'

import { ScreenLayout } from '@web_sbol/shared/src/components/screen-layout'
import { ImageStyled, TypographyStyled } from './style'

import loadingFailed from '../../assets/loading-failed.svg'

export const ScreenOops = ({ appName, title, text, onBack, description, footer }) => {
    return (
        <ScreenLayout>
            <ScreenLayout.Header
                iconName="icon:core/common/ic24Cross"
                title={appName}
                description={description}
                onClick={onBack}
            />
            <ScreenLayout.Content>
                <ImageStyled>
                    <Icon fullWidth icon={loadingFailed} />
                </ImageStyled>
                <Headline4>{title}</Headline4>
                <TypographyStyled colorScheme="secondary" verticalMargin="inner">
                    {text}
                </TypographyStyled>
            </ScreenLayout.Content>
            {footer && <ScreenLayout.Footer>{footer}</ScreenLayout.Footer>}
        </ScreenLayout>
    )
}

ScreenOops.propTypes = {
    title: PropTypes.string.isRequired,
    appName: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
    onBack: PropTypes.func,
    footer: PropTypes.node
}

ScreenOops.defaultProps = {
    appName: '',
    description: '',
    title: '',
    text: null,
    onBack: () => {},
    footer: null
}

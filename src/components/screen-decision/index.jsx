import React from 'react'
import PropTypes from 'prop-types'
import { Headline2, Typography } from '@sbol/design-system/core/typography'
import { Alert } from '@sbol/design-system/core/alert'

import { StatusStep } from '@web_sbol/shared/src/components/screens/status-screen/status-step'
import { ScreenLayout } from '@web_sbol/shared/src/components/screen-layout'
import { iconNames } from '../../constants/status'
import { IconStyled, DecisionScreenStyled } from './style'

export function ScreenDecision({ mode, title, subtitle, description, text, children, footer }) {
    return (
        <ScreenLayout>
            <ScreenLayout.Content>
                <DecisionScreenStyled mode={mode}>
                    <div>
                        <IconStyled mode={mode} name={iconNames[mode]} />
                        <Headline2 indent="zero">{title}</Headline2>
                    </div>
                    {(subtitle || description) && (
                        <StatusStep mode={mode} title={subtitle} description={description} />
                    )}
                </DecisionScreenStyled>
                {text && (
                    <Alert mode={mode}>
                        <Typography>{text}</Typography>
                    </Alert>
                )}
                {children}
            </ScreenLayout.Content>
            {footer && <ScreenLayout.Footer>{footer}</ScreenLayout.Footer>}
        </ScreenLayout>
    )
}

ScreenDecision.propTypes = {
    mode: PropTypes.oneOf(['success', 'info', 'warning', 'draft']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node
}

ScreenDecision.defaultProps = {
    subtitle: '',
    description: '',
    text: null,
    children: null,
    footer: null
}

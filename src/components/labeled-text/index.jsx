import React from 'react'
import PropTypes from 'prop-types'
import { Caption, Body2 } from '@sbol/design-system/core/typography'
import { IconLoader } from '@sbol/design-system/core/icon'

import { LabeledTextStyled, FlexDivStyled } from './style'

const LabeledText = ({ label, text, icon }) => {
    if (!text) {
        return <></>
    }

    return (
        <LabeledTextStyled>
            {icon ? (
                <FlexDivStyled>
                    <Caption colorScheme="tertiary" verticalMargin="nano">
                        {label}
                    </Caption>
                    &nbsp;
                    <IconLoader name={icon} colorScheme="tertiary" />
                </FlexDivStyled>
            ) : (
                <Caption colorScheme="tertiary" verticalMargin="nano">
                    {label}
                </Caption>
            )}
            <Body2 verticalMargin="zero" fontWeight="semibold">
                {text}
            </Body2>
        </LabeledTextStyled>
    )
}

LabeledText.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string
}

LabeledText.defaultProps = {
    label: '',
    text: '',
    icon: null
}

export default LabeledText

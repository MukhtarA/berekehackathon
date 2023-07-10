import React from 'react'
import PropTypes from 'prop-types'
import { extend, omit, uniqueId, get } from 'lodash'

import { ic36Checkmark, ic36Info, ic36CircleCross } from '../icon/common'
import { Container } from '../indent-wrapper/container'

import { AlertStyled, IconStyled } from './alert.style'
import { AlertDescription, AlertTitle } from './alert-title'

const iconMap = {
    success: ic36Checkmark,
    info: ic36Info,
    warning: ic36CircleCross,
    draft: ic36Info
}

export class Alert extends React.PureComponent {
    titleId = uniqueId('alert-process-title-')
    descriptionId = uniqueId('alert-process-description-')

    render () {
        const { mode, children, a11y, noIcon } = this.props

        const extendValues = {
            role: get(a11y, 'role', 'alert'),
            'aria-describedby': this.descriptionId
        }

        if (a11y?.title) {
            extendValues['aria-label'] = a11y.title
        } else {
            extendValues['aria-labelledby'] = this.titleId
        }

        const passedProps = extend(
            omit(this.props, ['title', 'children', 'size']),
            extendValues
        )

        return (
            <AlertStyled {...passedProps} size="md" verticalMargin="inner">
                {!noIcon && (
                    <IconStyled icon={iconMap[mode]} mode={mode} />
                )}
                <Container size="md" verticalPadding="inner">
                    {React.Children.map(children, (child) => {
                        const typeAlertTitle = child?.type === AlertTitle || child?.type?.displayName === 'AlertTitle'
                        const typeAlertDescription = child?.type === AlertDescription || child?.type?.displayName === 'AlertDescription'

                        if (typeAlertTitle) {
                            return React.cloneElement(child, { id: this.titleId })
                        }
                        
                        if (typeAlertDescription) {
                            return React.cloneElement(child, { id: this.descriptionId })
                        }

                        return child
                    })}
                </Container>
            </AlertStyled>
        )
    }
}

Alert.propTypes = {
    mode: PropTypes.oneOf(['success', 'info', 'draft', 'warning']).isRequired,
    children: PropTypes.node,
    noIcon: PropTypes.bool,
    a11y: PropTypes.shape({
        /**
         * Текст, который должен описывать алерт на тот случай, если title у компонента отсутствует.
         */
        title: PropTypes.string,
        /**
         * Роль алерта под замену
         */
        role: PropTypes.string
    })
}

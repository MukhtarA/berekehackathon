import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { ButtonPrimary } from '@sbol/design-system/core/button'

import { ScreenOops } from '../screen-oops'
import { MobileActions } from '../../utils/mobile-actions'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, title: '', message: '' }
        const { history } = this.props

        history.listen(() => {
            if (this.state.hasError) {
                this.setState({
                    hasError: false,
                    title: '',
                    message: ''
                })
            }
        })
    }

    componentDidCatch(_error, info) {
        this.setState({
            hasError: true,
            title: process.env.ENVIRONMENT !== 'prom' ? String(_error) : '',
            message: String(info.componentStack)
        })
    }

    render() {
        const { t } = this.props

        const handleClose = () => {
            MobileActions.exit()
        }

        if (this.state.hasError) {
            const text = t('front.error')

            return this.props.render ? (
                this.props.render(this.state.title || text, this.state.message)
            ) : (
                <ScreenOops
                    appName={text}
                    title={t('tech.error')}
                    text={this.state.title.length > 0 ? this.state.title : text}
                    // eslint-disable-next-line react/jsx-no-bind
                    onBack={handleClose}
                    // eslint-disable-next-line react/jsx-no-bind
                    footer={
                        // eslint-disable-next-line react/jsx-no-bind
                        <ButtonPrimary onClick={handleClose} title={t('close')} />
                    }
                />
            )
        }

        return this.props.children
    }
}

const routerHOC = withRouter(ErrorBoundary)

ErrorBoundary.propTypes = {
    render: PropTypes.func,
    history: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    children: PropTypes.node
}

ErrorBoundary.defaultProps = {
    children: null,
    render: null
}

export default withTranslation('shared')(routerHOC)

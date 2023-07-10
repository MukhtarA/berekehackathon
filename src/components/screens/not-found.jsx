import React from 'react'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { PageLayout } from '../page-layout'
import { TechnicalErrorStyled, ButtonStyled } from './style'

import error from './assets/error.png'

export const NotFound = ({ title, description }) => (
    <Translation>
        {(t) => (
            <PageLayout>
                <TechnicalErrorStyled
                    title={title || t('notFound')}
                    imageSrc={error}
                    description={description || t('notFound.description')}
                >
                    <Link to="/">
                        <ButtonStyled fontWeight="semibold" title={t('notFound.link')} />
                    </Link>
                </TechnicalErrorStyled>
            </PageLayout>
        )}
    </Translation>
)

NotFound.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
}

NotFound.defaultProps = {
    title: '',
    description: ''
}

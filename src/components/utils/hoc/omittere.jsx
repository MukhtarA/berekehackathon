import React from 'react'
import _ from 'lodash'

import { getDisplayName } from '../get-display-name'

/**
 * @desc Блокировщик props. Полезно для запрета theme, свойств redux-form в тех случаях, когда используется ...spread свойств
 * omittere - Latin omit
 * @param {Array} omitArray - массив свойств, которые должны быть забыты компонентом
 * @param {String} fallbackName - имя, присваиваемое безымянному компоненту
 * @return {function(*=)} - HOC, запрещающий проброс свойств из omitArray
 * */
export const omittere = (omitArray, fallbackName = 'OmittedComponent') => (Component) => {
    const OmittedComponent = (props) => <Component {..._.omit(props, omitArray)} />

    _.forEach(Component, (prop, key) => {
        if (key !== 'childContextTypes') {
            OmittedComponent[key] = prop
        }
    })
    OmittedComponent.displayName = getDisplayName(Component, fallbackName)
    OmittedComponent.propTypes = _.omit(Component.propTypes, omitArray)
    OmittedComponent.WrappedComponent = Component
    OmittedComponent.omitArray = omitArray

    return OmittedComponent
}

/**
 * @desc тема? Какая тема?
 * @param {Function} Component - компонент, который должен забыть про prop theme. У таких компонентов должна быть заранее задана тема в дефолтных свойствах
 * @return {function(*=)} - компонент, без возможности использовать тему
 * */
export const themeKiller = omittere(['theme'], 'UnthemableComponent')

export const inputMetaOmitter = omittere(['input', 'meta'])
export const metaOmitter = omittere([
    'active',
    'asyncValidating',
    'autofilled',
    'dirty',
    'dispatch',
    'hasServerError',
    'initialValue',
    'invalid',
    'pristine',
    'submitFailed',
    'submitting',
    'touched',
    'valid',
    'visited',
    'warning'
])

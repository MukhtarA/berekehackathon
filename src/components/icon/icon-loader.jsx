import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Icon } from './icon'

const SLASH = '/'
// comment: некорректный парсинг jsdoc
/* eslint-disable valid-jsdoc */
/**
 * [Zeplin](https://app.zeplin.io/project/59312e1ebdf1da6fc8d37ffb/dashboard?q=elements%20icons)
 * Компонент для вывода svg-иконок
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export class IconLoader extends React.PureComponent {
    static addIcons = (namespace, promise) => {
        if (typeof promise === 'function') {
            IconLoader.namespaces[namespace] = () => promise()
                .then(({ default: defaultExport = {}, ...namedExport } = {}) => {
                    const icons = { ...namedExport, ...defaultExport }

                    IconLoader.namespaces[namespace] = _.mapKeys(icons, (value, key) => _.camelCase(key))

                    return icons
                })
        } else {
            IconLoader.namespaces[namespace] = _.mapKeys(promise, (value, key) => _.camelCase(key))
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        onError: PropTypes.func,
        onClick: PropTypes.func
    }

    static defaultProps = {
        size: void 0,
        onError: _.noop,
        onClick: _.noop
    }


    componentDidMount () {
        this.loadIcons(this.props)
    }
    // comment: React UNSAFE method
    UNSAFE_componentWillReceiveProps (nextProps) {
        this.loadIcons(nextProps)
    }

    componentWillUnmount () {
        this.unmount = true
    }

    getName = (fullPath) => _.camelCase(_.last(fullPath.split(SLASH)))
    getNamespace = (fullPath) => _.dropRight(fullPath.split(SLASH)).join(SLASH)

    static namespaces = {}

    loadIcons = (props) => {
        const namespace = this.getNamespace(props.name)
        const { onError } = this.props

        if (namespace && _.isFunction(IconLoader.namespaces[namespace])) {
            IconLoader.namespaces[namespace]()
                .then(() => {
                    if (!this.unmount) {
                        this.iconsLoaded = true
                        this.forceUpdate()
                    }
                }).catch(onError)
        } else if (!namespace || _.isEmpty(IconLoader.namespaces[namespace])) {
            onError()
        }
    }

    render () {
        const { name: fullPath, onError } = this.props

        const namespace = this.getNamespace(fullPath)
        const name = this.getName(fullPath)

        if (!_.has(IconLoader.namespaces, [namespace, name])) {
            if (this.iconsLoaded) {
                onError()
            }

            return null
        }
        const icon = _.get(IconLoader.namespaces, [namespace, name])

        return (
            <Icon
                {...this.props}
                name={name}
                namespace={namespace}
                icon={icon}
            />
        )
    }
}

IconLoader.addIcons('icon:core/countries', () => import('./countries'))
IconLoader.addIcons('icon:core/cards', () => import('./cards'))
IconLoader.addIcons('icon:core/resource', () => import('./resource'))

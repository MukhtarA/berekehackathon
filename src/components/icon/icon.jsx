import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { replace, uniqueId, noop } from 'lodash'

import { WrapperStyled } from './icon.style'

/**
 * Компонент для вывода svg-иконок
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
export const Icon = ({
    icon,
    name,
    namespace = 'common',
    className,
    colorScheme,
    fullWidth,
    onClick = noop
}) => {

    const formattedIcon = useMemo(() => {
        let editableIcon = icon
        const refIds = icon?.match(/(id="([^\s"])+")/g)

        if (refIds) {
            const newIdBase = `${Icon.iconProjectId}::${namespace}/${name}::`

            refIds.forEach((refId) => {
                const refIdForm = refId.substring(4, refId.length - 1)
                const newId = newIdBase + uniqueId()
                editableIcon = replace(editableIcon, new RegExp(`#${refIdForm}`, 'g'), `#${newId}`)
                editableIcon = replace(editableIcon, new RegExp(`id="${refIdForm}"`, 'g'), `id="${newId}"`)
            })
        }

        return editableIcon
    }, [icon, namespace, name])
    
    if (!icon) {
        return null
    }

  


    return (
        <WrapperStyled
            colorScheme={colorScheme}
            fullWidth={fullWidth}
            className={className}
            onClick={onClick}
            dangerouslySetInnerHTML={{
                __html: formattedIcon
            }}
        />
    )
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string,
    namespace: PropTypes.string,
    colorScheme: PropTypes.string,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
}

Icon.iconProjectId = 'demo'

Icon.setProject = (projectId) => {
    Icon.iconProjectId = projectId
}

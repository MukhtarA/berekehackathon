import React from 'react'

const passProps = (children, props) =>
    typeof children.type === 'function' ? React.cloneElement(children, { ...props }) : children

/**
 * @param {function, node} children
 * @param {object} props, что будут прокинуты внутрь children, если он является ReactNode(function), иначе вернет как есть
 * @returns {function, node} всё то же самое, только с прокинутыми props (по условию выше)
 */

export const passPropsToChildren = (children, props) =>
    children && children.map
        ? children.map((item, index) => passProps(item, { key: index, ...props }))
        : passProps(children, { ...props })

import React from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import _ from 'lodash'

// react@16 позволит передавать множественные children, но это не гарантирует работу событий
/**
 * Технический компонент для полифилла children обработчиками клика снаружи
 *
 * @param {Object} props - свойства компонента
 * @return {JSX} - компонент
 */
class PerimeterComponent extends React.Component {
    static propTypes = {
        /**
         * callback для клика снаружи
         */
        onClickOutside: PropTypes.func,
        /**
         * Первоначальная настройка обработчика клика снаружи
         */
        // comment: не используется тут, но HOC использует, указать в документацию надо
        disableOnClickOutside: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.bool
        ]),
        children: PropTypes.element
    }

    static defaultProps = {
        onClickOutside: _.noop,
        children: void 0,
        disableOnClickOutside: false
    }

    handleClickOutside = this.props.onClickOutside

    render () {
        return React.Children.only(this.props.children)
    }
}

PerimeterComponent.displayName = 'Perimeter'

export const Perimeter = onClickOutside(PerimeterComponent)

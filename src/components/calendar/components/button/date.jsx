import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { DateButtonStyled } from './button.style'

const DateButton = ({
    onClick = noop,
    text,
    date,
    active,
    isStartDate,
    isEndDate,
    current,
    disabled,
    within,
    children
}) => {
    const handleClick = useCallback(() => {
        onClick(date)
    }, [date])
    
    return (
        <DateButtonStyled
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            active={active}
            current={current}
            disabled={disabled}
            within={within}
            onClick={handleClick}
            type="button"
        >
            {children || text}
        </DateButtonStyled>
    )
}

const DateButtonMemoized = React.memo(DateButton)
export { DateButtonMemoized as DateButton }

DateButton.propTypes = {
    children: PropTypes.element,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    date: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    start: PropTypes.bool,
    end: PropTypes.bool,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    within: PropTypes.bool
}

import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { MarginWrapper } from '../indent-wrapper/margin-wrapper.style'
import { disableHandler, preventHandler } from '../utils/handlers'

import { SuggestButtonStyled, TypographyStyled, SuggestsListStyled, SuggestWrapperStyled } from './suggest.style'

export const Suggest = ({
    id,
    size = 'md',
    options,
    className,
    onClick = () => {},
    disabled = false,
    verticalMargin = 'micro',
    a11y
}) => {
    if (isEmpty(options)) {
        return null
    }

    const handleClick = (option) => () => onClick(option)

    return (
        <MarginWrapper
            verticalMargin={verticalMargin}
            size={size}
            className={className}
        >
            <SuggestsListStyled
                id={id}
                role="listbox"
                aria-label={a11y?.listLabel}
            >
                {options.map((option) => (
                    <SuggestWrapperStyled
                        key={option}
                        role="presentation"
                    >
                        <SuggestButtonStyled
                            type="button"
                            aria-label={`${a11y?.buttonLabel || ''} ${option}`}
                            onClick={disableHandler(handleClick(option), disabled)}
                            size={size}
                            disabled={disabled}
                        >
                            <TypographyStyled
                                verticalPadding="nano"
                                horizontalPadding="nano"
                                size={size}
                            >
                                {option}
                            </TypographyStyled>
                        </SuggestButtonStyled>
                    </SuggestWrapperStyled>
                ))}
            </SuggestsListStyled>
        </MarginWrapper>
    )
}

Suggest.propTypes = {
    id: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    a11y: PropTypes.shape({
        listLabel: PropTypes.string,
        buttonLabel: PropTypes.string
    }),
}

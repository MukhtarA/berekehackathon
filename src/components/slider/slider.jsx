import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

import { ic24ChevronLeft, ic24ChevronRight } from '@web_sbol/shared/src/assets/common'
import {
    SliderStyled,
    IndicatorsStyled,
    IndicatorStyled,
    ArrowStyled,
    SliderWrapperStyled
} from './style'

const Slider = ({
    id,
    idName,
    items,
    children,
    onNext,
    onPrev,
    contentCentered,
    noMargin,
    fullWidth,
    customArrows
}) => {
    const history = useHistory()

    const onPrevClick = useCallback(() => {
        if (onPrev) {
            onPrev()
        } else {
            const currentIndex = _.findIndex(items, [idName, id])
            const nextindex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
            const nextId = _.get(items, `[${nextindex}][${idName}]`)

            history.replace(_.replace(history.location.pathname, id, nextId))
        }
    }, [onPrev, items, idName, id, history])

    const onNextClick = useCallback(() => {
        if (onNext) {
            onNext()
        } else {
            const currentIndex = _.findIndex(items, [idName, id])
            const nextindex = (currentIndex + 1) % items.length
            const nextId = _.get(items, `[${nextindex}][${idName}]`)

            history.replace(_.replace(history.location.pathname, id, nextId))
        }
    }, [onNext, items, idName, id, history])

    return (
        <SliderWrapperStyled contentCentered={contentCentered} fullWidth={fullWidth}>
            <SliderStyled noMargin={noMargin} fullWidth={fullWidth}>
                {items.length > 1 && (
                    <>
                        <ArrowStyled
                            size="sm"
                            onClick={onPrevClick}
                            icon={ic24ChevronLeft}
                            customArrows={customArrows}
                            isLeft
                        />
                        <ArrowStyled
                            size="sm"
                            onClick={onNextClick}
                            icon={ic24ChevronRight}
                            customArrows={customArrows}
                        />
                    </>
                )}
                {children}
            </SliderStyled>
            <IndicatorsStyled>
                {items.length > 1 &&
                    items.map((item) => (
                        <IndicatorStyled key={item[idName]} isActive={item[idName] === id} />
                    ))}
            </IndicatorsStyled>
        </SliderWrapperStyled>
    )
}

Slider.propTypes = {
    id: PropTypes.string.isRequired,
    idName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    contentCentered: PropTypes.bool,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    noMargin: PropTypes.bool,
    fullWidth: PropTypes.bool,
    customArrows: PropTypes.object
}

Slider.defaultProps = {
    contentCentered: false,
    onNext: void 0,
    onPrev: void 0,
    noMargin: false,
    fullWidth: false,
    customArrows: null
}

export default Slider

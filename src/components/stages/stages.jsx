import React, { cloneElement, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

import { PaddingWrapper } from '../indent-wrapper/padding-wrapper.style'

import { StagesScrollAreaStyled, StagesStyled } from './stages.style'

const STEP_WIDTH = 128
const THROTTLE_DELAY = 3000

export const Stages = ({
    children,
    translations,
    progress,
    className,
    scrollContainer: {
        Inner,
        Outer
    } = {}
}) => {
    const currentProgressIndex = Number(progress)
    const containerRef = useRef()
    const [width, setWidth] = useState(0)
    const [center, setCenter] = useState(0)
    const [countStages, setCountStages] = useState(0)
    const OuterComponent = Outer || 'div'
    const InnerComponent = Inner || 'div'

    const updateWidth = throttle(() => {
        if (containerRef && containerRef.current) {
            setWidth(containerRef.current.clientWidth)
        }
    }, THROTTLE_DELAY)

    useEffect(() => {
        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    useEffect(() => {
        /* Получим количество шагов, которое поместиться на половине ширины контента*/
        const countContent = Math.floor(width / (2 * STEP_WIDTH))
        /* На мобильном разрешении хотим, чтобы активный шаг был вторым */
        setCountStages(countContent < 2 ? countContent + 1 : countContent)
        /* Получим последний шаг, который будет сдвигать Stages */
        let lastCenter = React.Children.count(children) - countStages
        /* На мобильном разрешении хотим, подвинуть последний шаг */
        lastCenter = countContent < 2 ? lastCenter + 2 : lastCenter
        /* Получаем шаг который будет сдвигать */
        const currentCenter = progress < lastCenter ? progress : lastCenter
        setCenter(currentCenter)
    }, [width, progress, countStages])

    return (
        <OuterComponent>
            <StagesScrollAreaStyled ref={containerRef}>
                <InnerComponent>
                    <PaddingWrapper
                        verticalPadding="inner"
                        size="sm"
                    >
                        <StagesStyled
                            className={className}
                        >
                            {children.map((child, i) => {
                                /* Отрисовываем либо шаг меньше текущего центра,
                        тогда отрисовываем все, либо отрисовываем те, что помешаются в зоне контента до середины*/
                                if ((countStages < center && i >= center - countStages) || countStages >= center) {
                                    return cloneElement(child, {
                                        value: i + 1,
                                        step: currentProgressIndex,
                                        translations,
                                        key: child.props.title
                                    })
                                }
                                return null
                    
                            }
                            )}
                        </StagesStyled>
                    </PaddingWrapper>
                </InnerComponent>
            </StagesScrollAreaStyled>
        </OuterComponent>
    )
}

Stages.propTypes = {
    children: PropTypes.node.isRequired,
    translations: PropTypes.shape({
        tooltip: PropTypes.string.isRequired
    }).isRequired,
    progress: PropTypes.number.isRequired,
    className: PropTypes.string,
    scrollContainer: PropTypes.shape({
        Inner: PropTypes.func,
        Outer: PropTypes.func,
    })
}

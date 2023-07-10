import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { extend, omit } from 'lodash'

import { Typography } from '../typography'
import { parseDirection, makeDirection } from '../utils/make-direction'
import { MarkdownFull } from '../markdown/markdown-full'

import { TipStyled, ActiveZoneStyled, ContentsStyled } from './tooltip.style'

export const Tip = ({
    direction = 'topLeft',
    title = void 0,
    description = void 0,
    forceOpened = false,
    ...rest
}) => {
    const [tipDirection, updateTipDirection] = useState(parseDirection(direction))
    const startDirection = parseDirection(direction)
    const tipRef = useRef(null)

    useEffect(() => {
        if (tipRef && forceOpened) {
            // меняем положение подсказки, если она выходит за границы окна
            updateTipDirection(makeDirection(tipRef.current, tipDirection, startDirection))
        }
    }, [tipRef, forceOpened])

    const [verticalDirection, horizontalDirection] = tipDirection

    const passedProps = extend(omit(rest, ['children', 'fontWeight', 'direction', 'forceOpened']), {
        'aria-live': 'assertive',
        role: 'tooltip'
    })

    return (
        <TipStyled {...passedProps} vd={verticalDirection} hd={horizontalDirection} opened={forceOpened} ref={tipRef}>
            <ActiveZoneStyled>
                <ContentsStyled
                    horizontalPadding="inner"
                    verticalPadding="inner"
                    vd={verticalDirection}
                    hd={horizontalDirection}
                >
                    {title &&
                        <Typography
                            fontWeight="semibold"
                            verticalMargin="nano"
                            colorScheme="tooltipTitle"
                        >
                            {title}
                        </Typography>
                    }
                    {description &&
                        <MarkdownFull
                            size="sm"
                            verticalMargin="nano"
                            colorScheme="tooltipDescription"
                            content={description}
                        />
                    }
                </ContentsStyled>
            </ActiveZoneStyled>
        </TipStyled>
    )
}

Tip.propTypes = {
    /**
     * Направление отображения подсказки относительно родителя
     */
    direction: PropTypes.oneOf([
        'topLeft',
        'topRight',
        'topCenter',
        'bottomLeft',
        'bottomRight',
        'bottomCenter'
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    forceOpened: PropTypes.bool
}

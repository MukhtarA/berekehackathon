import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../icon'
import { ic24ArrowLeft, ic24ArrowRight, ic24ChevronRight } from '../icon/common'

import {
    ControlStyled,
    ButtonStyled,
    IconShadowStyled
} from './horizontal-scroll.style'
import scrollShadow from './scroll-shadow.svg'


const modesIcons = {
    block: {
        left: ic24ChevronRight,
        right: ic24ChevronRight
    },
    banner: {
        left: ic24ChevronRight,
        right: ic24ChevronRight
    },
    inline: {
        left: ic24ArrowLeft,
        right: ic24ArrowRight
    }
}

export const Control = ({ side, onClick, title, active, mode }) => (
    <ControlStyled
        mode={mode}
        side={side}
        active={active}
    >
        {mode === 'block' &&
        <IconShadowStyled
            icon={scrollShadow}
            side={side}
            active={active}
        />
        }
        <ButtonStyled
            onClick={onClick}
            disabled={!active}
            type="button"
            title={title}
            mode={mode}
            side={side}
            active={active}
            tabIndex={active ? 0 : -1}
        >
            <Icon icon={modesIcons[mode][side]} />
        </ButtonStyled>
    </ControlStyled>
)

Control.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    side: PropTypes.oneOf(['left', 'right']).isRequired,
    mode: PropTypes.oneOf(['inline', 'block', 'banner']).isRequired
}

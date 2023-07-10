import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { ic24Info } from '../icon/common'
import { TooltipHover, Tip } from '../tooltip'
import { Icon } from '../icon'

import { InfoStyled } from './labeled.style'

export const Info = ({
    title = '',
    description = '',
    contents = '',
    onClose = noop,
    onOpen = noop
}) => (
    <TooltipHover onOpen={onOpen} onClose={onClose}>
        <InfoStyled tabIndex={0}>
            <Icon
                icon={ic24Info}
            />
        </InfoStyled>
        <Tip title={title} description={contents || description} />
    </TooltipHover>
)

Info.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    contents: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
}

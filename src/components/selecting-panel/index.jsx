import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
    SelectingPanelContainerStyled,
    ButtonSelectedStyled,
    ButtonUnselectedStyled
} from './style'

const SelectingPanel = ({ selectItems, initial, noShadow, ...props }) => {
    const selectingItemsCount = selectItems.length

    return (
        <SelectingPanelContainerStyled noShadow={noShadow} initial={initial} {...props}>
            {_.map(selectItems, (selectItem) => {
                return (
                    <React.Fragment key={_.uniqueId('select-item_')}>
                        {selectItem.selected ? (
                            <ButtonSelectedStyled
                                count={selectingItemsCount}
                                title={_.get(selectItem, 'title')}
                                onClick={_.get(selectItem, 'handleSelect')}
                            />
                        ) : (
                            <ButtonUnselectedStyled
                                count={selectingItemsCount}
                                title={_.get(selectItem, 'title')}
                                onClick={_.get(selectItem, 'handleSelect')}
                            />
                        )}
                    </React.Fragment>
                )
            })}
        </SelectingPanelContainerStyled>
    )
}

SelectingPanel.propTypes = {
    selectItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    initial: PropTypes.bool,
    noShadow: PropTypes.bool
}

SelectingPanel.defaultProps = {
    initial: false,
    noShadow: false
}

export default SelectingPanel

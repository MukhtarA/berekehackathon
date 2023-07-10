import React from 'react'
import PropTypes from 'prop-types'

import { OuterStyled, SearchIconStyled, SearchInputStyled } from './style'

import searchIcon from './search.svg'

export const SearchInput = ({ placeholder, onChange, ...rest }) => {
    return (
        <OuterStyled>
            <SearchInputStyled onChange={onChange} placeholder={placeholder} {...rest} />
            <SearchIconStyled dangerouslySetInnerHTML={{ __html: searchIcon }} />
        </OuterStyled>
    )
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

SearchInput.defaultProps = {
    placeholder: ''
}

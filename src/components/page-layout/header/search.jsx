import React from 'react'
import PropTypes from 'prop-types'

import { SearchInputStyled, SearchWrapperStyled, SearchIconStyled } from './header.style'

import searchIcon from '../assets/search.svg'

const Search = ({ placeholder, ...rest }) => (
    <SearchWrapperStyled>
        <SearchInputStyled placeholder={placeholder} {...rest} />
        <SearchIconStyled dangerouslySetInnerHTML={{ __html: searchIcon }} />
    </SearchWrapperStyled>
)

Search.propTypes = {
    placeholder: PropTypes.string.isRequired
}

export default Search

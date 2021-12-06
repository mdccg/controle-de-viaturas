import React from 'react';
import './styles.css';

import MagnifyingGlass from './../../assets/icons/MagnifyingGlass';

function SearchBar({ pesquisa, setPesquisa, placeholder }) {

  return (
    <div className="search-bar">
      <input 
        type="text"
        value={pesquisa}
        onChange={event => setPesquisa(event.target.value)}
        placeholder={placeholder} />

      <MagnifyingGlass />
    </div>
  );
}

export default SearchBar;
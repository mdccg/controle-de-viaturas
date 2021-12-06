import React from 'react';
import './styles.css';

import BasicMenu from './../BasicMenu';

import MenuItem from '@mui/material/MenuItem';

function MenuMoverViatura({ aberto, setAberto }) {
  function subir() {

    setAberto(null);
  }

  function descer() {
    setAberto(null);
  }

  return (
    <BasicMenu anchorEl={aberto} setAnchorEl={setAberto}>
      <MenuItem className="menu-item-mover-viatura" onClick={subir}>Mover para cima</MenuItem>
      <MenuItem className="menu-item-mover-viatura" onClick={descer}>Mover para baixo</MenuItem>
    </BasicMenu>
  );
}

export default MenuMoverViatura;
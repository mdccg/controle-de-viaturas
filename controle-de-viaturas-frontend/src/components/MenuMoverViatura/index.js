import React from 'react';
import './styles.css';

import BasicMenu from './../BasicMenu';

import api from './../../services/api';

import MenuItem from '@mui/material/MenuItem';

function MenuMoverViatura({
  categoria = {},
  indiceCategoria,
  puxarViaturasAposAtualizarIndiceCategoria,
  minimo = 1,
  maximo,
  aberto,
  setAberto
}) {
  async function subir() {
    var url;

    url = `/viaturas-especificas?categoria=${categoria._id}&indiceCategoria=${indiceCategoria}`;
    let viatura1 = (await api.get(url)).data.pop();

    url = `/viaturas-especificas?categoria=${categoria._id}&indiceCategoria=${indiceCategoria - 1}`;
    let viatura2 = (await api.get(url)).data.pop();

    await api.put(`/viaturas/${viatura1._id}`, { indiceCategoria: indiceCategoria - 1 });
    await api.put(`/viaturas/${viatura2._id}`, { indiceCategoria: indiceCategoria });

    puxarViaturasAposAtualizarIndiceCategoria();
    setAberto(null);
  }

  async function descer() {
    var url;

    url = `/viaturas-especificas?categoria=${categoria._id}&indiceCategoria=${indiceCategoria}`;
    let viatura1 = (await api.get(url)).data.pop();

    url = `/viaturas-especificas?categoria=${categoria._id}&indiceCategoria=${indiceCategoria + 1}`;
    let viatura2 = (await api.get(url)).data.pop();

    await api.put(`/viaturas/${viatura1._id}`, { indiceCategoria: indiceCategoria + 1 });
    await api.put(`/viaturas/${viatura2._id}`, { indiceCategoria: indiceCategoria });
    
    puxarViaturasAposAtualizarIndiceCategoria();
    setAberto(null);
  }

  return (
    <BasicMenu anchorEl={aberto} setAnchorEl={setAberto}>
      <MenuItem
        disabled={indiceCategoria === minimo}
        className="menu-item-mover-viatura"
        onClick={subir}>Mover para cima</MenuItem>
      <MenuItem
        disabled={indiceCategoria === maximo}
        className="menu-item-mover-viatura"
        onClick={descer}>Mover para baixo</MenuItem>
    </BasicMenu>
  );
}

export default MenuMoverViatura;
import { useState, useEffect } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Vazio from './../Vazio';
import Viatura from './../Viatura';

function Categoria({
  _id,
  nome,
  viaturas,
  setViatura,
  setViaturas,
  enviarRegistro,
  setDeletandoViatura,
  setEditandoCategoria,
  setEditandoNivelCombustivel,
  viaturasFiltradas = []
}) {

  const listaVazia = viaturasFiltradas.length === 0;
  const [aberto, setAberto] = useState(viaturasFiltradas.length !== 0);

  useEffect(() => {
    setAberto(viaturasFiltradas.length !== 0);    
  }, [viaturasFiltradas]);

  return (
    <div className="lista-viaturas" key={_id}>
      <div className="categoria" onClick={() => setAberto(!aberto)}>
        <div></div>
        <span className="noselect">{nome}</span>
        <div className={'icone ' + (aberto ? 'aberto' : '')}>
          <ArrowDownSignToNavigate />
        </div>
      </div>

      {aberto && !listaVazia ? (
        viaturasFiltradas.map(viatura => (
          <Viatura
            {...viatura}
            key={viatura._id}
            viaturas={viaturas}
            setViatura={setViatura}
            setViaturas={setViaturas}
            enviarRegistro={enviarRegistro}
            setDeletandoViatura={setDeletandoViatura}
            setEditandoCategoria={setEditandoCategoria}
            setEditandoNivelCombustivel={setEditandoNivelCombustivel} />
        ))
      ) : aberto && listaVazia ? (
        <Vazio icone="viatura">Sem viaturas</Vazio>
      ) : <></>}
    </div>
  );
}

export default Categoria;
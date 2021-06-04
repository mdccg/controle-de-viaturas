import { useState, useEffect } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Vazio from './../Vazio';
import Viatura from './../Viatura';

function Categoria({
  _id,
  nome,
  registrar,
  recarregar,
  setViatura,
  atualizarViatura,
  setDeletandoViatura,
  setEditandoCategoria,
  setEditandoNivelCombustivel,
  viaturas = []
}) {

  const listaVazia = viaturas.length === 0;
  const [aberto, setAberto] = useState(viaturas.length !== 0);

  useEffect(() => {
    setAberto(viaturas.length !== 0);    
  }, [viaturas]);

  return (
    <div className="lista-viaturas" key={_id}>
      <div className="categoria" onClick={() => setAberto(!aberto)}>
        <div></div>
        <span>{nome}</span>
        <div className={'icone ' + (aberto ? 'aberto' : '')}>
          <ArrowDownSignToNavigate />
        </div>
      </div>

      {aberto && !listaVazia ? (
        viaturas.map(viatura => (
          <Viatura
            {...viatura}
            key={viatura._id}
            registrar={registrar}
            recarregar={recarregar}
            setViatura={setViatura}
            atualizarViatura={atualizarViatura}
            setDeletandoViatura={setDeletandoViatura}
            setEditandoCategoria={setEditandoCategoria}
            setEditandoNivelCombustivel={setEditandoNivelCombustivel} />
        ))
      ) : aberto && listaVazia ? (
        <Vazio>Sem viaturas</Vazio>
      ) : <></>}
    </div>
  );
}

export default Categoria;
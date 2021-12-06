import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Vazio from './../Vazio';
import Viatura from './../Viatura';

function Categoria({
  _id,
  nome,
  revisoes: revisoesIniciais = [],
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
  const [revisoes, setRevisoes] = useState(revisoesIniciais);

  useEffect(() => {
    setAberto(viaturasFiltradas.length !== 0);    
  }, [viaturasFiltradas]);

  useEffect(() => {
    setRevisoes(revisoesIniciais);
  }, [revisoesIniciais]);

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
        viaturasFiltradas.map(viatura => {
          const revisao = [...revisoes]
            .filter(revisao => revisao.viatura._id === viatura._id && !revisao.concluida)
            .pop();

          return (
            <Viatura
              {...viatura}
              key={viatura._id}
              revisao={revisao || {}}
              viaturas={viaturas}
              setViatura={setViatura}
              setViaturas={setViaturas}
              enviarRegistro={enviarRegistro}
              setDeletandoViatura={setDeletandoViatura}
              setEditandoCategoria={setEditandoCategoria}
              setEditandoNivelCombustivel={setEditandoNivelCombustivel} />
          )
        })
      ) : aberto && listaVazia ? (
        <Vazio icone="viatura">Sem viaturas</Vazio>
      ) : <></>}
    </div>
  );
}

export default Categoria;
import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Vazio from './../Vazio';
import Viatura from './../Viatura';

import ordenarPorIndice from './../../functions/ordenarPorIndice';

import api from './../../services/api';

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
  puxarViaturasAposAtualizarIndiceCategoria,
  viaturasFiltradas: viaturasFiltradasInicial = []
}) {

  const [viaturasFiltradas, setViaturasFiltradas] = useState(viaturasFiltradasInicial);
  const [listaVazia, setListaVazia] = useState(viaturasFiltradas.length === 0);
  const [aberto, setAberto]       = useState(viaturasFiltradas.length !== 0);
  const [revisoes, setRevisoes] = useState(revisoesIniciais);

  async function atualizarIndiceCategoria(_id, setIndiceCategoria) {
    let _viaturasFiltradas = [...viaturasFiltradas];
    let _viaturas = [...viaturas];

    let viatura = (await api.get(`/viaturas?_id=${_id}`)).data.pop();
    let indice1 = _viaturasFiltradas.map(viatura => viatura._id).indexOf(_id);
    let indice2 =          _viaturas.map(viatura => viatura._id).indexOf(_id);
    
    _viaturasFiltradas[indice1] = viatura;
    _viaturas[indice2] = viatura;

    setIndiceCategoria(viatura.indiceCategoria);
    setViaturasFiltradas(_viaturasFiltradas);
    setViaturas(_viaturas);
  }

  useEffect(() => {
    setViaturasFiltradas(viaturasFiltradasInicial);
  }, [viaturasFiltradasInicial]);

  useEffect(() => {
    setRevisoes(revisoesIniciais);
  }, [revisoesIniciais]);

  useEffect(() => {
    setListaVazia(viaturasFiltradas.length === 0);
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
        viaturasFiltradas
          .sort(ordenarPorIndice)
          .map(viatura => {
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
              atualizarIndiceCategoria={atualizarIndiceCategoria}
              quantidadeViaturasFitradas={viaturasFiltradas.length}
              setEditandoNivelCombustivel={setEditandoNivelCombustivel}
              puxarViaturasAposAtualizarIndiceCategoria={puxarViaturasAposAtualizarIndiceCategoria} />
          )
        })
      ) : aberto && listaVazia ? (
        <Vazio icone="viatura">Sem viaturas</Vazio>
      ) : <></>}
    </div>
  );
}

export default Categoria;
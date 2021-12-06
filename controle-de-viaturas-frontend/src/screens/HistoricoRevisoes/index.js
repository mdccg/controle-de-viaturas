import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import Vazio  from './../../components/Vazio';
import Voltar from './../../components/Voltar';
import Footer from './../../components/Footer';

import api from './../../services/api';

import { revisoesFiltradas as revisoesFiltradasMock } from './../../tmp/mock.json';

import Checkbox from '@material-ui/core/Checkbox';

function Check({
  topico: { _id, titulo, descricao },
  revisado,
  comentario
}) {

  return (
    <div className="checkitem" key={_id}>
      <div className="cabecalho">
        <div className="checkbox">
          <Checkbox disabled checked={revisado} />
        </div>

        <span>{titulo}</span>
      </div>

      <div className="corpo">
        <span>{descricao}</span>
      </div>

      <div className="rodape">
        <input
          disabled
          type="text"
          value={comentario}
          placeholder="Nenhum comentário adicionado" />
      </div>
    </div>
  );
}

function HistoricoRevisoes(props) {
  const [dias, setDias] = useState({});
  const [viatura, setViatura] = useState({});

  const [buscandoDados, setBuscandoDados] = useState(false);

  async function buscarViatura() {
    setBuscandoDados(true);

    const { search } = props.location;
    
    // TODO back-end aqui
    const idViatura = search.split('=').pop();
   
    let viatura = (await api.get(`/viaturas?_id=${idViatura}`)).data.pop();
    setViatura(viatura);

    buscarRevisoes(idViatura);
  }

  function buscarRevisoes(idViatura) {
    setBuscandoDados(true);
    
    // TODO back-end aqui
    setTimeout(() => {
      let dias = revisoesFiltradasMock[idViatura] || {};
      setDias(dias);

      setBuscandoDados(false);
    }, 2e3);
  }

  useEffect(() => {
    buscarViatura();
  }, []);
  
  useEffect(() => {
    document.title = `${viatura.prefixo} ― 1º SGBM/IND`;
  }, [viatura]);

  return (
    <div className="historico-revisoes">
      <Voltar />

      <div className="container">

        {buscandoDados ? <Spinner className="loader" /> : (
          <>
            <div className="titulo">
              <span>Manutenções da viatura</span>
              <span>&nbsp;</span>
              <span className="prefixo">{viatura.prefixo}</span>
            </div>

            {JSON.stringify(dias) === '{}' ? <Vazio icone="viatura">Sem histórico de manutenção</Vazio> : null}

            {Object.keys(dias).map(dia => {
              const checklist = dias[dia];

              return (
                <div className="quinzena" key={dia}>
                  <div className="dia">
                    <span>{dia}</span>
                  </div>

                  {checklist.map(checkitem => (
                    <Check key={checkitem.topico._id} {...checkitem} />
                  ))}
                </div>
              );
            })}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HistoricoRevisoes;
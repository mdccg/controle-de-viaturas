import React from 'react';
import { useState } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';
import Clipboard from './../../assets/icons/Clipboard';
import Delete from './../../assets/icons/Delete';
import Spinner from './../../assets/icons/Spinner';

import Vazio from './../Vazio';

import { diasSemana } from './../../config/default.json';

import api from './../../services/api';

import moment from 'moment';

function ViaturaTextual({ _id, prefixo, km, nivelCombustivel, comentario = '' }) {
  return (
    <div className="viatura-textual">
      <div style={{ width: '15%' }}>
        <span>{prefixo}</span>
      </div>
      
      <div style={{ width: '20%' }}>
        <span>KM {km}</span>
      </div>
      
      <div style={{ width: '30%' }}>
        <span>{nivelCombustivel}</span>
      </div>

      <div style={{ width: '45%' }}>
        {comentario ? <span>{comentario}</span> : <div></div>}
      </div>
    </div>
  );
}

function AcordeaoRegistro({ _id, viaturas = [], signatario = {}, updatedAt: data, categorias = [], recarregar }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);
  
  const [aberto, setAberto] = useState(false);
  
  const apocrifo = JSON.stringify(signatario) === '{}';

  const diaSemana     = diasSemana[moment(data).isoWeekday() - 1];
  const dataFormatada = moment(data).format('D [de] MMMM [de] YYYY[,] [às] HH[:]mm');
  const nomeMilitar   =  !apocrifo ? `${signatario.patente} ${signatario.nome}` : 'Militar deletado';

  function abrir() {
    setAberto(!aberto);
  }

  function exportarPdf() {
    const relatorio = {
      tipo: 'diario',
      relatorio: {
        data,
        signatario: !apocrifo ? signatario : ({ patente: 'Militar', nome: 'deletado' }),
        viaturas
      }
    };

    api.put('/relatorio', relatorio)
      .then(() => {
        window.location.pathname = '/tabela-diaria';
      })
      .catch(err => console.error(err));
  }

  function deletarRegistro() {
    setEfetuandoRequisicao(true);

    api.delete(`/registros/${_id}`)
      .then(() => recarregar())
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }

  return (
    <div className="acordeao-registro">
      <div
        className="acordeao-registro-header"
        style={{
          borderBottomLeftRadius:  !aberto ? '4px' : '0',
          borderBottomRightRadius: !aberto ? '4px' : '0',
        }} 
        onClick={abrir}>
        <span>{diaSemana}, {dataFormatada} &bull; {nomeMilitar.toUpperCase()}</span>
        <ArrowDownSignToNavigate className={aberto ? 'aberto' : ''} />
      </div>

      {aberto ? (
        <div className="acordeao-registro-body">
          {viaturas.length === 0 ? (
            <Vazio
              icone="viatura"
              cor="var(--american-river)">Sem viaturas</Vazio>
          ) : null}

          {categorias.map(({ _id, nome }) => {
            let tuplas = viaturas.filter(viatura => {
              if(!viatura.categoria)
                return false;

              return viatura.categoria === _id;
            });

            return tuplas.length > 0 ? (
              <div key={_id}>
                <div className="categoria">
                  <span>{nome}</span>
                </div>
                {tuplas.map(tupla => <ViaturaTextual key={tupla._id} {...tupla} />)}
              </div>
            ) : <></>;
          })}

          <div className="botoes">
            {viaturas.length !== 0 ? (
              <div className="botao-exportar" onClick={exportarPdf}>
                <div className="icone">
                  <Clipboard />
                </div>

                <span>Exportar tabela para PDF</span>
              </div>
            ) : <></>}

            <div className="botao-deletar" onClick={deletarRegistro}>
              {efetuandoRequisicao ? <Spinner /> : (
                <>
                  <div className="icone">
                    <Delete />
                  </div>
                  
                  <span>Deletar registro atual</span>
                </>
              )}
            </div>
          </div>
          </div>
      ) : <></>}
    </div>
  );
}

export default AcordeaoRegistro;
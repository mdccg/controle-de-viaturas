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
    <div className="viatura-textual" key={_id}>
      <span>{prefixo}</span>
      <span>KM {km}</span>
      <span className="nivelCombustivel">{nivelCombustivel}</span>
      {comentario ? <span>{comentario}</span> : <div></div>}
    </div>
  );
}

function AcordeaoRegistro({ _id, viaturas = [], signatario = {}, createdAt: data, categorias = [], recarregar }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);
  
  const [aberto, setAberto] = useState(false);
  
  const diaSemana     = diasSemana[moment(data).isoWeekday() - 1];
  const dataFormatada = moment(data).format('DD/MM/YYYY HH[:]mm');
  const nomeMilitar   = `${signatario.patente} ${signatario.nome}`;

  function abrir() {
    setAberto(!aberto);
  }

  function exportarPdf() {
    const relatorio = {
      tipo: 'diario',
      relatorio: {
        data,
        signatario,
        viaturas
      }
    };

    api.put('/relatorio', relatorio)
      .then(() => window.open('/tabela-diaria', '_blank'))
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
    <div className="acordeao-registro" key={_id}>
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
          {viaturas.length === 0 ? <Vazio>Sem viaturas</Vazio> : <></>}

          {categorias.map(({ _id, nome }) => {
            let tuplas = viaturas.filter(viatura => {
              if(!viatura.categoria)
                return false;

              return viatura.categoria._id === _id;
            });

            return tuplas.length > 0 ? (
              <div key={_id}>
                <span className="categoria">{nome}</span>
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
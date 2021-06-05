import { useState } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';
import Clipboard from './../../assets/icons/Clipboard';

import Vazio from './../Vazio';

import { diasSemana } from './../../config/default.json';

import api from './../../services/api';

import moment from 'moment';

function ViaturaTextual({ _id, prefixo, km, nivelCombustivel, comentario = '' }) {
  return (
    <div className="viatura-textual" key={_id}>
      <span>{prefixo}</span>
      <span>KM {km}</span>
      <span>{nivelCombustivel}</span>
      {comentario ? <span>{comentario}</span> : <div></div>}
    </div>
  );
}

function AcordeaoRegistro({ _id, viaturas = [], signatario = {}, createdAt: data, categorias = [] }) {
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
        data: data,
        militar: nomeMilitar,
        viaturas
      }
    };

    api.put('/relatorio', relatorio)
      .then(() => window.open('/tabela-diaria', '_blank'))
      .catch(err => console.error(err));
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
                {tuplas.map(tupla => <ViaturaTextual {...tupla} />)}
              </div>
            ) : <></>;
          })}

          {viaturas.length !== 0 ? (
            <div className="botao-exportar" onClick={exportarPdf}>
              <Clipboard />
              <span>Exportar tabela para PDF</span>
            </div>
          ) : <></>}
        </div>
      ) : <></>}
    </div>
  );
}

export default AcordeaoRegistro;
import { useState } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Vazio from './../Vazio';

import moment from 'moment';

const diasSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

function filtrarPorCategoria(viaturas, categoria) {
  return viaturas.filter(({ categoria: _categoria }) => _categoria === categoria);
}

function ViaturaTextual({ _id, prefixo, categoria, km, nivelCombustivel, comentario = '' }) {
  const nivelCombustivelComplemento = 'Combustível acima de ';
  const comentado = comentario.split('').length > 0;

  return (
    <div className="viatura-textual">
      <span>{prefixo}</span>
      <span>KM {km}</span>
      <span className={!comentado ? 'nao-comentada' : ''}>
        {nivelCombustivel === 'Cheio' ? 'Tanque cheio'
        : nivelCombustivel === 'Reserva' ? 'Reserva' : 
          nivelCombustivelComplemento + nivelCombustivel}
      </span>
      {comentario ? <span>{comentario}</span> : <div></div>}
    </div>
  );
}

function AcordeaoRegistro({ _id, data, ultimoMilitar = '', viaturas = [] }) {
  const [aberto, setAberto] = useState(false);
  
  const diaSemana = diasSemana[moment(data).isoWeekday() - 1];
  const dataFormatada = moment(data).format('DD/MM/YYYY HH[:]mm');
  
  function abrir() {
    setAberto(!aberto);
  }

  function exportarPdf() {
    let militar = ultimoMilitar;
    
    var url = `/tabela-diaria?data=${data}&militar=${militar}&viaturas=${JSON.stringify(viaturas)}`;

    window.open(url, '_blank');
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
        <span>{diaSemana}, {dataFormatada} &bull; {ultimoMilitar.toUpperCase()}</span>
        <ArrowDownSignToNavigate />
      </div>

      {aberto ? (
        <div className="acordeao-registro-body">
          <span className="categoria">Trem de S.O.S</span>
          {filtrarPorCategoria(viaturas, 'Trem de S.O.S').length > 0 ? (
            filtrarPorCategoria(viaturas, 'Trem de S.O.S')
              .map(viatura => <ViaturaTextual key={viatura._id} {...viatura} />)
          ) : <Vazio>Nenhuma viatura encontrada</Vazio>}

          <div style={{ height: '16px' }}></div>

          <span className="categoria">No pátio</span>
          {filtrarPorCategoria(viaturas, 'No pátio').length > 0 ? (
            filtrarPorCategoria(viaturas, 'No pátio')
              .map(viatura => <ViaturaTextual key={viatura._id} {...viatura} />)
          ) : <Vazio>Nenhuma viatura encontrada</Vazio>}

          <div className="botao" onClick={exportarPdf}>
            <span>Exportar tabela para PDF</span>
          </div>
        </div>
      ) : <></>}
    </div>
  );
}

export default AcordeaoRegistro;
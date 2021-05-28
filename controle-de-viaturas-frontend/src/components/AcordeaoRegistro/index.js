import { useState } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';
import Chat from './../../assets/icons/Chat';

import moment from 'moment';

const diasSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

function ViaturaTextual({ _id, prefixo, categoria, km, nivelCombustivel, comentario = '' }) {
  const nivelCombustivelComplemento = 'Combustível acima de ';

  return (
    <div className="viatura-textual">
      <span>{prefixo}</span>
      <span>KM {km}</span>
      <span>
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
  const dataFormatada = moment(data).format('DD/MM/YYYY');
  
  function abrir() {
    setAberto(!aberto);
  }

  return (
    <div className="acordeao-registro" key={_id}>
      <div className="acordeao-registro-header" onClick={abrir}>
        <span>{diaSemana}, {dataFormatada} &bull; {ultimoMilitar.toUpperCase()}</span>
        <ArrowDownSignToNavigate />
      </div>

      {aberto ? (
        <div className="acordeao-registro-body">
          <span className="categoria">Trem de S.O.S</span>
          {viaturas
            .filter(({ categoria }) => categoria === 'Trem de S.O.S')
            .map(viatura => <ViaturaTextual key={viatura._id} {...viatura} />)}

          <div style={{ height: '16px' }}></div>

          <span className="categoria">No pátio</span>
          {viaturas
            .filter(({ categoria }) => categoria === 'No pátio')
            .map(viatura => <ViaturaTextual key={viatura._id} {...viatura} />)}
        </div>
      ) : <></>}
    </div>
  );
}

export default AcordeaoRegistro;
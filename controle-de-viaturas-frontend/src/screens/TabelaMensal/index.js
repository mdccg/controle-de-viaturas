import { useState, useEffect } from 'react';
import './styles.css';

import moment from 'moment';

const diasSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

function filtrarPorCategoria(viaturas, categoria) {
  return viaturas.filter(({ categoria: _categoria }) => categoria === _categoria);
}

function RegistroTextual({ data, ultimoMilitar, viaturas }) {
  const diaSemana = diasSemana[moment(data).isoWeekday() - 1];
  const dataFormatada = moment(data).format('DD.MM.YYYY');

  return (
    <div className="registro">
      <h3 className="data-militar">{diaSemana}, {dataFormatada} - {ultimoMilitar}</h3>
      
      <h4>Trem de S.O.S</h4>
      <table>
        <thead>
          <tr>
            <th>Prefixo</th>
            <th>KM</th>
            <th>Nível de combustível</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {filtrarPorCategoria(viaturas, 'Trem de S.O.S').map(({ _id, prefixo, km, nivelCombustivel, comentario }) => {
            const nivelCombustivelComplemento = 'Combustível acima de ';

            return (
              <tr key={_id}>
                <td>{prefixo}</td>
                <td>{km}</td>
                <td>
                  {['¾', '½', '¼'].includes(nivelCombustivel)
                    ? nivelCombustivelComplemento + nivelCombustivel : nivelCombustivel === 'Cheio'
                    ? 'Tanque cheio' : 'Reserva'}
                </td>
                <td>{comentario}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h4>No pátio</h4>
      <table>
        <thead>
          <tr>
            <th>Prefixo</th>
            <th>KM</th>
            <th>Nível de combustível</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {filtrarPorCategoria(viaturas, 'No pátio').map(({ _id, prefixo, km, nivelCombustivel, comentario }) => {
            const nivelCombustivelComplemento = 'Combustível acima de ';

            return (
              <tr key={_id}>
                <td>{prefixo}</td>
                <td>{km}</td>
                <td>
                  {['¾', '½', '¼'].includes(nivelCombustivel)
                    ? nivelCombustivelComplemento + nivelCombustivel : nivelCombustivel === 'Cheio'
                    ? 'Tanque cheio' : 'Reserva'}
                </td>
                <td>{comentario}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="divider"></div>
    </div>
  );
}

function TabelaMensal() {
  const [mes, setMes] = useState('');
  const [registros, setRegistros] = useState([]);

  async function montarRegistros() {
    var params = {};
    var stringParams = window.location.href.split('?').pop();

    for(var stringParam of stringParams.split('&')) {
      var [key, value] = stringParam.split('=');

      value = decodeURIComponent(value);

      if(key === 'registros')
        value = JSON.parse(value);
      
      params[key] = value;
    }

    await setMes(params.mes);
    await setRegistros(params.registros);

    document.title = `${params.mes.toUpperCase()} - 1.o SGBM-IND`;

    window.print();
    window.addEventListener('afterprint', function() {
      this.close();
    });
  }

  useEffect(() => {
    montarRegistros();
  }, []);

  return (
    <div className="tabela mensal">
      <h1>CONTROLE DE VTR ― 1º SGBM/IND</h1>
      <h2 className="mes">{mes}</h2>
      {registros.map((registro, index) => <RegistroTextual key={index} {...registro} />)}
    </div>
  );
}

export default TabelaMensal;
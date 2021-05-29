import { useState, useEffect } from 'react';
import './styles.css';

import moment from 'moment';

const diasSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

function filtrarPorCategoria(viaturas, categoria) {
  return viaturas.filter(({ categoria: _categoria }) => _categoria === categoria);
}

function TabelaDiaria() {
  const [dia, setDia] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [militar, setMilitar] = useState('');
  const [viaturas, setViaturas] = useState([]);

  async function montarRegistro() {
    var params = {};
    var stringParams = window.location.href.split('?').pop();

    for(var stringParam of stringParams.split('&')) {
      var [key, value] = stringParam.split('=');

      value = decodeURIComponent(value);

      if(key === 'viaturas')
        value = JSON.parse(value);
      
      params[key] = value;
    }

    console.log(params);

    let dia = moment(params.data).format('DD.MM.YYYY');
    let diaSemana = diasSemana[moment(params.data).isoWeekday() - 1];

    await setDia(dia);
    await setDiaSemana(diaSemana);
    await setMilitar(params.militar);
    await setViaturas(params.viaturas);

    document.title = `${dia} - ${params.militar.toUpperCase()} - 1.o SGBM-IND`;

    window.print();
    window.addEventListener('afterprint', function() {
      this.close();
    });
  }

  useEffect(() => {
    montarRegistro();
  }, []);

  return (
    <div className="tabela">
      <h1>CONTROLE DE VTR ― 1º SGBM/IND</h1>
      <h2>{diaSemana.toUpperCase()}, {dia} - {militar.toUpperCase()}</h2>

      <h2>Trem de S.O.S</h2>
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

      <h2>No pátio</h2>
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
    </div>
  );
}

export default TabelaDiaria;
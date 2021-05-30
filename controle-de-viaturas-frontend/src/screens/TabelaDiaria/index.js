import { useState, useEffect } from 'react';
import './styles.css';

import api from './../../services/api';

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
    await api.get('/relatorio')
      .then(res => {
        let { data, militar, viaturas } = res.data.relatorio;
        
        let dia = moment(data).format('DD.MM.YYYY');
        let diaSemana = diasSemana[moment(data).isoWeekday() - 1];

        setDia(dia);
        setDiaSemana(diaSemana);
        setMilitar(militar);
        setViaturas(viaturas);

        document.title = `${dia} - ${militar.toUpperCase()} - 1.o SGBM-IND`;
      })
      .catch(err => console.error(err));

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
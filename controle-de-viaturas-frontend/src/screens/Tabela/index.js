import { useState, useEffect } from 'react';
import './styles.css';

import api from './../../services/api';

import moment from 'moment';

function Tabela() {
  const [data, setData] = useState('Carregando...');
  const [ultimoMilitar, setUltimoMilitar] = useState('');

  const [viaturas, setViaturas] = useState([]);

  function buscarViaturas() {
    api.get('/checkpoint')
      .then(res => {
        let { data, ultimoMilitar } = res.data;

        setData(moment(data).format('DD.MM.YYYY'));
        setUltimoMilitar(ultimoMilitar);

        api.get('/viaturas')
          .then(async res => {
            await setViaturas(res.data);
            window.print();
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

  }

  useEffect(() => {
    buscarViaturas();
  }, []);

  return (
    <div className="tabela">
      <h1>{data} - {ultimoMilitar}</h1>
      <table>
        <tr>
          <th>Prefixo</th>
          <th>KM</th>
          <th>Nível de combustível</th>
          <th>Comentário</th>
        </tr>
        {viaturas.map(({ _id, prefixo, km, nivelCombustivel, comentario }) => (
          <tr key={_id}>
            <td>{prefixo}</td>
            <td>{km}</td>
            <td>{nivelCombustivel}</td>
            {comentario ? <td>{comentario}</td> : <td style={{ fontFamily: 'monospace' }}>&Oslash;</td>}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Tabela;
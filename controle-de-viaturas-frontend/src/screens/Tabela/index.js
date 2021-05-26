import { useState, useEffect } from 'react';
import './styles.css';

import api from './../../services/api';

function Tabela() {
  const [viaturas, setViaturas] = useState([]);

  function buscarViaturas() {
    api.get('/viaturas')
      .then(async res => {
        await setViaturas(res.data);
        window.print();
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    buscarViaturas();
  }, []);

  return (
    <div className="tabela">
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
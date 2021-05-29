import { useState, useEffect, Fragment } from 'react';
import './styles.css';

import randomDate from './../../functions/randomDate';

import api from './../../services/api';

function Teste() {
  const [viaturas, setViaturas] = useState([]);

  const [tremDeSos, setTremDeSos] = useState([]);
  const [noPatio, setNoPatio] = useState([]);

  const exibirViaturas = true;

  function cadastrarViaturaAleatoria() {
    const viatura = {};

    viatura.prefixo = '';

    for(let i = 0; i < 3; ++i) {
      viatura.prefixo += `${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`;
    }
    
    viatura.prefixo += ' ';
    
    for(let i = 0; i < 2; ++i) {
      viatura.prefixo += `${Math.floor(Math.random() * 9) + 1}`;
    }
    
    viatura.categoria = Math.floor(Math.random() * 2) ? 'Trem de S.O.S' : 'No pátio';
    viatura.km = Math.floor(Math.random() * 1e5) + 1e4;

    let niveisCombustivel = ['Cheio', '¾', '½', '¼', 'Reserva'];
    let indice = Math.floor(Math.random() * niveisCombustivel.length);

    viatura.nivelCombustivel = niveisCombustivel[indice];
    viatura.comentario = '';

    api.post('/viaturas', viatura)
      .then(res => {
        console.log(res.data);
        console.log('Viatura cadastrada com sucesso.');
      })
      .catch(err => console.error(err));
  }

  function cadastrarRegistroAleatoria() {
    const registro = {};

    let militares = [
      'Soldado Fulano',
      'Cabo Loso',
      'Sargento Beltrano',
      'Sargento Fahür',
      'Tenente Ciclano',
      'Comandante Hamilton',
      'Grande Almirante Thrawn', 
      'Anspeçada Eren Jaeger'
    ];
    let indice = Math.floor(Math.random() * militares.length);

    registro.ultimoMilitar = militares[indice];
    registro.data = randomDate();
    registro.viaturas = viaturas;

    api.post('/registros', registro)
      .then(res => {
        console.log(res.data);
        console.log('Registrado com sucesso.');
      })
      .catch(err => console.error(err));
  }

  function buscarViaturas() {
    api.get('/viaturas')
      .then(res => {
        let viaturas = res.data;
        setViaturas(viaturas);
        setTremDeSos(viaturas.filter(viatura => viatura.categoria === 'Trem de S.O.S'));
        setNoPatio(viaturas.filter(viatura => viatura.categoria === 'No pátio'));
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    buscarViaturas();
  }, []);

  return (
    <div className="teste">
      <button onClick={cadastrarViaturaAleatoria}>Cadastrar viatura randômica</button>
      <button onClick={cadastrarRegistroAleatoria}>Cadastrar registro randômico</button>
      
      {exibirViaturas ? (
        <div>
          <h2>Trem de S.O.S</h2>
          <table>
            <thead>
              <tr>
                <th>Prefixo</th>
                <th>KM</th>
                <th>Nível de combustível</th>
                <th>Comentário</th>
              </tr>
            </thead>
            <tbody>
              {tremDeSos.map(({ _id, prefixo, km, nivelCombustivel, comentario }) => {
                return (
                  <tr key={_id}>
                    <td>{prefixo}</td>
                    <td>{km}</td>
                    <td>{nivelCombustivel}</td>
                    {comentario ? <td>{comentario}</td> : <td style={{ fontFamily: 'monospace' }}>&Oslash;</td>}
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
                <th>Comentário</th>
              </tr>
            </thead>
            <tbody>
              {noPatio.map(({ _id, prefixo, km, nivelCombustivel, comentario }) => {
                return (
                  <tr key={_id}>
                    <td>{prefixo}</td>
                    <td>{km}</td>
                    <td>{nivelCombustivel}</td>
                    {comentario ? <td>{comentario}</td> : <td style={{ fontFamily: 'monospace' }}>&Oslash;</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : <></>}
    </div>
  );
}

export default Teste;
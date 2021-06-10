import { useState, useEffect } from 'react';
import './styles.css';

import { niveisCombustivel } from './../../config/default.json';

import randomDate from './../../functions/randomDate';

import api from './../../services/api';

import viaturasMock from './../../tmp/viaturas.json';

function Teste() {
  const [viaturas, setViaturas] = useState([]);
  const [militares, setMilitares] = useState([]);
  const [categorias, setCategorias] = useState([]);

  function cadastrarViaturaAleatoria() {
    const viatura = {};

    viatura.prefixo = '';

    for(let i = 0; i < 3; ++i)
      viatura.prefixo += `${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`;
    
    viatura.prefixo += ' ';
    
    for(let i = 0; i < 2; ++i)
      viatura.prefixo += `${Math.floor(Math.random() * 9) + 1}`;
  

    viatura.km = Math.floor(Math.random() * 1e5) + 1e4;


    let indiceNivelCombustivel = Math.floor(Math.random() * niveisCombustivel.length);
    
    viatura.nivelCombustivel = niveisCombustivel[indiceNivelCombustivel];


    viatura.comentario = '';


    let _categorias = categorias.map(categoria => categoria._id);
    
    let indiceCategoria = Math.floor(Math.random() * _categorias.length);

    viatura.categoria = _categorias[indiceCategoria];


    api.post('/viaturas', viatura)
      .then(res => {
        console.log(res.data);
        console.log('Viatura cadastrada com sucesso.');
      })
      .catch(err => console.error(err));
  }

  function cadastrarRegistroAleatoria() {
    const registro = {};

    let _militares = [militares[0]._id];
    
    let indiceMilitares = Math.floor(Math.random() * _militares.length);

    registro.signatario = _militares[indiceMilitares];

    registro.viaturas = viaturas;

    registro.createdAt = randomDate();

    api.post('/registros', registro)
      .then(res => {
        console.log(res.data);
        console.log('Registrado com sucesso.');
      })
      .catch(err => console.error(err));
  }

  function cadastrarViaturasReais() {
    api.post('/carreata', viaturasMock)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  function buscarViaturas() {
    api.get('/viaturas')
      .then(res => setViaturas(res.data))
      .catch(err => console.error(err));
  }

  function buscarMilitares() {
    api.get('/militares')
      .then(res => setMilitares(res.data))
      .catch(err => console.error(err));
  }

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    document.title = 'TESTE ― 1º SGBM/IND';
    buscarViaturas();
    buscarMilitares();
    buscarCategorias();
  }, []);

  return (
    <div className="teste">
      <button onClick={cadastrarViaturaAleatoria}>Cadastrar viatura randômica</button>
      <button onClick={cadastrarRegistroAleatoria}>Cadastrar registro randômico</button>
      <button onClick={cadastrarViaturasReais}>Cadastrar viaturas reais</button>

      {categorias.map(({ _id, nome }) => {
        const viaturasFiltradas = viaturas.filter(viatura => viatura.categoria._id === _id);
        
        return viaturasFiltradas.length > 0 ? (
          <div key={_id}>
            <h2>{nome}</h2>

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
                {viaturasFiltradas.map(({ _id: idViatura, prefixo, km, nivelCombustivel, comentario }) => (
                  <tr key={idViatura}>
                    <td>{prefixo}</td>
                    <td>{km}</td>
                    <td>{nivelCombustivel}</td>
                    <td>{comentario}</td>
                  </tr>  
                ))}
              </tbody>
            </table>
          </div>
        ) : <></>;
      })}
    </div>
  );
}

export default Teste;
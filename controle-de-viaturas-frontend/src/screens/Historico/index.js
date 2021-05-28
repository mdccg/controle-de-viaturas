import { useState, useEffect, Fragment } from 'react';
import './styles.css';

import Header from './../../components/Header';
import Voltar from './../../components/Voltar';
import Vazio from './../../components/Vazio';
import AcordeaoRegistro from './../../components/AcordeaoRegistro';

import api from './../../services/api';

function Historico() {
  const [registros, setRegistros] = useState({});

  function buscarDados() {
    api.get('/registros')
      //.then(res => setRegistros(res.data))
      .then(res => {
        setRegistros(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    document.title = 'HISTÓRICO ― 1º SGBM/IND';
    buscarDados();
  }, []);

  return (
    <div className="historico">
      <Header titulo="Histórico ― 1º SGBM/IND" />
      
      <div className="container">
        <Voltar />

        {JSON.stringify(registros) !== '{}' ? Object.keys(registros).map(mes => {
          const acordeoes = registros[mes];
          
          return (
            <Fragment key={mes}>
              <div className="mes">
                <span>{mes}</span>
                <div className="divider"></div>
              </div>
              {acordeoes.map(acordeao => <AcordeaoRegistro key={acordeao._id} {...acordeao} />)}
            </Fragment>
          );
        }) : <Vazio>Histórico vazio</Vazio>}
      </div>
    </div>
  );
}

export default Historico;
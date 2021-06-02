import { useState, useEffect, Fragment } from 'react';
import './styles.css';

import Add from './../../assets/icons/Add';

import Header from './../../components/Header';

import api from './../../services/api';

import moment from 'moment';

function Viaturas() {
  const [viaturas, setViaturas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [ultimoRegistro, setUltimoRegistro] = useState({ signatario: {}, data: '' });

  function buscarUltimoRegistro() {
    api.get('/historico')
      .then(res => {
        let historico = res.data;
        let ultimoMes = Object.keys(historico).shift();
        let { signatario, createdAt } = historico[ultimoMes].shift();
        
        let dia     = moment(createdAt).format('DD [de] MMMM [de] YYYY')
        let horario = moment(createdAt).format('hh[:]mm');

        let ultimoRegistro = { signatario, horario, dia };
        setUltimoRegistro(ultimoRegistro);
      })
      .catch(err => console.error(err));
  }

  function buscarViaturas() {
    api.get('/viaturas')
      .then(res => setViaturas(res.data))
      .catch(err => console.error(err));
  }

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function abrirModalAdicionarViatura() {
    console.log('Hora de adicionar nova viatura...');
  }

  useEffect(() => {
    buscarUltimoRegistro();
    buscarCategorias();
    buscarViaturas();
  }, []);

  return (
    <>
      <div className="viaturas">
        <Header />

        <div className="container">
          <div className="checkpoint">
            <span style={{ fontFamily: 'OswaldLight' }}>
              Último militar a atualizar:  <span className="signatario">{ultimoRegistro.signatario.patente} {ultimoRegistro.signatario.nome}</span>
            </span>

            <span className="data">{ultimoRegistro.horario} &bull; {ultimoRegistro.dia}</span>
          </div>

          {categorias.map(({ _id, nome }) => (
            <div className="lista-viaturas" key={_id}>
              <span className="categoria">{nome}</span>
              
              {viaturas.filter(viatura => viatura.categoria._id === _id)
                .map(viatura => (
                  // TODO componente da viatura aqui
                  <span>{viatura.prefixo}</span>
                ))}
            </div>
          ))}

          {Array(50).fill(<span>Lacrimosa</span>).map(span => span)}
        </div>
      </div>

      <div className="btn-adicionar-nova-viatura" onClick={abrirModalAdicionarViatura}>
        <Add />
      </div>
    </>
  );
}

export default Viaturas;
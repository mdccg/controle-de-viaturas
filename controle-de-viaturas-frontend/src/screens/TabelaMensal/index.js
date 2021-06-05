import { useState, useEffect } from 'react';
import './styles.css';

import { diasSemana } from './../../config/default.json';

import api from './../../services/api';

import moment from 'moment';

function RegistroTextual({ signatario = {}, viaturas = [], createdAt: data, categorias = [] }) {
  const diaSemana = diasSemana[moment(data).isoWeekday() - 1];
  const dataFormatada = moment(data).format('DD.MM.YYYY');
  const nomeMilitar = signatario.patente + ' ' + signatario.nome;

  return (
    <div className="registro">
      <h3 className="data-militar">{diaSemana}, {dataFormatada} - {nomeMilitar}</h3>
      
      {categorias.map(({ _id, nome }) => {
        const viaturasFiltradas = viaturas.filter(viatura => viatura.categoria._id === _id);

        return viaturasFiltradas.length > 0 ? (
          <div key={_id}>
            <h4>{nome}</h4>
            
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
            <div className="divider"></div>
          </div>
        ) : <></>;
      })}
    </div>
  );
}

function TabelaMensal() {
  const [categorias, setCategorias] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [mes, setMes] = useState('');

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function montarRegistros() {
    window.addEventListener('afterprint', function() {
      this.close();
    });
    
    api.get('/relatorio')
      .then(async res => {
        if(res.data.tipo === 'diario')
          window.close();

        let { mes, registros } = res.data.relatorio;

        await setMes(mes);
        await setRegistros(registros);
        await buscarCategorias();

        document.title = `${mes.toUpperCase()} - 1.o SGBM-IND`;
      })
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => window.print(), 5e2));
  }

  useEffect(() => {
    montarRegistros();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tabela mensal">
      <h1>CONTROLE DE VTR ― 1º SGBM/IND</h1>
      
      <h2 className="mes">{mes}</h2>
      
      {registros.map((registro, index) => (
        <RegistroTextual key={index} {...registro} categorias={categorias} />
      ))}
    </div>
  );
}

export default TabelaMensal;
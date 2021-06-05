import { useState, useEffect } from 'react';

import { diasSemana } from './../../config/default.json';

import api from './../../services/api';

import moment from 'moment';

function TabelaDiaria() {
  const [categorias, setCategorias] = useState([]);
  const [viaturas, setViaturas] = useState([]);
  const [dia, setDia] = useState('');
  
  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function montarRegistro() {
    window.addEventListener('afterprint', function() {
      this.close();
    });

    api.get('/relatorio')
      .then(async res => {
        if(res.data.tipo === 'mensal')
          window.close();

        let { signatario, viaturas, data } = res.data.relatorio;
        
        let dia = moment(data).format('DD.MM.YYYY');
        let diaSemana = diasSemana[moment(data).isoWeekday() - 1];
        let nomeMilitar = `${signatario.patente} ${signatario.nome}`;

        await setDia(dia);
        await setDiaSemana(diaSemana);
        await setNomeMilitar(nomeMilitar);
        await setViaturas(viaturas);
        await buscarCategorias();

        document.title = `${dia} - ${nomeMilitar.toUpperCase()} - 1.o SGBM-IND`;
      })
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => window.print(), 5e2));
  }

  const [diaSemana, setDiaSemana] = useState('');
  const [nomeMilitar, setNomeMilitar] = useState('');

  useEffect(() => {
    montarRegistro();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tabela">
      <h1>CONTROLE DE VTR ― 1º SGBM/IND</h1>
      
      <h2>{diaSemana.toUpperCase()}, {dia} - {nomeMilitar.toUpperCase()}</h2>
      
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
          </div>
        ) : <></>;
      })}
    </div>
  );
}

export default TabelaDiaria;
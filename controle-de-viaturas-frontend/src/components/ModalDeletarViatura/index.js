import React from 'react';
import { useState } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalIntitulado from './../ModalIntitulado';

import ordenarPorIndice from './../../functions/ordenarPorIndice';

import api from './../../services/api';

function ModalDeletarViatura({
  enviarRegistro,
  desencarrilharViatura, 
  viatura = {},
  viaturas = [],
  setViaturas,
  aberto,
  setAberto,
  setViaturaDeletada
}) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function decrementarIndicesCategoriaSubsequentes() {
    var idCategoria = viatura.categoria._id;

    var viaturasPorCategoria = viaturas
      .filter(viatura => viatura.categoria._id === idCategoria)
      .sort(ordenarPorIndice);

    var viaturasAtualizadas = [];

    for (let i = viatura.indiceCategoria; i < viaturasPorCategoria.length; ++i) {
      console.log(viaturasPorCategoria[i].prefixo);
      --viaturasPorCategoria[i].indiceCategoria;
      viaturasAtualizadas.push(viaturasPorCategoria[i]);
    }

    let _viaturas = [...viaturas];

    for (var viaturaAtualizada of viaturasAtualizadas) {
      let indice = _viaturas.map(viatura => viatura._id).indexOf(viaturaAtualizada._id);
      _viaturas[indice] = viaturaAtualizada;
    }

    var { _id: idViaturaDeletada } = viatura;

    _viaturas = _viaturas.filter(viatura => viatura._id !== idViaturaDeletada);
    setViaturas(_viaturas);
  }

  function deletarViatura() {
    setEfetuandoRequisicao(true);

    api.delete(`/viaturas/${viatura._id}`)
      .then(() => {
        enviarRegistro();
        desencarrilharViatura(viatura._id);
        // decrementarIndicesCategoriaSubsequentes();
        setViaturaDeletada(value => !value);

        setAberto(false);
      })
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }
  
  return (
    <ModalIntitulado
      aberto={aberto}
      setAberto={setAberto}
      cor="var(--chi-gong)"
      titulo={`Deletar viatura ${viatura.prefixo}`}>
        
      <div className="modal-deletar-viatura">
        <span style={{ fontFamily: 'OswaldLight' }}>
          Tem certeza que deseja deletar definitivamente a viatura <span className="prefixo-viatura">{viatura.prefixo}</span>?
        </span>

        <div className="botoes">
          <div
            onClick={deletarViatura}
            className="botao"
            style={{ backgroundColor: 'var(--chi-gong)' }}>
            {efetuandoRequisicao ? <Spinner /> : <span>Deletar</span>}
          </div>
          
          <div className="diastema"></div>

          <div
            onClick={() => setAberto(false)}
            className="botao"
            style={{ backgroundColor: 'var(--american-river)' }}>
            <span>Cancelar</span>
          </div>
        </div>
      </div>
    </ModalIntitulado>
  );
}

export default ModalDeletarViatura;
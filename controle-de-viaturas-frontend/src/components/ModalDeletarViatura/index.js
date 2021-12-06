import React from 'react';
import { useState } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalIntitulado from './../ModalIntitulado';

import api from './../../services/api';

function ModalDeletarViatura({ enviarRegistro, desencarrilharViatura, viatura = {}, aberto, setAberto }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function deletarViatura() {
    setEfetuandoRequisicao(true);

    api.delete(`/viaturas/${viatura._id}`)
      .then(() => {
        enviarRegistro();
        desencarrilharViatura(viatura._id);

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
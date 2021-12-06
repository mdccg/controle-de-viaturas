import React from 'react';
import { useState } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalIntitulado from './../ModalIntitulado';

import api from './../../services/api';

function ModalDeletarTopico({ topico = {}, deletarTopico, aberto, setAberto }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function remover() {
    setEfetuandoRequisicao(true);

    api.delete(`/topicos/${topico._id}`)
      .then(() => {
        deletarTopico(topico._id);

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
      titulo={topico.titulo}>
      <div className="modal-deletar-topico">
        <span>
          Tem certeza que deseja remover o tópico <span className="titulo-topico">{topico.titulo}</span> da manutenção das viaturas?
        </span>

        <div className="botoes">
          <div
            onClick={remover}
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

export default ModalDeletarTopico;
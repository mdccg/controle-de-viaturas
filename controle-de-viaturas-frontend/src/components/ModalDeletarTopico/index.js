import { useState } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalIntitulado from './../ModalIntitulado';

function ModalDeletarTopico({ topico = {}, deletarTopico, aberto, setAberto }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function remover() {
    // TODO back-end aqui
    setEfetuandoRequisicao(true);

    console.log(topico._id);
    
    setTimeout(() => {
      deletarTopico(topico._id);
      
      setEfetuandoRequisicao(false);
      setAberto(false);
    }, 2e3);
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
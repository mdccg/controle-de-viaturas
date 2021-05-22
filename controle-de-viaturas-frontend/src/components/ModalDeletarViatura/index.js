import { useState } from 'react';
import './styles.css';

import Cancel from './../../assets/icons/Cancel';
import Spinner from './../../assets/icons/Spinner';

function ModalDeletarViatura({ viatura = {}, atualizarCheckpoint, setDeletandoViatura, desencarrilharViatura }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function cancelar() {
    setDeletandoViatura(false);
  }

  function deletarViatura() {
    setEfetuandoRequisicao(true);

    setTimeout(() => {
      // TODO requisição aqui

      console.log(viatura._id);
      
      atualizarCheckpoint();
      desencarrilharViatura(viatura._id);
      setEfetuandoRequisicao(false);
      setDeletandoViatura(false);
    }, 3e3);
  }

  return (
    <div className="modal-deletar-viatura">
      <div className="hitbox-btn-fechar-modal-deletar-viatura">
        <div className="btn-fechar-modal-deletar-viatura" onClick={cancelar}>
          <Cancel />
        </div>
      </div>

      <div className="modal-deletar-viatura-header">
        <span>Excluir a viatura {viatura.prefixo}</span>
      </div>

      <div className="modal-deletar-viatura-body">
        <span style={{ fontFamily: 'OswaldLight' }}>
          Tem certeza de deseja excluir a viatura <span style={{ fontFamily: 'OswaldRegular' }}>{viatura.prefixo}</span> permanentemente?
        </span>

        <div className="btn" onClick={efetuandoRequisicao ? undefined : deletarViatura}>
          {efetuandoRequisicao ? <Spinner /> : <span>Confirmar exclusão</span>}
        </div>
      </div>
    </div>
  );
}

export default ModalDeletarViatura;
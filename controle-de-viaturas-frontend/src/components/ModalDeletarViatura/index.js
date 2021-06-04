import { useState } from 'react';
import './styles.css';

import Cancel from './../../assets/icons/Cancel';
import Spinner from './../../assets/icons/Spinner';

import TransitionsModal from './../TransitionsModal';

import api from './../../services/api';

import { toast } from 'react-toastify';

function ModalDeletarViatura({ recarregar, viatura = {}, aberto, setAberto }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function deletarViatura() {
    setEfetuandoRequisicao(true);

    api.delete(`/viaturas/${viatura._id}`)
      .then(res => {
        toast.success(res.data);

        setAberto(false);
        recarregar();
      })
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }
  
  return (
    <TransitionsModal open={aberto} setOpen={setAberto}>
      <div className="modal-deletar-viatura">
        <div className="cabecalho">
          <div className="icone" onClick={() => setAberto(false)}>
            <Cancel />
          </div>

          <span>Deletar viatura {viatura.prefixo}</span>
        </div>

        <div className="corpo">
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
      </div>
    </TransitionsModal>
  );
}

export default ModalDeletarViatura;
import './styles.css';

import ModalGenerico from './../ModalGenerico';

function ModalAdicionarTopico({ aberto, setAberto }) {
  return (
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-adicionar-topico">
      <span>Lacrimosa</span>
    </ModalGenerico>
  );
}

export default ModalAdicionarTopico;
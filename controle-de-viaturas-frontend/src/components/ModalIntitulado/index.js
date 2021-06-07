import './styles.css';

import Cancel from './../../assets/icons/Cancel';

import TransitionsModal from './../TransitionsModal';

function ModalIntitulado({ aberto, setAberto, cor = 'red', titulo = 'Título', children }) {

  return (
    <TransitionsModal open={aberto} setOpen={setAberto}>
      <div className="modal-intitulado">
        <div className="cabecalho" style={{ backgroundColor: cor }}>
          <div className="icone" onClick={() => setAberto(false)}>
            <Cancel />
          </div>

          <span>{titulo}</span>
        </div>

        <div className="corpo">
          {children}
        </div>
      </div>
    </TransitionsModal>
  );
}

export default ModalIntitulado;
import React from 'react';
import './styles.css';

import TransitionsModal from './../TransitionsModal';

function ModalGenerico({ aberto, setAberto, children, className = '' }) {
  return (
    <TransitionsModal open={aberto} setOpen={setAberto}>
      <div className="modal">
        <div className={className}>
          {children}
        </div>
      </div>
    </TransitionsModal>
  );
}

export default ModalGenerico;
import './styles.css';

import TransitionsModal from './../TransitionsModal';

function Modal({ open, setOpen, children }) {
  return (
    <TransitionsModal open={open} setOpen={setOpen}>
      <div className="modal">
        {children}
      </div>
    </TransitionsModal>
  );
}

export default Modal;
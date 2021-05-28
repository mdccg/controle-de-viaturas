import './styles.css';

import Empty from './../../assets/icons/Empty';

function Vazio({ children = 'Vazio' }) {

  return (
    <div className="noselect componente-vazio">
      <Empty />
      <span>{children}</span>
    </div>
  );
}

export default Vazio;
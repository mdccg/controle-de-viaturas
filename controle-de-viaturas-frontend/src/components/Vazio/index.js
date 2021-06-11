import './styles.css';

import Ban from './../../assets/icons/Ban';
import _Firetruck from './../../assets/icons/_Firetruck';
import _Firefighter from './../../assets/icons/_Firefighter';
import Notification from './../../assets/icons/Notification';
import Paper from './../../assets/icons/Paper';

const icones = {
  // eslint-disable-next-line
  viatura: <_Firetruck />,
  // eslint-disable-next-line
  militar: <_Firefighter />,
  solicitacao: <Notification />,
  registro: <Paper />
};

function Vazio({ icone, children, transparente = true, cor =  'var(--soothing-breeze)' }) {
  return (
    <div className="componente-vazio" style={{ opacity: transparente ? .625 : 1 }}>
    <div className="icones">
      <Ban />
      {icones[icone]}
    </div>

    <span className="noselect" style={{ color: cor }}>{children}</span>
  </div>
  );
}

export default Vazio;
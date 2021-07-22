import { useHistory } from 'react-router-dom';
import './styles.css';

import ArrowLeftSolid from './../../assets/icons/ArrowLeftSolid';

function Voltar() {
  const history = useHistory();

  return (
    <>
      <div className="menu-voltar">
        <div className="icone" onClick={history.goBack}>
          <ArrowLeftSolid />
        </div>
      </div>
      
      <div className="menu-voltar-hitbox"></div>
    </>
  );
}

export default Voltar;
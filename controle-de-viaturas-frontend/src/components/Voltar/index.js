import { Link } from 'react-router-dom';
import './styles.css';

import DownArrow from './../../assets/icons/DownArrow';

function Voltar({ para = '/' }) {
  return (
    <Link to={para} className="voltar-tela">
      <DownArrow />
      <span>Voltar</span>
    </Link>
  );
}

export default Voltar;
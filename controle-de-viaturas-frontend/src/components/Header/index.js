import './styles.css';

import FireTruckMin from './../../assets/images/fire-truck-min-5-per-1.jpg';

function Header({ titulo = 'CONTROLE DE VTR ― 1º SGBM/IND' }) {
  return (
    <div className="header">
      <span>{titulo}</span>
      <div className="sombra-da-imagem"></div>
      <img className="imagem-de-fundo" src={FireTruckMin} alt="" />
    </div>
  );
}

export default Header;
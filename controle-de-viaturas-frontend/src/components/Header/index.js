import './styles.css';

import FireTruckMin from './../../assets/images/fire-truck-min-5-per-1.jpg';

function Header() {
  return (
    <div className="header">
      <span>Controle das viaturas</span>
      <div className="sombra-da-imagem"></div>
      <img className="imagem-de-fundo" src={FireTruckMin} alt="" />
    </div>
  );
}

export default Header;
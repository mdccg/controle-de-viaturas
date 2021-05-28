import './styles.css';

import Logotipo from './../../assets/images/connor-betts-QK6Iwzd5MhE-unsplash.jpg';

function Header({ titulo = 'Controle de VTR ― 1º SGBM/IND' }) {
  return (
    <div className="header">
      <span>{titulo}</span>
      <div className="sombra-da-imagem"></div>
      <img className="imagem-de-fundo" src={Logotipo} alt="" />
    </div>
  );
}

export default Header;
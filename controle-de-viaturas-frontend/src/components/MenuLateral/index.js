import './styles.css';

import getUsuario from './../../functions/getUsuario';

function MenuLateral() {
  const usuario = getUsuario();

  return (
    <div className="menu-lateral">
      <span>{usuario.patente} {usuario.nome}</span>
    </div>
  );
}

export default MenuLateral;
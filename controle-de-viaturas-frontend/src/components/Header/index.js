import { useState } from 'react';
import './styles.css';

import Menu from './../../assets/icons/Menu';

import SwipeableTemporaryDrawer from './../SwipeableTemporaryDrawer';
import MenuLateral from './../MenuLateral';

function Header() {
  const [aberto, setAberto] = useState(false);

  function abrirMenu() {
    setAberto(true);
  }

  return (
    <>
      <div className="header">
        <div className="icone" onClick={abrirMenu}>
          <Menu />
        </div>
      </div>
      
      <div className="header-hitbox"></div>

      <SwipeableTemporaryDrawer state={aberto} setState={setAberto}>
        <MenuLateral />
      </SwipeableTemporaryDrawer>
    </>
  );
}

export default Header;
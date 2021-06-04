import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import FireTruck from './../../assets/icons/FireTruck';
import User from './../../assets/icons/User';
import Clipboard from './../../assets/icons/Clipboard';
import Bell from './../../assets/icons/Bell';
import _Bell from './../../assets/icons/_Bell';
import Firefighter from './../../assets/icons/Firefighter';
import OnOffButton from './../../assets/icons/OnOffButton';

import getUsuario from './../../functions/getUsuario';
import encerrarSessao from './../../functions/encerrarSessao';

import api from './../../services/api';

var rotas = [
  { icone: FireTruck, tela: 'Viaturas', rota: '/' },
  { icone: User, tela: 'Meu perfil', rota: '/perfil' }
];

var sudoRotas = solicitando => ([
  { icone: Clipboard, tela: 'Histórico de formulários', rota: '/historico' },
  { icone: solicitando ? _Bell : Bell, tela: 'Solicitações', rota: '/solicitacoes' },
  { icone: Firefighter, tela: 'Militares', rota: '/usuarios' }
]);

function Rota({ icone: Icone, tela, rota }) {
  return (
    <li>
      <Link className="rota" to={rota}>
        <Icone />
        <span>{tela}</span>
      </Link>
    </li>
  );
}

function MenuLateral() {
  const usuario = getUsuario();
  
  const [solicitando, setSolicitando] = useState(false);

  function verificarSolicitacoes() {
    api.get('/militares?ativo=false')
      .then(res => setSolicitando(res.data.length > 0))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    verificarSolicitacoes();
  }, []);

  return (
    <div className="menu-lateral">
      <div className="nome">
        <span>{usuario.patente} {usuario.nome}</span>
      </div>

      <ul>
        {rotas.map(rota => <Rota key={rota.rota} {...rota} />)}
        {usuario.tipo === 'Administrador' ? sudoRotas(solicitando).map(rota => <Rota key={rota.rota} {...rota} />) : <></>}
      </ul>

      <div className="logout" onClick={encerrarSessao}>
        <OnOffButton />
        <span>Encerrar sessão</span>
      </div>
    </div>
  );
}

export default MenuLateral;
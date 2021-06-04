import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import FireTruck from './../../assets/icons/FireTruck';
//import User from './../../assets/icons/User';
import Clipboard from './../../assets/icons/Clipboard';
import Bell from './../../assets/icons/Bell';
import Firefighter from './../../assets/icons/Firefighter';

import Cancel from './../../assets/icons/Cancel'; // TODO remover depois

import getUsuario from './../../functions/getUsuario';
import encerrarSessao from './../../functions/encerrarSessao';

import api from './../../services/api';

var rotas = solicitando => ([
  { icone: FireTruck, tela: 'Viaturas', rota: '/' },
  { icone: Cancel, tela: 'Meu perfil', rota: '/perfil' },
  { icone: Clipboard, tela: 'Histórico de formulários', rota: '/historico' },
  { icone: solicitando ? Cancel : Bell, tela: 'Solicitações', rota: '/solicitacoes' },
  { icone: Firefighter, tela: 'Militares', rota: '/usuarios' }
]);

function Rota({ icone: _icone, tela, rota }) {
  return (
    <li>
      <Link className="rota" to={rota}>
        <_icone />
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
        {rotas(solicitando).map(rota => <Rota key={rota.rota} {...rota} />)}
      </ul>

      <div className="logout" onClick={encerrarSessao}>
        <Cancel />
        <span>Encerrar sessão</span>
      </div>
    </div>
  );
}

export default MenuLateral;
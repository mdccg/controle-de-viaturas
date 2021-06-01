import { useState, useEffect } from 'react';
import './App.css';

import getUsuario from './functions/getUsuario';
import getToken   from './functions/getToken';

import Routes from './routes';

import { useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [buscandoDados, setBuscandoDados] = useState(true);

  const [token, setToken]     = useState('');

  const location = useLocation();

  function atualizarUsuario() {
    let usuario = getUsuario();
    let token   = getToken();
    
    setToken(token);

    if(usuario.ativo === true) {
      // redirecionar para /viaturas
      console.log('Usuário logado e admitido.');
    
    } else if(usuario.ativo === false) {
      // redirecionar para /pendente
      console.log('Usuário logado e pendente.');
    
    } else if(usuario.ativo === undefined) {
      console.log('Nenhum usuário logado.');

    }

    setBuscandoDados(false);
  }

  function verificarToken() {
    /*
    console.log('Verificar token aqui!');
    console.log(token);
    */


    localStorage.setItem('@teste', '123');
  }

  useEffect(() => {
    // FIXME detectar mudança na variável localStorage 
    window.addEventListener('storage', (function(e) {
      console.log('Testando...');

    }).bind(this));

    atualizarUsuario();
  }, []);

  useEffect(() => {
    if(token)
      verificarToken();

  }, [location.pathname]);

  return !buscandoDados ? (
    <div className="App">
      <Routes />
      <ToastContainer />
    </div>
  ) : <></>;
}

export default App;
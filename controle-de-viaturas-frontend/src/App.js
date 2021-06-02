import { useState, useEffect } from 'react';
import './App.css';

import getUsuario from './functions/getUsuario';
import putUsuario from './functions/putUsuario';
import getToken   from './functions/getToken';

import api from './services/api';

import Routes from './Routes';

import { useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [buscandoDados, setBuscandoDados] = useState(true);

  const [usuario, setUsuario] = useState({});
  const [token, setToken]     = useState('');

  const location = useLocation();

  /** https://forums.asp.net/t/2164818.aspx?How+to+detect+if+localstorage+has+been+changed */
  function detectarMudancaLocalStorage() {
    var originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      var event = new Event('itemInserted');

      event.value = value; 
      event.key = key; 

      document.dispatchEvent(event);

      originalSetItem.apply(this, arguments);
    }

    var localStorageSetHandler = function (e) {
      window.location.pathname = '/';
      atualizarUsuario(); // FIXME remover caso dê erro
    }

    document.addEventListener('itemInserted', localStorageSetHandler, false);
  }

  function atualizarUsuario() {
    let usuario = getUsuario();
    let token   = getToken();
    
    setUsuario(usuario);
    setToken(token);

    setBuscandoDados(false);
  }

  function encerrarSessao() {
    localStorage.removeItem('@usuario');
    localStorage.removeItem('@token');
    setUsuario({});
    setToken('');
  }

  function verificarToken() {
    let usuario = getUsuario();
    let token   = getToken();

    let usuarioEncontrado = JSON.stringify(usuario) !== '{}';

    // eslint-disable-next-line
    if(!token && usuarioEncontrado || !usuarioEncontrado && token) {
      encerrarSessao();
      return;
    }

    if(!token) return;

    const config = { headers: { authorization: `Bearer ${token}` } };

    api.get('/login', config)
      .then(res => {
        const { _id } = res.data;

        api.get(`/militares?_id=${_id}`)
          .then(res => {
            let militar = res.data.pop();
            
            if(JSON.stringify(usuario) !== JSON.stringify(militar)) {
              setUsuario(militar);
              putUsuario(militar);
            }

          }).catch(() => encerrarSessao());
      })
      .catch(() => encerrarSessao());
  }

  useEffect(() => {
    verificarToken();
    atualizarUsuario();
    detectarMudancaLocalStorage();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    verificarToken();
    // eslint-disable-next-line
  }, [location.pathname]);

  return !buscandoDados ? (
    <div className="App">
      <Routes usuario={usuario} token={token} />
      <ToastContainer />
    </div>
  ) : <></>;
}

export default App;
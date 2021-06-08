import { useState, useEffect } from 'react';
import './App.css';

import getToken   from './functions/getToken';
import getUsuario from './functions/getUsuario';
import putUsuario from './functions/putUsuario';
import encerrarSessao from './functions/encerrarSessao';
import setApiInterceptor from './functions/setApiInterceptor';

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
    var originalSetItem    = localStorage.setItem;
    var originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function (key, value) {
      var event = new Event('itemInserted');

      event.value = value; 
      event.key = key; 

      document.dispatchEvent(event);

      originalSetItem.apply(this, arguments);
    }

    localStorage.removeItem = function (key, value) {
      var event = new Event('itemRemoved');

      event.value = value;
      event.key = key; 

      document.dispatchEvent(event);

      originalRemoveItem.apply(this, arguments);
    }

    var localStorageSetHandler = function (e) {
      // Ao inserir variável na local storage
      atualizarUsuario();
      window.location.pathname = '/';
    }

    var localStorageRemoveHandler = function (e) {
      // Ao remover variável da local storage
      atualizarUsuario();
      window.location.pathname = '/';
    }

    document.addEventListener('itemInserted', localStorageSetHandler, false);
    document.addEventListener('itemRemoved',  localStorageRemoveHandler, false);
  }

  function atualizarUsuario() {
    let usuario = getUsuario();
    let token   = getToken();
    
    setUsuario(usuario);
    setToken(token);

    setBuscandoDados(false);
  }

  function verificarToken() {
    let usuario = getUsuario();
    let token   = getToken();

    if(!token) {
      return;
    };

    const config = { headers: { authorization: `Bearer ${token}` } };

    api.get('/login', config)
      .then(res => {
        var militar = res.data;

        if(JSON.stringify(usuario) !== JSON.stringify(militar)) {
          setUsuario(militar);
          putUsuario(militar);
        }
      })
      .catch(() => encerrarSessao());
  }

  function aquecerHeroku() {
    api.get('/customer-wallets')
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    aquecerHeroku();
    verificarToken();
    atualizarUsuario();
    setApiInterceptor();
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
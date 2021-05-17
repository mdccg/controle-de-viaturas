import './App.css';

import Cadastro from './screens/Cadastro';

import Routes from './routes';

function App() {
  const nome = localStorage.getItem('nome');

  return (
    <div className="App">
      {!nome ? <Cadastro /> : <Routes />}
    </div>
  );
}

export default App;

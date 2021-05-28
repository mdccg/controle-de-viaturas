import { useState, useEffect } from 'react';
import './styles.css';

import Check from './../../assets/icons/Check';

function Cadastro() {
  const [nome, setNome] = useState('');

  function salvarNome() {
    localStorage.setItem('nome', nome);
    window.location.pathname = '/';
  }

  useEffect(() => {
    document.title = 'CONTROLE DE VTR ― 1º SGBM/IND';
  }, []);

  return (
    <div className="cadastro">
      <span>Informe a sua patente e o seu nome</span>

      <div className="form">
        <div className="input">
          <input
            autoFocus
            type="text"
            value={nome}
            onChange={event => setNome(event.target.value)}
            placeholder="Sargento Fulano" />
        </div>
        
        <div className={'botao ' + (!nome ? 'vazio' : '')} onClick={salvarNome}>
          <Check />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
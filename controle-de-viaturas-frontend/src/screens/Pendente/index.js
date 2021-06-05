import { useEffect } from 'react';
import './styles.css';

import Bell from './../../assets/icons/Bell';
import OnOffButton from './../../assets/icons/OnOffButton';

import Footer from './../../components/Footer';

import encerrarSessao from './../../functions/encerrarSessao';

function Pendente() {
  useEffect(() => {
    document.title = 'PENDENTE ― 1º SGBM/IND';
  }, []);

  return (
    <div className="pendente">
      <hgroup>
        <h1>Controle de viaturas</h1>
        <h2>1º SGBM/Ind</h2>
      </hgroup>

      <div className="card">
        <Bell />
        <h3>Aguardando confirmação...</h3>
        <p>
          Para evitar fraudes, uma solicitação será enviada aos administradores
          que a aprovarão e em seguida sua conta será admitida.
        </p>
      </div>

      <div className="noselect logout" onClick={encerrarSessao}>
        <div className="icone">
          <OnOffButton />
        </div>
        
        <span>Desconectar</span>
      </div>

      <Footer />
    </div>
  );
}

export default Pendente;
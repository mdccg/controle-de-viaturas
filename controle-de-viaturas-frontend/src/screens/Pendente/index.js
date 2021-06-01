import './styles.css';

import Bell from './../../assets/icons/Bell';

import Footer from './../../components/Footer';

function Pendente() {

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

      <Footer />
    </div>
  );
}

export default Pendente;
import { useState, useEffect } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';
import User from './../../assets/icons/User';

import Header from './../../components/Header';
import Vazio  from './../../components/Vazio';
import Footer from './../../components/Footer';
import ModalAprovarMilitar from './../../components/ModalAprovarMilitar';

import api from './../../services/api';

function Militar({ _id, patente, nome, email, tipo, ativo, setMilitar, setAprovandoMilitar }) {
  const nomeMilitar = `${patente} ${nome}`;

  async function aprovar() {
    let militar = { _id, patente, nome, email, tipo, ativo };
    await setMilitar(militar);
    setAprovandoMilitar(true);
  }

  return (
    <div className="militar" onClick={aprovar}>
      <div className="icone">
        <User />
      </div>

      <div className="corpo">
        <span className="nome">{nomeMilitar}</span>
        <span className="email">{email}</span>
      </div>
    </div>
  );
}

function Solicitacoes() {
  const [reload, setReload] = useState(false);

  const [buscandoMilitares, setBuscandoMilitares] = useState(false);
  const [aprovandoMilitar, setAprovandoMilitar]   = useState(false);

  const [militar, setMilitar] = useState({});
  const [militares, setMilitares] = useState([]);

  function recarregar() {
    setReload(!reload);
  }

  function buscarMilitares() {
    setBuscandoMilitares(true);

    api.get('/militares?ativo=false')
      .then(res => setMilitares(res.data))
      .catch(err => console.error(err))
      .finally(() => setBuscandoMilitares(false));
  }

  useEffect(() => {
    document.title = 'SOLICITAÇÕES ― 1º SGBM/IND';
    buscarMilitares();
  }, [reload]);

  return (
    <>
      <div className="solicitacoes">
        <Header />

        <div className="container">
          {buscandoMilitares ? <Spinner className="loader" /> : <></>}
          
          {!buscandoMilitares && militares.length === 0 ? <Vazio>Sem solicitações</Vazio> : <></>}
          
          <div className="militares">
            {militares.map(militar => (
              <Militar
                {...militar}
                key={militar._id}
                setMilitar={setMilitar}
                setAprovandoMilitar={setAprovandoMilitar} />
            ))}
          </div>
        </div>

        <Footer />
      </div>

      <ModalAprovarMilitar
        militar={militar}
        recarregar={recarregar}
        aberto={aprovandoMilitar}
        setAberto={setAprovandoMilitar} />
    </>
  );
}

export default Solicitacoes;
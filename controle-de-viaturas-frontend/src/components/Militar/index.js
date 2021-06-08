import './styles.css';

import User from './../../assets/icons/User';
import _User from './../../assets/icons/_User';
import Settings from './../../assets/icons/Settings';

function Militar({ _id, patente, nome, email, tipo, ativo, setMilitar, setAtualizandoMilitar }) {
  const nomeMilitar = `${patente} ${nome}`;

  const sudo = tipo === 'Administrador';

  async function atualizarMilitar() {
    let militar = { _id, patente, nome, email, tipo, ativo };
    await setMilitar(militar);
    setAtualizandoMilitar(true);
  }

  return (
    <div onClick={atualizarMilitar} className="componente-militar" key={_id}>
      <div className="cabeca icone">
        {/* eslint-disable-next-line */}
        {sudo ? <_User /> : <User />}
      </div>

      <div className="corpo">
        <span className="nome-militar">{nomeMilitar}</span>
        <span className="email">{email}</span>
      </div>

      <div className="rabo icone">
        <Settings />
      </div>
    </div>
  );
}

export default Militar;
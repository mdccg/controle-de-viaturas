import { useState } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalIntitulado from './../ModalIntitulado';

import api from './../../services/api';

import Switch from '@material-ui/core/Switch';

function ModalAprovarMilitar({ militar = {}, recarregar, aberto, setAberto }) {
  const [aprovandoMilitar, setAprovandoMilitar] = useState(false);
  const [deletandoMilitar, setDeletandoMilitar] = useState(false);
  
  const [sudo, setSudo] = useState(false);
  
  const nomeMilitar = `${militar.patente} ${militar.nome}`;

  function aprovar() {
    setAprovandoMilitar(true);

    let tipo = sudo ? 'Administrador' : 'Usuário';

    api.put(`/militares/${militar._id}`, { tipo, ativo: true })
      .then(() => {
        setAberto(false);
        recarregar();
      })
      .catch(err => console.error(err))
      .finally(() => setAprovandoMilitar(false));
  }

  function recusar() {
    setDeletandoMilitar(true);
    
    api.delete(`/militares/${militar._id}`)
      .then(() => {
        setAberto(false);
        recarregar();
      })
      .catch(err => console.error(err))
      .finally(() => setDeletandoMilitar(false));
  }

  return (
    <ModalIntitulado
      aberto={aberto}
      setAberto={setAberto}
      cor="var(--emerald)"
      titulo={`Aprovar ${nomeMilitar}`}>
      <div className="modal-aprovar-militar">
        <span>
          Após ser aprovado(a), <span className="nome-militar">{nomeMilitar}</span> terá acesso ao formulário das
          viaturas de combate ao incêndio.
        </span>

        <div className="termos">
          <Switch
            checked={sudo}
            onChange={event => setSudo(event.target.checked)} 
            className={'sudo-switch ' + (!sudo ? 'desativado' : '')} />
          
          <div className="texto">
            <span>
              Conceder ao <span className="nome-militar">{nomeMilitar}</span> permissão
              para aprovar solicitações de militares recém-cadastrados no aplicativo,
              dar privilégios de administrador para outros militares cadastrados e
              acessar o histórico mensal.
            </span>
          </div>
        </div>

        <div className="botoes">
          <div style={{ backgroundColor: 'var(--emerald)' }} onClick={aprovar} className="botao">
            {aprovandoMilitar ? <Spinner /> : <span>Aprovar</span>}
          </div>

          <div className="diastema"></div>

          <div style={{ backgroundColor: 'var(--chi-gong)' }} onClick={recusar} className="botao">
            {deletandoMilitar ? <Spinner /> : <span>Recusar</span>}
          </div>
        </div>
      </div>
    </ModalIntitulado>
  );
}

export default ModalAprovarMilitar;
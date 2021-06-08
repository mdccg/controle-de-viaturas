import { useState } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalGenerico from './../ModalGenerico';

import api from './../../services/api';

function ModalBotao({ children, funcao }) {

  return (
    <div className="modal-botao" onClick={funcao}>
      {children}
    </div>
  );
}

function ModalAtualizarMilitar({ militar = {}, recarregar, aberto, setAberto }) {
  const [atualizandoAutorizacao, setAtualizandoAutorizacao] = useState(false);
  const [deletandoMilitar, setDeletandoMilitar] = useState(false);

  const nomeMilitar = `${militar.patente} ${militar.nome}`;
  const sudo = militar.tipo === 'Administrador';

  function atualizarAutorizacao() {
    setAtualizandoAutorizacao(true);

    let tipo = sudo ? 'Usuário' : 'Administrador';

    api.put(`/militares/${militar._id}`, { tipo })
      .then(() => {
        setAberto(false);
        recarregar();
      })
      .catch(err => console.error(err))
      .finally(() => setAtualizandoAutorizacao(false));
  }

  function deletarMilitar() {
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
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-atualizar-militar">
      <ModalBotao funcao={atualizarAutorizacao}>
        {atualizandoAutorizacao ? <Spinner /> : <span>{sudo ? 'Remover privilégios' : 'Tornar administrador'}</span>}
      </ModalBotao>

      <ModalBotao funcao={deletarMilitar}>
        {deletandoMilitar ? <Spinner /> : <span>Deletar {nomeMilitar}</span>}
      </ModalBotao>
    </ModalGenerico>
  );
}

export default ModalAtualizarMilitar;
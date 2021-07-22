import { useState, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalGenerico from './../ModalGenerico';

import { toast } from 'react-toastify';

function ModalAdicionarTopico({ adicionarTopico, aberto, setAberto }) {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const tituloRef = useRef();
  const descricaoRef = useRef();
  
  function adicionar() {
    setEfetuandoRequisicao(true);

    if(!titulo) {
      setEfetuandoRequisicao(false);
      tituloRef.current.focus();
      toast.error('Título é obrigatório.');
      return;
    }

    if(!descricao) {
      setEfetuandoRequisicao(false);
      descricaoRef.current.focus();
      toast.error('Descrição é obrigatório.');
      return;
    }

    // TODO back-end aqui
    setTimeout(() => {
      let topico = { titulo, descricao };
      adicionarTopico(topico);
      
      setEfetuandoRequisicao(false);
      setAberto(false);

      setTitulo('');
      setDescricao('');
    }, 2e3);
  }

  return (
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-adicionar-topico">
      <span>Acrescente um tópico a ser revisado</span>
    
      <input
        ref={tituloRef}
        type="text"
        value={titulo}
        onChange={event => setTitulo(event.target.value)}
        className="input-form"
        placeholder="Título" />

      <textarea
        ref={descricaoRef}
        value={descricao}
        onChange={event => setDescricao(event.target.value)}
        className="input-form"
        placeholder="Descrição"></textarea>

      <button className="botao-form" onClick={adicionar}>
        {efetuandoRequisicao ? <Spinner /> : 'Adicionar tópico'}
      </button>
    </ModalGenerico>
  );
}

export default ModalAdicionarTopico;
import { useState, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalGenerico from './../ModalGenerico';

import api from './../../services/api';

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

    api.post('/topicos', { titulo, descricao })
      .then(res => {
        let { _id } = res.data;
        let topico = { _id, titulo, descricao };
        adicionarTopico(topico);
        
        setTitulo('');
        setDescricao('');
        setAberto(false);

        toast.success('Tópico cadastrado com sucesso.');
      })
      .catch(err => console.error(err.response.data))
      .finally(() => setEfetuandoRequisicao(false));
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
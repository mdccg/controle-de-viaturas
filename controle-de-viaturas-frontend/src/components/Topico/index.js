import { useState, useEffect, useRef } from 'react';
import './styles.css';

import Delete from './../../assets/icons/Delete';
import ClipboardCheckSolid from './../../assets/icons/ClipboardCheckSolid';

import { delay } from './../../config/default.json';

function Topico({
  _id,
  titulo: tituloInicial,
  descricao: descricaoInicial,
  setTopico,
  atualizarTopico,
  setDeletandoTopico
}) {
  const [titulo, setTitulo]       = useState(tituloInicial);
  const [descricao, setDescricao] = useState(descricaoInicial);

  async function remover() {
    let topico = { _id, titulo, descricao };
    await setTopico(topico);
    setDeletandoTopico(true);
  }

  const detectorAfkRef = useRef(false);

  useEffect(() => {
    if (detectorAfkRef.current) {

      var detectorAfk = setTimeout(() => {
        let topico = { _id, titulo, descricao };
        atualizarTopico(topico);

      }, delay * 1e3);
      
      return () => clearTimeout(detectorAfk);
      
    } else
      detectorAfkRef.current = true;

  }, [titulo, descricao]);

  return (
    <div className="topico" key={_id}>
      <div className="topico-cabecalho">
        <div className="icone">
          <ClipboardCheckSolid />
        </div>

        <input
          type="text"
          value={titulo}
          onChange={event => setTitulo(event.target.value)}
          placeholder="Título" />

        <div className="icone lixeira" onClick={remover}>
          <Delete />
        </div>
      </div>
      <div className="topico-corpo">
        <textarea
          value={descricao}
          onChange={event => setDescricao(event.target.value)}
          placeholder="Descrição"></textarea>
      </div>
    </div>
  );
}

export default Topico;
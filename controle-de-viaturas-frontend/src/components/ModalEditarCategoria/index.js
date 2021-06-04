import { useState, useEffect } from 'react';
import './styles.css';

import ModalGenerico from './../ModalGenerico';

function ModalBotao({ variavel = {}, setVariavel, variavelSelecionada = {}, setVariavelSelecionada }) {
  const selecionada = variavel._id === variavelSelecionada._id;

  function selecionar() {
    setVariavel(variavel);
    setVariavelSelecionada(variavel);
  }

  return (
    <div onClick={selecionar} className={'modal-botao ' + (selecionada ? 'selecionada' : '')}>
      <span>{variavel.nome}</span>
    </div>
  );
}

function ModalEditarCategoria({ viatura = {}, categorias = [], aberto, setAberto }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(viatura.categoria);

  useEffect(() => {
    setCategoriaSelecionada(viatura.categoria);
  }, [viatura]);

  return (
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-editar-categoria">
      <div className="modal-botoes">
        {categorias.map(categoria => (
          <ModalBotao
            key={categoria._id}
            variavel={categoria}
            setVariavel={viatura.setCategoria}
            variavelSelecionada={categoriaSelecionada}
            setVariavelSelecionada={setCategoriaSelecionada} />
        ))}
      </div>
    </ModalGenerico>
  );
}

export default ModalEditarCategoria;
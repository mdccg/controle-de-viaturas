import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';

import ModalGenerico from './../ModalGenerico';
import ModalBotao from './../ModalBotao';

import { niveisCombustivel } from './../../config/default.json';

function ModalEditarNivelCombustivel({ viatura = {}, aberto, setAberto }) {
  const [nivelCombustivelSelecionado, setNivelCombustivelSelecionado] = useState(viatura.nivelCombustivel);

  useEffect(() => {
    setNivelCombustivelSelecionado(viatura.nivelCombustivel);
  }, [viatura]);

  return (
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-editar-nivel-combustivel">
      <div className="modal-botoes">
        {niveisCombustivel.map(nivelCombustivel => (
          <ModalBotao
            nulo
            key={nivelCombustivel}
            variavel={nivelCombustivel}
            setVariavel={viatura.setNivelCombustivel}
            variavelSelecionada={nivelCombustivelSelecionado}
            setVariavelSelecionada={setNivelCombustivelSelecionado} />
        ))}
      </div>
    </ModalGenerico>
  );
}

export default ModalEditarNivelCombustivel;
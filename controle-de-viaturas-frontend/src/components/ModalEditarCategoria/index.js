import { useState } from 'react';
import './styles.css';

const categorias = ['Trem de S.O.S', 'No pátio'];

function Botao({
  categoria,
  setCategoria,
  categoriaSelecionada,
  setCategoriaSelecionada }) {
  const selecionada = categoriaSelecionada === categoria;

  function selecionar() {
    setCategoria(categoria);
    setCategoriaSelecionada(categoria);
  }

  return (
    <div className={'btn ' + (selecionada ? 'selecionada' : '')} onClick={selecionar}>
      <span>{categoria}</span>
    </div>
  );
}

function ModalEditarCategoria({ viatura = {} }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(viatura.categoria);

  return (
    <div className="modal-editar-categoria">
      <span className="titulo">
        Selecione o tipo da viatura <span style={{ fontFamily: 'OswaldRegular' }}>{viatura.prefixo}</span>
      </span>

      <div className="botoes">
        {categorias.map(categoria => (
          <Botao
            key={categoria}
            categoria={categoria}
            setCategoria={viatura.setCategoria}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada} />
        ))}
      </div>
    </div>
  );
}

export default ModalEditarCategoria;
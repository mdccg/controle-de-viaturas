import { useState } from 'react';
import './styles.css';

const niveisCombustivel = [
  'Cheio',
  'Abaixo de cheio',
  'Meio',
  'Abaixo de meio',
  'Reserva'
];

function Botao({
  nivelCombustivel,
  setNivelCombustivel,
  nivelCombustivelSelecionado,
  setNivelCombustivelSelecionado }) {
  const selecionado = nivelCombustivelSelecionado === nivelCombustivel;

  function selecionar() {
    setNivelCombustivel(nivelCombustivel);
    setNivelCombustivelSelecionado(nivelCombustivel);
  }

  return (
    <div className={'btn ' + (selecionado ? 'selecionado' : '')} onClick={selecionar}>
      <span>{nivelCombustivel}</span>
    </div>
  );
}

function ModalEditarNivelCombustivel({ viatura = {} }) {
  const [nivelCombustivelSelecionado, setNivelCombustivelSelecionado] = useState(viatura.nivelCombustivel);

  return (
    <div className="modal-editar-nivel-combustivel">
      <span className="titulo">
        Selecione o nível de combustível da viatura <span style={{ fontFamily: 'OswaldRegular' }}>{viatura.prefixo}</span>
      </span>

      <div className="botoes">
        {niveisCombustivel.map(nivelCombustivel => (
          <Botao
            key={nivelCombustivel}
            nivelCombustivel={nivelCombustivel}
            setNivelCombustivel={viatura.setNivelCombustivel}
            nivelCombustivelSelecionado={nivelCombustivelSelecionado}
            setNivelCombustivelSelecionado={setNivelCombustivelSelecionado} />
        ))}
      </div>
    </div>
  );
}

export default ModalEditarNivelCombustivel;
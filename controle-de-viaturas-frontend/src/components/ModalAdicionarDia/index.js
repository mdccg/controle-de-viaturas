import './styles.css';

import ModalGenerico from './../ModalGenerico';

function ModalBotao({ setDias, selecionado, children }) {
  const dia = children === 32 ? 'Último dia do mês' : `Dia ${children}`;

  function selecionar() {
    if(selecionado)
      setDias(state => {
        return state.filter(value => value !== children);
      });
    else
      setDias(state => {
        return [...state, children].sort((a, b) => a - b);
      });
  }

  return (
    <div
      onClick={selecionar}
      className={'modal-botao ' + (selecionado ? 'selecionado' : '')}>
      {dia}
    </div>
  );
}

function ModalAdicionarDia({ dias, setDias, aberto, setAberto }) {
  return (
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-adicionar-dia">
      <div className="modal-botoes">
        {Array
          .from(Array(32).keys())
          .map(value => value + 1)
          .map(value => (
            <ModalBotao
              key={value}
              setDias={setDias}
              selecionado={dias.includes(value)}>
              {value}
            </ModalBotao>
          ))}
      </div>
    </ModalGenerico>
  );
}

export default ModalAdicionarDia;
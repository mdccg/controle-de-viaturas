import './styles.css';

function ModalBotao({ variavel, setVariavel, variavelSelecionada, setVariavelSelecionada }) {
  const selecionada = variavel === variavelSelecionada;

  function selecionar() {
    setVariavel(variavel);
    setVariavelSelecionada(variavel);
  }

  return (
    <div onClick={selecionar} className={'modal-botao ' + (selecionada ? 'selecionada' : '')}>
      <span>{variavel}</span>
    </div>
  );
}

export default ModalBotao;
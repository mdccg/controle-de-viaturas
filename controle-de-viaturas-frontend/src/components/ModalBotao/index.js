import './styles.css';

function ModalBotao({ variavel, setVariavel, variavelSelecionada, setVariavelSelecionada, nulo }) {
  const selecionada = variavel === variavelSelecionada;

  function selecionar() {
    if(nulo) { 
      setVariavel(selecionada ? '' : variavel);
      setVariavelSelecionada(selecionada ? '' : variavel);

    } else {
      setVariavel(variavel);
      setVariavelSelecionada(variavel);
    }
  }

  return (
    <div onClick={selecionar} className={'modal-botao ' + (selecionada ? 'selecionado' : '')}>
      <span>{variavel}</span>
    </div>
  );
}

export default ModalBotao;
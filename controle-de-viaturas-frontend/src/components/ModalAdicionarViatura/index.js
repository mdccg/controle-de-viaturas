import { useState, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import ModalGenerico from './../ModalGenerico';

import { niveisCombustivel } from './../../config/default.json';

import api from './../../services/api';

import { toast } from 'react-toastify';

function ModalAdicionarViatura({ recarregar, categorias = [], aberto, setAberto }) {
  const [prefixo, setPrefixo] = useState('');
  const [km, setKm] = useState('');
  const [nivelCombustivel, setNivelCombustivel] = useState('');
  const [comentario, setComentario] = useState('');
  const [categoria, setCategoria] = useState('');

  const prefixoRef = useRef();
  const kmRef = useRef();
  const nivelCombustivelRef = useRef();
  const categoriaRef = useRef();

  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function adicionarViatura(event) {
    event.preventDefault();
    setEfetuandoRequisicao(true);

    let obrigatorios = [
      { valor: prefixo, ref: prefixoRef, msg: 'Prefixo' },
      { valor: km, ref: kmRef, msg: 'Prefixo' },
      { valor: nivelCombustivel, ref: nivelCombustivelRef, msg: 'Prefixo' },
      { valor: categoria, ref: categoriaRef, msg: 'Prefixo' },
    ];

    for(let { valor, ref, msg } of obrigatorios) {
      if(!valor) {
        setEfetuandoRequisicao(false);
        ref.current.focus();
        toast.error(msg + ' é obrigatório.');
        return;
      }
    }

    let viatura = { prefixo, km: Number(km), nivelCombustivel, comentario, categoria: JSON.parse(categoria)._id };
    console.table(viatura);

    api.post('/viaturas', viatura)
      .then(() => {
        toast.success(`Viatura ${prefixo} adicionada com sucesso.`);

        setAberto(false);
        recarregar();
      })
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }

  return (
    <ModalGenerico aberto={aberto} setAberto={setAberto} className="modal-adicionar-viatura">
      <form onSubmit={adicionarViatura}>
        <span>Adicione uma nova viatura</span>

        <input
          type="text"
          name="prefixo"
          value={prefixo}
          onChange={event => setPrefixo(event.target.value)}
          placeholder="Prefixo"
          ref={prefixoRef}
          autoComplete="off" />

        <input
          type="number"
          name="km"
          value={km}
          onChange={event => setKm(event.target.value)}
          placeholder="KM"
          inputMode="numeric"
          ref={kmRef}
          autoComplete="off" />
          
        <select
          name="nivelCombustivel"
          value={nivelCombustivel}
          onChange={event => setNivelCombustivel(event.target.value)}
          ref={nivelCombustivelRef}>

          <option value="">Nível de combustível</option>
          {niveisCombustivel.map(nivelCombustivel => (
            <option key={nivelCombustivel} value={nivelCombustivel}>{nivelCombustivel}</option>
          ))}
        </select>

        <textarea
          name="comentario"
          value={comentario}
          onChange={event => setComentario(event.target.value)}
          placeholder="Observação"
          autoComplete="off"></textarea>
        
        <select
          name="categoria"
          value={categoria}
          onChange={event => setCategoria(event.target.value)}
          ref={categoriaRef}>

          <option value="">Categoria</option>
          {categorias.map(categoria => (
            <option key={categoria._id} value={JSON.stringify(categoria)}>{categoria.nome}</option>
          ))}
        </select>

        <button>
          {efetuandoRequisicao ? <Spinner /> : <span>Adicionar viatura</span>}
        </button>
      </form>
    </ModalGenerico>
  );
}

export default ModalAdicionarViatura;
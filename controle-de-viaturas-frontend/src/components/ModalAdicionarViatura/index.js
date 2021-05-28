import { useState, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import api from './../../services/api';

function ModalAdicionarViatura({ registrando, setRegistrando, atualizarCheckpoint, setAdicionandoViatura, encarrilharViatura }) {
  const [prefixo, setPrefixo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [km, setKm] = useState('');
  const [nivelCombustivel, setNivelCombustivel] = useState('');
  const [comentario, setComentario] = useState('');

  const prefixoRef = useRef();
  const categoriaRef = useRef();
  const kmRef = useRef();
  const nivelCombustivelRef = useRef();
  const comentarioRef = useRef();

  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function adicionarViatura() {
    setEfetuandoRequisicao(true);

    let campos = [
      { campo: prefixo, ref: prefixoRef },
      { campo: categoria, ref: categoriaRef },
      { campo: km, ref: kmRef },
      { campo: nivelCombustivel, ref: nivelCombustivelRef }
    ];

    for(let { campo, ref } of campos) {
      if(!campo) {
        let input = ref.current;
        
        input.focus();
        input.classList.add('obrigatorio');
  
        setTimeout(() => {
          input.classList.remove('obrigatorio');
        }, 3e3);
        
        setEfetuandoRequisicao(false);
        return;
      }
    }

    const viatura = { prefixo, categoria, km: Number(km), nivelCombustivel, comentario };
    
    api.post('/viaturas', viatura)
      .then(async res => {
        const { _id } = res.data;
        viatura._id = _id;
        
        await encarrilharViatura(viatura);
        
        setRegistrando(!registrando);
        atualizarCheckpoint();
        setEfetuandoRequisicao(false);
        setAdicionandoViatura(false);
      })
      .catch(err => console.error(err));
  }
  
  return (
    <div className="modal-adicionar-viatura">
      <span className="titulo">Adicione uma nova viatura</span>

      <input
        autoFocus
        type="text"
        placeholder="Prefixo"
        value={prefixo}
        onChange={event => setPrefixo(event.target.value)}
        ref={prefixoRef} />

      <select
        ref={categoriaRef}
        onChange={event => setCategoria(event.target.value)}>
        <option value="">Tipo de viatura</option>
        <option value="Trem de S.O.S">Trem de S.O.S</option>
        <option value="No pátio">No pátio</option>
      </select>

      <input
        type="number"
        placeholder="KM"
        value={km}
        onChange={event => setKm(event.target.value)}
        inputMode="numeric"
        ref={kmRef} />
        
      <select
        ref={nivelCombustivelRef}
        onChange={event => setNivelCombustivel(event.target.value)}>
        <option value="">Nível de combustível</option>
        <option value="Cheio">Cheio</option>
        <option value="¾">¾</option>
        <option value="½">½</option>
        <option value="¼">¼</option>
        <option value="Reserva">Reserva</option>
      </select>

      <textarea
        placeholder="Observação"
        value={comentario}
        onChange={event => setComentario(event.target.value)}
        ref={comentarioRef}>
      </textarea>

      <div
        className="btn-adicionar-viatura"
        onClick={efetuandoRequisicao ? undefined : adicionarViatura}>
        {efetuandoRequisicao ? <Spinner /> : <span>Adicionar viatura</span>}
      </div>
    </div>
  );
}

export default ModalAdicionarViatura;
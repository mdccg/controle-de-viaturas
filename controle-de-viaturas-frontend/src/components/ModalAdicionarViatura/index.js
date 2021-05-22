import { useState, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import api from './../../services/api';

function ModalAdicionarViatura({ atualizarCheckpoint, setAdicionandoViatura, encarrilharViatura }) {
  const [prefixo, setPrefixo] = useState('');
  const [km, setKm] = useState('');
  const [nivelCombustivel, setNivelCombustivel] = useState('');
  const [comentario, setComentario] = useState('');

  const prefixoRef = useRef();
  const kmRef = useRef();
  const nivelCombustivelRef = useRef();
  const comentarioRef = useRef();

  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function adicionarViatura() {
    setEfetuandoRequisicao(true);

    let campos = [
      { campo: prefixo, ref: prefixoRef },
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

    const viatura = { prefixo, km: Number(km), nivelCombustivel, comentario };
    
    api.post('/viaturas', viatura)
      .then(() => {
        atualizarCheckpoint();
        encarrilharViatura(viatura);
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
        <option value="Abaixo de cheio">Abaixo de cheio</option>
        <option value="Meio">Meio</option>
        <option value="Abaixo de meio">Abaixo de meio</option>
        <option value="Reserva">Reserva</option>
      </select>

      <textarea
        placeholder="Comentário"
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
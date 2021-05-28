import { useState, useRef } from 'react';
import './styles.css';

import FireTruck from './../../assets/icons/FireTruck';
import Edit from './../../assets/icons/Edit';
import Check from './../../assets/icons/Check';
import Spinner from './../../assets/icons/Spinner';
import Delete from './../../assets/icons/Delete';
import Speedometer from './../../assets/icons/Speedometer';
import GasStation from './../../assets/icons/GasStation';
import Chat from './../../assets/icons/Chat';
import Communications from './../../assets/icons/Communications';
import PrivateGarage from './../../assets/icons/PrivateGarage';

import api from './../../services/api';

function Viatura(props) {
  const _id = props._id;
  const [prefixo, setPrefixo] = useState(props.prefixo);
  const [categoria, setCategoria] = useState(props.categoria);
  const [km, setKm] = useState(props.km);
  const [nivelCombustivel, setNivelCombustivel] = useState(props.nivelCombustivel);
  const [comentario, setComentario] = useState(props.comentario);

  const [desatualizada, setDesatualizada] = useState(JSON.stringify({ _id, prefixo, categoria, km, nivelCombustivel, comentario }));

  const kmRef = useRef();

  const [editandoViatura, setEditandoViatura] = useState(false);
  const [atualizandoViatura, setAtualizandoViatura] = useState(false);

  async function editarViatura() {
    const { atualizarStateViaturas, registrando, setRegistrando, atualizarCheckpoint } = props;
    
    var viatura = { _id, prefixo, categoria, km: Number(km), nivelCombustivel, comentario };
    
    if(editandoViatura && JSON.stringify(viatura) !== desatualizada) {
      setAtualizandoViatura(true);
      
      api.put(`/viaturas/${_id}`, viatura)
        .then(async () => {
          await atualizarStateViaturas(viatura);

          setRegistrando(!registrando);
          atualizarCheckpoint();
          setAtualizandoViatura(false);
          setEditandoViatura(!editandoViatura);

          setDesatualizada(JSON.stringify(viatura));
        })
        .catch(err => console.error(err));

      return;
    }

    await setEditandoViatura(!editandoViatura);

    if(!editandoViatura)
      kmRef.current.focus();
  }

  async function deletarViatura() {
    let viatura = { _id, prefixo };
    
    await props.setViatura(viatura);

    props.setDeletandoViatura(true);
  }

  async function editarCategoria() {
    if(!editandoViatura)
      return;

    let viatura = { _id, prefixo, categoria, km, nivelCombustivel, comentario, setCategoria };

    await props.setViatura(viatura);

    props.setEditandoCategoria(true);
  }

  async function editarNivelCombustivel() {
    if(!editandoViatura)
      return;

    let viatura = { _id, prefixo, categoria, km, nivelCombustivel, comentario, setNivelCombustivel };

    await props.setViatura(viatura);

    props.setEditandoNivelCombustivel(true);
  }

  async function editarComentario() {
    if(!editandoViatura)
      return;

    let viatura = { _id, prefixo, categoria, km, nivelCombustivel, comentario, setComentario };

    await props.setViatura(viatura);

    props.setEditandoComentario(true);
  }

  return (
    <div className="viatura">
      <div className="cabecalho-viatura">
        <div className="prefixo">
          <div>
            <FireTruck />
          </div>
          <input
            type="text"
            value={prefixo}
            onChange={event => setPrefixo(event.target.value)}
            disabled={!editandoViatura} />
        </div>

        <div className="botoes">
          <div className="botao" onClick={atualizandoViatura ? undefined : editarViatura}>
            {editandoViatura ? (atualizandoViatura ? <Spinner /> : <Check />) : <Edit />}
          </div>
          <div className="botao" onClick={deletarViatura}>
            <Delete />
          </div>
        </div>
      </div>

      <div className="info-viatura">
        <div className="linha">
          <div className="km">
            <div className="icone">
              <Speedometer />
            </div>
            <span style={{ color: 'var(--american-river)', marginRight: '4px' }}>KM</span>
            <div className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')}>
              <input
                type="number"
                value={km}
                onChange={event => setKm(event.target.value)}
                disabled={!editandoViatura}
                ref={kmRef}
                inputMode="numeric" />
            </div>
          </div>

          <div className="nivel-combustivel" onClick={editarNivelCombustivel}
            style={{ cursor: editandoViatura ? 'pointer' : 'inherit' }}>
            <div className="icone">
              <GasStation />
            </div>
            <div className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')}>
              <span>{nivelCombustivel}</span>
            </div>
          </div>
        </div>
        
        <div style={{ height: '8px' }}></div>

        <div className="linha">
          <div className="comentario" onClick={editarComentario}
            style={{ cursor: editandoViatura ? 'pointer' : 'inherit' }}>
            <div className="icone">
              <Chat />
            </div>
            <div
              style={{ maxWidth: 'none' }}
              className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')}>
              {!comentario ? (
                <span
                  className="vazio"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'large',
                  }}>&Oslash;</span>
              ) : (
                <span>{comentario}</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ height: '8px' }}></div>

        <div className="linha">
          <div onClick={editarCategoria} style={{ cursor: editandoViatura ? 'pointer' : 'inherit' }}>
            {categoria === 'Trem de S.O.S' ? <Communications /> : <PrivateGarage />}
            
            <div className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')} style={{ maxWidth: 'none' }}>
              <span>{categoria}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viatura;
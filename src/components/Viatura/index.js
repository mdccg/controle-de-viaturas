import { useState, useRef } from 'react';
import './styles.css';

import FireTruck from './../../assets/icons/FireTruck';
import Edit from './../../assets/icons/Edit';
import Check from './../../assets/icons/Check';
import Delete from './../../assets/icons/Delete';
import Speedometer from './../../assets/icons/Speedometer';
import GasStation from './../../assets/icons/GasStation';
import Chat from './../../assets/icons/Chat';

function Viatura(props) {
  const [prefixo, setPrefixo] = useState(props.prefixo);
  const [km, setKm] = useState(props.km);
  const [nivelCombustivel, setNivelCombustivel] = useState(props.nivelCombustivel);
  const [comentario, setComentario] = useState(props.comentario);

  const kmRef = useRef();

  const comentado = comentario.split('').length > 0;

  const [editandoViatura, setEditandoViatura] = useState(false);

  async function editarViatura() {
    await setEditandoViatura(!editandoViatura);

    if(!editandoViatura)
      kmRef.current.focus();
    
    if(editandoViatura) {
      // TODO requisição para salvar viatura
      let viatura = { prefixo, km: Number(km), nivelCombustivel, comentario };
      console.table(viatura);
    }
  }

  function deletarViatura() {

  }

  async function editarNivelCombustivel() {
    if(!editandoViatura)
      return;

    let viatura = {
      prefixo,
      km,
      nivelCombustivel,
      comentario,
      setNivelCombustivel
    };

    await props.setViatura(viatura);

    props.setEditandoNivelCombustivel(true);
  }

  async function editarComentario() {
    if(!editandoViatura)
      return;

    let viatura = {
      prefixo,
      km,
      nivelCombustivel,
      comentario,
      setComentario
    };

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
          <div className="botao" onClick={editarViatura}>
            {editandoViatura ? <Check /> : <Edit />}
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
                type="text"
                value={km}
                onChange={event => setKm(event.target.value)}
                disabled={!editandoViatura}
                ref={kmRef}
                inputMode="numeric" />
            </div>
          </div>

          <div
            className="nivel-combustivel"
            onClick={editarNivelCombustivel}
            style={{ cursor: editandoViatura ? 'pointer' : 'text' }}>
            <div className="icone">
              <GasStation />
            </div>
            <div className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')}>
              <span>{nivelCombustivel}</span>
            </div>
          </div>

          {comentado ? <></> : (
            <div
              className="comentario"
              onClick={editarComentario}
              style={{ cursor: editandoViatura ? 'pointer' : 'text' }}>
              <div className="icone">
                <Chat />
              </div>
              <div className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')}>
                {!comentario ? (
                  <span className="vazio">Vazio</span>
                ) : (
                  <span>{comentario}</span>
                )}
              </div>
            </div>
          )}
        </div>
        {comentado ? <div style={{ height: '8px' }}></div> : <></>}
        {comentado ? (
          <div className="linha">
            <div
              className="comentario"
              onClick={editarComentario}
              style={{ cursor: editandoViatura ? 'pointer' : 'text' }}>
              <div className="icone">
                <Chat />
              </div>
              <div
                style={{ maxWidth: 'none' }}
                className={'info-viatura-input ' + (editandoViatura ? 'editando-viatura' : '')}>
                {!comentario ? (
                  <span className="vazio">Vazio</span>
                ) : (
                  <span>{comentario}</span>
                )}
              </div>
            </div>
        </div>
        ) : <></>}
      </div>
    </div>
  );
}

export default Viatura;
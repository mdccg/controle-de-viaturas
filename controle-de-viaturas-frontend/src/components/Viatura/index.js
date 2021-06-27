import { useState, useEffect, useRef } from 'react';
import './styles.css';

import Tag from './../../assets/icons/Tag';
import Chat from './../../assets/icons/Chat';
import Delete from './../../assets/icons/Delete';
import Spinner from './../../assets/icons/Spinner';
import FireTruck from './../../assets/icons/FireTruck';
import GasStation from './../../assets/icons/GasStation';
import Speedometer from './../../assets/icons/Speedometer';

import api from './../../services/api';

import { delay } from './../../config/default.json';

function Viatura(props) {
  const _id = props._id;
  const [prefixo, setPrefixo] = useState(props.prefixo);
  const [km, setKm] = useState(props.km);
  const [nivelCombustivel, setNivelCombustivel] = useState(props.nivelCombustivel);
  const [comentario, setComentario] = useState(props.comentario);
  const [categoria, setCategoria] = useState(props.categoria);

  const prefixoRef = useRef();
  const kmRef = useRef();
  const comentarioRef = useRef();

  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  function atualizarViatura() {
    const { viaturas, setViaturas } = props;
    
    let _viaturas = [...viaturas];
    let indice = _viaturas.map(({ _id }) => _id).indexOf(_id);
    
    _viaturas[indice] = { _id, prefixo, km, nivelCombustivel, comentario, categoria };
    
    setViaturas(_viaturas);
  }

  async function registrarViatura() {
    const { enviarRegistro, atualizarViaturas } = props;

    setEfetuandoRequisicao(true);
    
    var _km = `${km}`.replace(/\./g, '').replace(/,/g, '.');

    let viatura = { prefixo, km: Number(_km), nivelCombustivel, comentario, categoria: categoria._id };
    
    api.put(`/viaturas/${_id}`, viatura)
      .then(() => {
        let viatura = { _id, prefixo, km: Number(_km), nivelCombustivel, comentario, categoria };
        enviarRegistro(atualizarViaturas(viatura, 'U'));
      })
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }

  async function editarNivelCombustivel() {
    const { setViatura, setEditandoNivelCombustivel } = props;

    let viatura = { nivelCombustivel, setNivelCombustivel };

    await setViatura(viatura);
    setEditandoNivelCombustivel(true);
  }

  async function editarCategoria() {
    const { setViatura, setEditandoCategoria } = props;

    let viatura = { categoria, setCategoria };

    await setViatura(viatura);
    setEditandoCategoria(true);
  }

  async function deletarViatura() {
    const { setViatura, setDeletandoViatura } = props;

    let viatura = { _id, prefixo };

    await setViatura(viatura);
    setDeletandoViatura(true);
  }

  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      atualizarViatura();

      var detectorAfk = setTimeout(() => {
        registrarViatura();
      }, delay * 1e3);
      
      return () => clearTimeout(detectorAfk);
      
    } else {
      didMountRef.current = true;
    }

  }, [prefixo, km, nivelCombustivel, comentario, categoria]);

  return (
    <div className="viatura">
      <div className="cabecalho">
        <div>
          <div className="icone">
            <FireTruck />
          </div>

          <div className="prefixo">
            <input
              disabled={efetuandoRequisicao}
              type="text"
              value={prefixo}
              onChange={event => setPrefixo(event.target.value)}
              placeholder="Prefixo"
              ref={prefixoRef} />
          </div>
        </div>

        <div className="painel">
          <div className="icone clicavel">
            {efetuandoRequisicao ? <Spinner /> :  null}
          </div>

          <div className="icone clicavel" onClick={!efetuandoRequisicao ? deletarViatura : undefined}>
            <Delete />
          </div>
        </div>
      </div>

      <div className="corpo">
        <div key={_id + '-primeira-linha'}>
          <div>
            <div className="icone">
              <Speedometer />
            </div>
            
            <div className="km">
              <span>KM</span>
              <span>&nbsp;</span>
              
              <input
                disabled={efetuandoRequisicao}
                value={km}
                onChange={event => setKm(event.target.value)}
                placeholder="KM"
                inputMode="numeric"
                ref={kmRef} />
            </div>
          </div>

          <div
            className="clicavel"
            onClick={!efetuandoRequisicao ? editarNivelCombustivel : undefined}>
            <div className="icone">
              <GasStation />
            </div>
            
            <div className="nivel-combustivel">
              <span>{nivelCombustivel}</span>
            </div>
          </div>
        </div>

        <div key={_id + '-segunda-linha'}>
          <div className="icone">
            <Chat />
          </div>

          <div className="comentario">
            <textarea
              disabled={efetuandoRequisicao}
              value={comentario}
              onChange={event => setComentario(event.target.value)}
              placeholder="Observação"
              ref={comentarioRef}></textarea>
          </div>
        </div>

        <div
          key={_id + '-terceira-linha'}
          className="clicavel"
          onClick={!efetuandoRequisicao ? editarCategoria : undefined}>
          <div className="icone">
            <Tag />
          </div>

          <div className="categoria-label">
            <span>{categoria.nome}</span>
          </div>
        </div>
      </div>

      <div className="rodape"></div>
    </div>
  );
}

export default Viatura;
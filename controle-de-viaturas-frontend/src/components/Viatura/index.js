import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  const [revisao, setRevisao] = useState({});
  const [pendentes, setPendentes] = useState([]);
  const [revisando, setRevisando] = useState(false);

  function atualizarViatura() {
    const { viaturas, setViaturas } = props;
    
    let viaturas_ = [...viaturas];
    let indice = viaturas_.map(({ _id }) => _id).indexOf(_id);
    let viatura = { _id, prefixo, km, nivelCombustivel, comentario, categoria };

    viaturas_[indice] = viatura;
    
    setViaturas(viaturas_);
  }

  async function registrarViatura() {
    const { enviarRegistro } = props;

    setEfetuandoRequisicao(true);
    
    var _km = `${km}`.replace(/\./g, '').replace(/,/g, '.');

    let viatura = { prefixo, km: Number(_km), nivelCombustivel, comentario, categoria: categoria._id };
    
    api.put(`/viaturas/${_id}`, viatura)
      .then(() => {
        enviarRegistro();
        atualizarViatura();
      })
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }

  function buscarRevisao() {
    let { revisao } = props;

    if(JSON.stringify(revisao) === '{}')
      return;
    else
      setRevisando(true);

    let { checklist } = revisao;
    let pendentes = checklist.filter(({ revisado }) => !revisado);

    setRevisao(revisao);
    setPendentes(pendentes);
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

  useEffect(() => {
    buscarRevisao();
  }, []);

  const detectorAfkRef = useRef(false);

  useEffect(() => {
    if (detectorAfkRef.current) {

      var detectorAfk = setTimeout(() => {
        registrarViatura();

      }, delay * 1e3);
      
      return () => clearTimeout(detectorAfk);
      
    } else
      detectorAfkRef.current = true;

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
              <span className="noselect">KM</span>
              <span className="noselect">&nbsp;</span>
              
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
              <span>{nivelCombustivel ? nivelCombustivel : 'Nível de combustível'}</span>
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

      {revisando ? (
        <Link className="btn-revisar" to={`/checklist?_id=${revisao._id}`}>
          <span className="btn-revisar-label">Revisar</span>

          <span className="contador">
            {pendentes.length === 1 ? '(1 item restante)' : `(${pendentes.length} itens restantes)`}
          </span>
        </Link>
      ) : null}

      <div className="rodape"></div>
    </div>
  );
}

export default Viatura;
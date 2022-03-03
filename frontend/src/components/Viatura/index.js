import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import Tag    from './../../assets/icons/Tag';
import Chat    from './../../assets/icons/Chat';
import Delete   from './../../assets/icons/Delete';
import Spinner   from './../../assets/icons/Spinner';
import FireTruck  from './../../assets/icons/FireTruck';
import GasStation  from './../../assets/icons/GasStation';
import Speedometer   from './../../assets/icons/Speedometer';
import ArrowsAltVSolid from './../../assets/icons/ArrowsAltVSolid';

import MenuMoverViatura from './../../components/MenuMoverViatura';

import { delay, updateMoverViaturas } from './../../config/default.json';

import useUpdateEffect from './../../functions/useUpdateEffect';

import api from './../../services/api';

function Viatura(props) {
  const _id = props._id;
  const [prefixo, setPrefixo] = useState(props.prefixo);
  const [km, setKm] = useState(props.km);
  const [nivelCombustivel, setNivelCombustivel] = useState(props.nivelCombustivel);
  const [comentario, setComentario] = useState(props.comentario);
  const [categoria, setCategoria] = useState(props.categoria);
  const [indiceCategoria, setIndiceCategoria] = useState(props.indiceCategoria);
  
  const prefixoRef = useRef();
  const kmRef = useRef();

  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  const [revisao, setRevisao] = useState({});
  const [pendentes, setPendentes] = useState([]);
  const [revisando, setRevisando] = useState(false);
  const [movendoViatura, setMovendoViatura] = useState(null);
  const [atualizandoIndiceCategoria, setAtualizandoIndiceCategoria] = useState(false);

  const quantidadeViaturasFitradas = props.quantidadeViaturasFitradas;

  function atualizarViatura() {
    const { viaturas, setViaturas } = props;
    
    let viaturas_ = [...viaturas];
    let indice = viaturas_.map(({ _id }) => _id).indexOf(_id);
    let viatura = { _id, prefixo, km, nivelCombustivel, comentario, categoria };

    viaturas_[indice] = viatura;
    
    setViaturas(viaturas_);
  }

  async function registrarViatura() {
    const { enviarRegistro, atualizarIndiceCategoria } = props;

    setEfetuandoRequisicao(true);
    
    var _km = `${km}`.replace(/\./g, '').replace(/,/g, '.');

    let viatura = { prefixo, km: Number(_km), nivelCombustivel, comentario, categoria: categoria._id };
    
    api.put(`/viaturas/${_id}`, viatura)
      .then(() => {
        enviarRegistro();
        atualizarViatura();
        atualizarIndiceCategoria(_id, setIndiceCategoria);
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

  function editarComentario(textContent) {
    setComentario(textContent);
  }

  async function editarCategoria() {
    const { setViatura, setEditandoCategoria } = props;

    let viatura = { categoria, setCategoria };

    await setViatura(viatura);
    setEditandoCategoria(true);
  }

  async function deletarViatura() {
    const { setViatura, setDeletandoViatura } = props;

    let viatura = { _id, prefixo, categoria, indiceCategoria };

    await setViatura(viatura);
    setDeletandoViatura(true);
  }

  function moverViatura(event) {
    setMovendoViatura(event.currentTarget);
  }

  async function atualizaIndiceCategoria() {
    await setAtualizandoIndiceCategoria(true);
    setIndiceCategoria(props.indiceCategoria);
  }

  useEffect(() => {
    buscarRevisao();
  }, [props.revisao]);

  const detectorAfkRef = useRef(false);

  useEffect(() => {
    if(!atualizandoIndiceCategoria) {
      if (detectorAfkRef.current) {
        var detectorAfk = setTimeout(() => {
          registrarViatura();
  
        }, delay * 1e3);
        return () => clearTimeout(detectorAfk);
        
      } else {
        detectorAfkRef.current = true;
      }
    } else {
      setAtualizandoIndiceCategoria(false);
    }

  }, [prefixo, km, nivelCombustivel, comentario, categoria, indiceCategoria]);

  useUpdateEffect(() => {
    if(props.indiceCategoria) atualizaIndiceCategoria();
  }, [props.indiceCategoria]);

  return (
    <>
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
            <div className="icone">
              {efetuandoRequisicao ? <Spinner /> :  null}
            </div>

            {updateMoverViaturas ? (
              <div className="icone clicavel" onClick={moverViatura}>
                <ArrowsAltVSolid />
              </div>
            ) : null}

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

          <div className="linha-comentario" key={_id + '-segunda-linha'}>
            <div className="icone">
              <Chat style={{ opacity: comentario ? 1 : .25 }} />
            </div>

            <div className="comentario">
              <div
                className="textarea-comentario"
                onInput={event => editarComentario(event.currentTarget.textContent)}
                contentEditable={!efetuandoRequisicao}
                suppressContentEditableWarning={true}>{props.comentario}</div>
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
          <Link className="btn-revisar" to={`/checklist?_id=${_id}`}>
            <span className="btn-revisar-label">
              {pendentes.length ? `Revisar (${pendentes.length})` : 'Concluir revisão'}
            </span>
          </Link>
        ) : null}

        <div className="rodape"></div>
      </div>

      <MenuMoverViatura
        categoria={categoria}
        indiceCategoria={indiceCategoria}
        puxarViaturasAposAtualizarIndiceCategoria={props.puxarViaturasAposAtualizarIndiceCategoria}
        maximo={quantidadeViaturasFitradas}
        aberto={movendoViatura}
        setAberto={setMovendoViatura} />
    </>
  );
}

export default Viatura;
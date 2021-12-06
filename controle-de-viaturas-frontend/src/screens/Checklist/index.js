import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import Voltar from './../../components/Voltar';
import Footer from './../../components/Footer';

import { delay } from './../../config/default.json';

import useUpdateEffect from './../../functions/useUpdateEffect';

import api from './../../services/api';

import Checkbox from '@material-ui/core/Checkbox';

import { toast } from 'react-toastify';

function Check({
  topico: { _id, titulo, descricao },
  revisado: revisadoInicial,
  comentario: comentarioInicial,
  index,
  setAviso,
  setSalvandoAviso,
  atualizarCheckitem
}) {
  const [revisado, setRevisado] = useState(revisadoInicial);
  const [comentario, setComentario] = useState(comentarioInicial);

  function atualizar() {
    setAviso('* Salvando alterações...');
    setSalvandoAviso(true);

    let checkitem = {
      topico: { _id, titulo, descricao },
      revisado,
      comentario
    };

    atualizarCheckitem(checkitem, index);
  }

  useUpdateEffect(() => {
    atualizar();
  }, [revisado]);

  const detectorAfkRef = useRef(false);

  useEffect(() => {
    if(detectorAfkRef.current) {
      setAviso('* Salvando alterações...');
      setSalvandoAviso(true);

      var detectorAfk = setTimeout(() => {
        atualizar();
      }, delay * 1e3);
      
      return () => clearTimeout(detectorAfk);

    } else
      detectorAfkRef.current = true;

  }, [comentario]);

  return (
    <div className="checkitem" key={_id}>
      <div className="cabecalho">
        <div className="checkbox">
          <Checkbox
            checked={revisado}
            onChange={event => setRevisado(event.target.checked)} />
        </div>

        <span>{titulo}</span>
      </div>

      <div className="corpo">
        <span>{descricao}</span>
      </div>

      <div className="rodape">
        <input
          type="text"
          value={comentario}
          onChange={event => setComentario(event.target.value)}
          placeholder="Adicionar comentário" />
      </div>
    </div>
  );
}

function Checklist(props) {
  const [aviso, setAviso] = useState('');
  const [revisao, setRevisao] = useState({});
  const [viatura, setViatura] = useState({});
  const [checklist, setChecklist] = useState([]);
  const [concluida, setConcluida] = useState(false);

  const [salvandoAviso, setSalvandoAviso] = useState(false);
  const [redirecionando, setRedirecionando] = useState(false);
  const [buscandoRevisao, setBuscandoRevisao] = useState(false);
  const [concluindoRevisao, setConcluindoRevisao] = useState(false);
  
  function getConcluida(checklist = []) {
    return checklist.filter(({ revisado }) => revisado).length === checklist.length;
  }

  function concluir() {
    setConcluindoRevisao(true);

    api.delete(`/revisoes/${viatura._id}`)
      .then(() => {
        toast.success(`Revisão concluída com sucesso.`);
        setRedirecionando(true);
      })
      .catch(() => toast.error('Erro ao concluir revisão.'))
      .finally(() => setConcluindoRevisao(false));
  }

  function atualizarCheckitem(checkitem, index) {
    let _checklist = [...revisao.checklist];
    _checklist[index] = checkitem;

    let concluida = getConcluida(_checklist);
    
    let _revisao = { ...revisao };
    _revisao.checklist = _checklist;

    api.put(`/revisoes/${viatura._id}`, { checklist: _checklist })
      .then(() => {
        setChecklist(_checklist);
        setConcluida(concluida);
        setRevisao(_revisao);
        
        api.put(`/manutencoes/${revisao._id}`, { checklist: _checklist })
          .then(() => {
            setAviso('Alterações salvas.');
            setSalvandoAviso(false);
          })
          .catch(err => console.error(err));
      })
      .catch(() => toast.error('Erro ao atualizar checklist.'));
  }

  async function buscarRevisao() {
    setBuscandoRevisao(true);

    const { search } = props.location;
    const idViatura = search.split('=').pop();
    
    api.get(`/revisoes/${idViatura}`)
      .then(res => {
        let revisao = res.data;
        let { viatura, checklist } = revisao;
        let concluida = getConcluida(checklist);

        setRevisao(revisao);
        setViatura(viatura);
        setChecklist(checklist);
        setConcluida(concluida);
      })
      .catch(err => console.error(err))
      .finally(() => setBuscandoRevisao(false));
  }

  useEffect(() => {
    buscarRevisao();
  }, []);

  useEffect(() => {
    document.title = `${viatura.prefixo} ― 1º SGBM/IND`;
  }, [viatura]);

  return redirecionando ? <Redirect to="/" /> : (
    <div className="checklist">
      <Voltar />

      <div className="container">
        {buscandoRevisao ? <Spinner className="loader" /> : (
          <>
            <div className={(salvandoAviso ? 'salvando' : '') + ' aviso'}>
              <span>{aviso}</span>
            </div>

            <span className="titulo">
              Tópicos da viatura <span className="prefixo">{viatura.prefixo}</span>
            </span>

            <span className="subtitulo">Todos os tópicos precisam ser marcados para que a revisão esteja completa.</span>

            <div className="lista">
              {checklist.map((check, index) => (
                <Check
                  key={check.topico.titulo}
                  {...check}
                  index={index}
                  setAviso={setAviso}
                  setSalvandoAviso={setSalvandoAviso}
                  atualizarCheckitem={atualizarCheckitem} />
              ))}
            </div>
          </>
        )}

        {concluida ? (
          <div className="confirmar-conclusao">
            <span>
              <strong>Atenção:</strong> Agora que todos os tópicos foram marcados,
              você deve <strong>concluir</strong> a revisão da viatura {viatura.prefixo}. 
              Após apertar o botão abaixo, essa lista não poderá mais ser modificada e 
              ela será enviada aos gestores. Portanto, confira se todos os itens da
              lista foram devidamente revisados.
            </span>

            <div className="btn-concluir" onClick={concluir}>
              {concluindoRevisao ? <Spinner /> : <span>Concluir revisão</span>}
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}

export default Checklist;
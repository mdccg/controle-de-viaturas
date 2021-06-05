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
import Tag from './../../assets/icons/Tag';

import api from './../../services/api';

import { toast } from 'react-toastify';

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

  const [editandoViatura, setEditandoViatura] = useState(false);
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  const [viaturaDesatualizada, setViaturaDesatualizada] = useState(JSON.stringify({ prefixo, km, nivelCombustivel, comentario, categoria }));

  async function editarViatura() {
    const { atualizarViatura, registrar, recarregar } = props;

    await setEditandoViatura(!editandoViatura);

    if(editandoViatura) {
      var viaturaAtualizada = JSON.stringify({ prefixo, km, nivelCombustivel, comentario, categoria });
      
      if(viaturaDesatualizada !== viaturaAtualizada) {
        setEfetuandoRequisicao(true);
        
        var _km = km.replace(/\./g, '').replace(/\,/g, '.');

        let viatura = { prefixo, km: Number(_km), nivelCombustivel, comentario, categoria: categoria._id };
        
        api.put(`/viaturas/${_id}`, viatura)
          .then(async res => {
            toast.success(res.data);
            
            let viatura = { _id, prefixo, km: Number(_km), nivelCombustivel, comentario, categoria };
            await atualizarViatura(viatura);

            setViaturaDesatualizada(viaturaAtualizada);
            recarregar();
            registrar();
          })
          .catch(err => console.error(err))
          .finally(() => setEfetuandoRequisicao(false));
      }

    } else
      kmRef.current.focus();
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

  return (
    <div className="viatura">
      <div className="cabecalho">
        <div>
          <div className="icone">
            <FireTruck />
          </div>

          <div className="prefixo">
            {editandoViatura ? (
              <input
                type="text"
                value={prefixo}
                onChange={event => setPrefixo(event.target.value)}
                placeholder="Prefixo"
                ref={prefixoRef} />
            ) : <span>{prefixo}</span>}
          </div>
        </div>

        <div className="painel">
          <div className="icone clicavel" onClick={efetuandoRequisicao ? undefined : editarViatura}>
            {efetuandoRequisicao ? <Spinner /> :  editandoViatura ? <Check /> : <Edit />}
          </div>

          <div className="icone clicavel" onClick={efetuandoRequisicao ? undefined : deletarViatura}>
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
              
              {editandoViatura ? (
                <input
                  value={km}
                  onChange={event => setKm(event.target.value)}
                  placeholder="KM"
                  inputMode="numeric"
                  ref={kmRef} />
              ) : <span>{km}</span>}
            </div>
          </div>

          <div
            className={editandoViatura ? 'clicavel' : ''}
            onClick={editandoViatura ? editarNivelCombustivel : undefined}>
            <div className="icone">
              <GasStation />
            </div>
            
            <div className="nivel-combustivel">
              <span>{nivelCombustivel}</span>
            </div>
          </div>
        </div>

        {editandoViatura || !editandoViatura && comentario !== '' ? (
          <div key={_id + '-segunda-linha'}>
            <div className="icone">
              <Chat />
            </div>

            <div className="comentario">
              {editandoViatura ? (
                <textarea
                  value={comentario}
                  onChange={event => setComentario(event.target.value)}
                  placeholder="Observação"
                  ref={comentarioRef}></textarea>
              ) : <span>{comentario}</span>}
            </div>
          </div>
        ) : <></>}

        {editandoViatura ? (
          <div
            key={_id + '-terceira-linha'}
            className={editandoViatura ? 'clicavel' : ''}
            onClick={editandoViatura ? editarCategoria : undefined}>
            <div className="icone">
              <Tag />
            </div>

            <div className="categoria-label">
              <span>{categoria.nome}</span>
            </div>
          </div>
        ) : <></>}
      </div>

      <div className="rodape"></div>
    </div>
  );
}

export default Viatura;
import { useState, useEffect, useRef, Fragment } from 'react';
import './styles.css';

import Pen from './../../assets/icons/Pen';
import Check from './../../assets/icons/Check';

import Viatura from './../../components/Viatura';
import Modal from './../../components/Modal';
import ModalEditarNivelCombustivel from './../../components/ModalEditarNivelCombustivel';
import ModalEditarComentario from './../../components/ModalEditarComentario';
import ModalAdicionarViatura from './../../components/ModalAdicionarViatura';
import ModalDeletarViatura from './../../components/ModalDeletarViatura';
import TransitionsModal from './../../components/TransitionsModal';

import moment from 'moment';

import { checkpoint as checkpointMock, viaturas as viaturasMock } from './../../tmp/mock.json'; // TODO apagar

function Home() {
  const [nome, setNome] = useState(localStorage.getItem('nome'));
  const [editandoNome, setEditandoNome] = useState(false);
  const nomeRef = useRef();

  const [checkpoint, setCheckpoint] = useState({});
  const [horario, setHorario] = useState('');
  const [dia, setDia] = useState('');

  const [viaturas, setViaturas] = useState([]);
  const [viatura, setViatura] = useState({});

  const encarrilharViatura = viatura => setViaturas(state => {
    return [...state, viatura];
  });

  const desencarrilharViatura = _id => setViaturas(state => {
    return state.filter(viatura => viatura._id !== _id);
  });

  const [editandoNivelCombustivel, setEditandoNivelCombustivel] = useState(false);
  const [editandoComentario, setEditandoComentario] = useState(false);
  const [adicionandoViatura, setAdicionandoViatura] = useState(false);
  const [deletandoViatura, setDeletandoViatura] = useState(false);

  async function editarNome() {
    await setEditandoNome(!editandoNome);

    if(!editandoNome)
      nomeRef.current.focus();
    else
      localStorage.setItem('nome', nome);
  }

  function atualizarData(data) {
    let horario = moment(data).format('HH:mm');
    let dia = moment(data).format('DD [de] MMMM [de] YYYY');
    
    setHorario(horario);
    setDia(dia);
  }

  function atualizarCheckpoint() {
    // TODO back-end aqui
    
    let checkpoint = {
      ultimoMilitar: nome,
      data: new Date().toISOString()
    };

    setCheckpoint(checkpoint);
    atualizarData(checkpoint.data);
  }

  function adicionarViatura() {
    setAdicionandoViatura(true);
  }

  function exportarPdf() {
    window.print();
  }

  function buscarDados() {
    // TODO back-end aqui
    setCheckpoint(checkpointMock);
    atualizarData(checkpointMock.data);
    setViaturas(viaturasMock);
  }

  useEffect(() => {
    buscarDados();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="nome">
            <div className="icone" onClick={editarNome}>
              {editandoNome ? <Check /> : <Pen />}
            </div>
            
            <input
              type="text"
              value={nome}
              placeholder="Patente + nome"
              onChange={event => setNome(event.target.value)}
              disabled={!editandoNome}
              ref={nomeRef} />
          </div>

          <div className="checkpoint">
            <span className="checkpoint-label">
              Último militar a atualizar:  <span className="checkpoint-value">{checkpoint.ultimoMilitar}</span>
            </span>
            <span className="checkpoint-date">{horario} &bull; {dia}</span>
          </div>

          <div className="viaturas">
            {viaturas.map(viatura => (
              <Fragment key={viatura._id}>
                <Viatura
                  setViatura={setViatura}
                  atualizarCheckpoint={atualizarCheckpoint}
                  setEditandoNivelCombustivel={setEditandoNivelCombustivel}
                  setEditandoComentario={setEditandoComentario}
                  setDeletandoViatura={setDeletandoViatura}
                  {...viatura} />
                <div className="divider"></div>
              </Fragment>
            ))}
          </div>

          <div className="operacoes">
            <div className="botao" onClick={adicionarViatura}>
              <span>Adicionar nova viatura</span>
            </div>
            
            <div className="botao" onClick={exportarPdf}>
              <span>Exportar para PDF</span>
            </div>
          </div>
        </div>
      </div>

      <Modal open={editandoNivelCombustivel} setOpen={setEditandoNivelCombustivel}>
        <ModalEditarNivelCombustivel viatura={viatura} />
      </Modal>
      
      <Modal open={editandoComentario} setOpen={setEditandoComentario}>
        <ModalEditarComentario
          viatura={viatura}
          setEditandoComentario={setEditandoComentario} />
      </Modal>
      
      <Modal open={adicionandoViatura} setOpen={setAdicionandoViatura}>
        <ModalAdicionarViatura
          atualizarCheckpoint={atualizarCheckpoint}
          setAdicionandoViatura={setAdicionandoViatura}
          encarrilharViatura={encarrilharViatura} />
      </Modal>

      <TransitionsModal open={deletandoViatura} setOpen={setDeletandoViatura}>
        <ModalDeletarViatura
          viatura={viatura}
          atualizarCheckpoint={atualizarCheckpoint}
          setDeletandoViatura={setDeletandoViatura}
          desencarrilharViatura={desencarrilharViatura} />
      </TransitionsModal>
    </>
  );
}

export default Home;
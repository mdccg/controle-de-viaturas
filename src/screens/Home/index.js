import { useState, useEffect, useRef, Fragment } from 'react';
import './styles.css';

import Pen from './../../assets/icons/Pen';
import Check from './../../assets/icons/Check';

import Viatura from './../../components/Viatura';
import Modal from './../../components/Modal';
import ModalEditarNivelCombustivel from './../../components/ModalEditarNivelCombustivel';
import ModalEditarComentario from './../../components/ModalEditarComentario';

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

  const [editandoNivelCombustivel, setEditandoNivelCombustivel] = useState(false);
  const [editandoComentario, setEditandoComentario] = useState(false);

  async function editarNome() {
    await setEditandoNome(!editandoNome);

    if(!editandoNome)
      nomeRef.current.focus();
    else
      localStorage.setItem('nome', nome);
  }

  function atualizarViatura(viatura, index) {
    let _viaturas = [...viaturas];
    _viaturas[index] = viatura;
    setViaturas(_viaturas);
  }

  function adicionarNovaViatura() {

  }

  function exportarPdf() {
    window.print();
  }

  function buscarDados() {
    // TODO back-end aqui
    setCheckpoint(checkpointMock);
    
    let horario = moment(checkpointMock.data).format('HH:mm');
    let dia     = moment(checkpointMock.data).format('DD [de] MMMM [de] YYYY');
    
    setHorario(horario);
    setDia(dia);

    setViaturas(viaturasMock);
  }

  useEffect(() => {
    buscarDados();
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
              placeholder="Informe a sua patente e o seu nome"
              onChange={({ target }) => setNome(target.value)}
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
            {viaturas.map((viatura, index) => (
              <Fragment key={viatura.prefixo}>
                <Viatura
                  setViatura={setViatura}
                  atualizarViatura={atualizarViatura}
                  setEditandoNivelCombustivel={setEditandoNivelCombustivel}
                  setEditandoComentario={setEditandoComentario}
                  {...viatura} />
                <div className="divider"></div>
              </Fragment>
            ))}
          </div>

          <div className="operacoes">
            <div className="botao" onClick={adicionarNovaViatura}>
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
    </>
  );
}

export default Home;
import { useState, useEffect, useRef } from 'react';
import './styles.css';

import Add from './../../assets/icons/Add';
import Spinner from './../../assets/icons/Spinner';
import MinusCircleSolid from './../../assets/icons/MinusCircleSolid';
import CalendarDaySolid from './../../assets/icons/CalendarDaySolid';

import Vazio  from './../../components/Vazio';
import Header from './../../components/Header';
import Topico from './../../components/Topico';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import ModalAdicionarDia from './../../components/ModalAdicionarDia';
import ModalDeletarTopico from './../../components/ModalDeletarTopico';
import ModalAdicionarTopico from './../../components/ModalAdicionarTopico';

import { delay } from './../../config/default.json';

import api from './../../services/api';

import { toast } from 'react-toastify';

function Dia({ setDias, children }) {
  const dia = children === 32 ? 'Último dia do mês' : `Dia ${children}`;

  function remover() {
    setDias(state => {
      return state.filter(value => value !== children);
    });
  }

  return (
    <div className="dia-manutencao">
      <span>{dia}</span>

      <div className="icone" onClick={remover}>
        <MinusCircleSolid />
      </div>
    </div>
  );
}

function GerenciadorTopicos() {
  const [dias, setDias] = useState([]);
  const [topico, setTopico] = useState({});
  const [topicos, setTopicos] = useState([]);
  
  const [pesquisa, setPesquisa] = useState('');

  const [buscandoAgenda, setBuscandoAgenda] = useState(false);
  const [adicionandoDia, setAdicionandoDia] = useState(false);
  const [buscandoTopicos, setBuscandoTopicos] = useState(false);
  const [deletandoTopico, setDeletandoTopico] = useState(false);
  const [adicionandoTopico, setAdicionandoTopico] = useState(false);
  

  function abrirModalAdicionarDia() {
    setAdicionandoDia(true);
  }

  function abrirModalAdicionarTopico() {
    setAdicionandoTopico(true);
  }

  function atualizarAgenda() {
    api.put('/agenda', dias)
      .then(() => toast.success('Agenda atualizada com sucesso.'))
      .catch(err => console.error(err));
  }

  function adicionarTopico(topico) {
    setTopicos(state => {
      return [...state, topico];
    });
  }

  function atualizarTopico(topico) {
    let topicos1 = [...topicos];
    let indice = topicos1.map(({ _id }) => _id).indexOf(topico._id);
    
    topicos1[indice] = topico;
    
    setTopicos(topicos1);
  }

  function deletarTopico(id) {
    let topicos1 = [...topicos].filter(({ _id }) => _id !== id);
    setTopicos(topicos1);
  }

  function buscarTopicos() {
    setBuscandoTopicos(true);
    
    api.get('/topicos')
      .then(res => setTopicos(res.data))
      .catch(err => console.error(err))
      .finally(() => setBuscandoTopicos(false));
  }

  async function buscarAgenda() {
    setBuscandoAgenda(true);

    api.get('/agenda')
      .then(res => setDias(res.data))
      .catch(err => console.error(err))
      .finally(() => setBuscandoAgenda(false));
  }

  const detectorAfkRef = useRef(false);

  useEffect(() => {
    document.title = 'MANUTENÇÃO - 1º SGBM/IND';

    if(detectorAfkRef.current) {
      var detectorAfk = setTimeout(() => {
        atualizarAgenda();
      }, delay * 1e3);
      
      return () => clearTimeout(detectorAfk);
    }

    if(JSON.stringify(dias) !== '[]')
      detectorAfkRef.current = true;

  }, [dias]);

  useEffect(() => {
    document.title = `MANUTENÇÃO ― 1º SGBM/IND`;
    buscarTopicos();
    buscarAgenda();
  }, []);

  return (
    <>
      <div className="gerenciador-topicos">
        <Header />
    
        <div className="container">
          <div className="titulo">
            <span>Agenda</span>
          </div>

          <span className="subtitulo">
            A manutenção acontecerá nos dias selecionados abaixo de todos os meses do ano.
          </span>

          {!buscandoAgenda && !dias.length ? <Vazio icone="registro">Sem manutenção</Vazio> : null}

          {buscandoAgenda ? <Spinner className="loading" /> : (
            <div className="dias-manutencao">
              {dias.map(dia => (
                <Dia key={dia} setDias={setDias}>{dia}</Dia>
              ))}
            </div>
          )}

          <div className="btn-adicionar-dia" onClick={abrirModalAdicionarDia}>
            <div className="icone">
              <CalendarDaySolid />
            </div>

            <span>Agendar novo dia</span>
          </div>

          <div className="titulo">
            <span>Tópicos</span>
          </div>

          <div className="topicos-searchbar">
            <SearchBar
              pesquisa={pesquisa}
              setPesquisa={setPesquisa}
              placeholder="Tópico" />
          </div>

          {!buscandoTopicos && !topicos.length ? <Vazio icone="registro">Sem tópicos</Vazio> : null}

          {buscandoTopicos ? <Spinner className="loading" /> : (
            <div className="topicos">
              {topicos.filter(({ titulo, descricao }) => {
                const regExp = new RegExp(`${pesquisa}`, 'gim');
                return regExp.test(titulo) || regExp.test(descricao);
              }).map(topico => (
                <Topico
                  {...topico}
                  key={topico._id}
                  setTopico={setTopico}
                  atualizarTopico={atualizarTopico}
                  setDeletandoTopico={setDeletandoTopico} />
              ))}
            </div>
          )}
        </div>
    
        <div className="footer">
          <Footer />
        </div>
      </div>

      <div className="btn-adicionar-novo-topico" onClick={abrirModalAdicionarTopico}>
        <Add />
      </div>

      <ModalAdicionarDia
        dias={dias}
        setDias={setDias}
        aberto={adicionandoDia}
        setAberto={setAdicionandoDia} />

      <ModalAdicionarTopico
        adicionarTopico={adicionarTopico}
        aberto={adicionandoTopico}
        setAberto={setAdicionandoTopico} />

      <ModalDeletarTopico
        topico={topico}
        deletarTopico={deletarTopico}
        aberto={deletandoTopico}
        setAberto={setDeletandoTopico} />
    </>
  );
}

export default GerenciadorTopicos;
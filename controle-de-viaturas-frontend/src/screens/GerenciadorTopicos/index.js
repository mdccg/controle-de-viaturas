import { useState, useEffect, useRef } from 'react';
import './styles.css';

import Add from './../../assets/icons/Add';
import MinusCircleSolid from './../../assets/icons/MinusCircleSolid';
import CalendarDaySolid from './../../assets/icons/CalendarDaySolid';

import Header from './../../components/Header';
import Topico from './../../components/Topico';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import ModalAdicionarDia from './../../components/ModalAdicionarDia';
import ModalDeletarTopico from './../../components/ModalDeletarTopico';
import ModalAdicionarTopico from './../../components/ModalAdicionarTopico';

import { delay } from './../../config/default.json';

import { dias as diasMock, topicos as topicosMock } from './../../tmp/mock.json';

function Dia({ setDias, children }) {
  const dia = children === 32 ? 'Último dia do mês' : `Dia ${children}`;

  function remover() {
    // TODO back-end aqui
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

  const [adicionandoDia, setAdicionandoDia] = useState(false);
  const [deletandoTopico, setDeletandoTopico] = useState(false);
  const [adicionandoTopico, setAdicionandoTopico] = useState(false);
  
  function abrirModalAdicionarDia() {
    setAdicionandoDia(true);
  }

  function abrirModalAdicionarTopico() {
    setAdicionandoTopico(true);
  }

  function atualizarAgenda() {
    // TODO back-end aqui
    console.log(dias);
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
    // TODO back-end aqui
    setTopicos(topicosMock);
  }

  function buscarAgenda() {
    // TODO back-end aqui
    setDias(diasMock);
  }

  const detectorAfkRef = useRef(false);

  useEffect(() => {
    if (detectorAfkRef.current) {

      var detectorAfk = setTimeout(() => {
        atualizarAgenda();

      }, delay * 1e3);
      
      return () => clearTimeout(detectorAfk);
      
    } else
      detectorAfkRef.current = true;

  }, [dias]);

  useEffect(() => {
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

          <div className="dias-manutencao">
            {dias.map(dia => (
              <Dia key={dia} setDias={setDias}>{dia}</Dia>
            ))}
          </div>

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

          <div className="topicos">
            {topicos.filter(({ titulo, descricao }) => {
              let regExp = new RegExp(`${pesquisa}`, 'gim');
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
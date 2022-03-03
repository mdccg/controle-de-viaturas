import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';
import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import Militar from './../../components/Militar';
import Footer from './../../components/Footer';
import Vazio from './../../components/Vazio';
import ModalAtualizarMilitar from './../../components/ModalAtualizarMilitar';

import getUsuario from './../../functions/getUsuario';

import api from './../../services/api';

const tipos = [
  { plural: 'Administradores', singular: 'Administrador' },
  { plural: 'Usuários', singular: 'Usuário' }
];

function TipoMilitar({ titulo, militares = [], setMilitar, setAtualizandoMilitar }) {
  const [aberto, setAberto] = useState(militares.length !== 0);
  
  const vazio = militares.length === 0;

  useEffect(() => {
    setAberto(militares.length !== 0);
  }, [militares]);

  return (
    <div className="tipo-militar">
      <div className="titulo" onClick={() => setAberto(!aberto)}>
        <div></div>

        <span>{titulo}</span>

        <ArrowDownSignToNavigate className={aberto ? 'aberto' : ''} />
      </div>

      {aberto ? militares.map(militar => (
        <div key={militar._id}>
          <Militar
            {...militar}
            setMilitar={setMilitar}
            setAtualizandoMilitar={setAtualizandoMilitar} />
        </div>
      )) : <></>}

      {aberto && vazio ? <Vazio icone="militar">Sem {titulo}</Vazio> : <></>}
    </div>
  );
}

function Militares() {
  const [reload, setReload] = useState(false);

  const [pesquisa, setPesquisa] = useState('');

  const [buscandoMilitares, setBuscandoMilitares]   = useState(false);
  const [atualizandoMilitar, setAtualizandoMilitar] = useState(false);

  const [militares, setMilitares] = useState([]);
  const [militar, setMilitar] = useState({});

  const eu = getUsuario();

  function recarregar() {
    setReload(!reload);
  }
  
  function buscarMilitares() {
    setBuscandoMilitares(true);

    api.get(`/militares?patente=${pesquisa}&nome=${pesquisa}`)
      .then(({ data: militares }) => {
        setMilitares(() => {
          return militares.filter(({ _id, ativo }) => _id !== eu._id && ativo);
        });
      })
      .catch(err => console.error(err))
      .finally(() => setBuscandoMilitares(false));
  }

  useEffect(() => {
    document.title = 'MILITARES ― 1º SGBM/IND';
    buscarMilitares();
    // eslint-disable-next-line
  }, [pesquisa, reload]);

  return (
    <>
      <div className="tela-militares">
        <Header />

        <div className="container">
          <SearchBar
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
            placeholder="Patente e nome do militar" />

          <div className="lista-militares">
            {buscandoMilitares ? <Spinner className="loader" /> : <></>}

            {tipos.map(({ plural, singular }) => (
              <TipoMilitar
                key={singular}
                titulo={plural}
                militares={militares.filter(({ tipo }) => {
                  return tipo === singular;
                })}
                setMilitar={setMilitar}
                setAtualizandoMilitar={setAtualizandoMilitar} />
            ))}
          </div>
        </div>

        <Footer />
      </div>

      <ModalAtualizarMilitar
        militar={militar}
        recarregar={recarregar}
        aberto={atualizandoMilitar}
        setAberto={setAtualizandoMilitar} />
    </>
  );
}

export default Militares;
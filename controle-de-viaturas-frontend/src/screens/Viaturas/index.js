import { useState, useEffect } from 'react';
import './styles.css';

import Add from './../../assets/icons/Add';
import GasStation from './../../assets/icons/GasStation';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import Categoria from './../../components/Categoria';
import ModalEditarNivelCombustivel from './../../components/ModalEditarNivelCombustivel';
import ModalEditarCategoria from './../../components/ModalEditarCategoria';
import ModalAdicionarViatura from './../../components/ModalAdicionarViatura';
import ModalDeletarViatura from './../../components/ModalDeletarViatura';

import { niveisCombustivel, filtroNiveisCombustivel } from './../../config/default.json';

import getUsuario from './../../functions/getUsuario';

import api from './../../services/api';

import moment from 'moment';

function Viaturas() {
  const [reload, setReload] = useState(false);

  const [pesquisa, setPesquisa] = useState('');

  const [viatura, setViatura] = useState({});
  const [viaturas, setViaturas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [ultimoRegistro, setUltimoRegistro] = useState({ signatario: {}, data: '' });

  const [filtro, setFiltro] = useState('');
  const filtrar = novoFiltro => {
    setFiltro(novoFiltro === filtro ? '' : novoFiltro);
  }

  const [editandoNivelCombustivel, setEditandoNivelCombustivel] = useState(false);
  const [editandoCategoria, setEditandoCategoria] = useState(false);
  const [adicionandoViatura, setAdicionandoViatura] = useState(false);
  const [deletandoViatura, setDeletandoViatura] = useState(false);

  function recarregar() {
    setReload(!reload);
  }
  
  function buscarUltimoRegistro() {
    api.get('/historico')
      .then(res => {
        let historico = res.data;
        let ultimoMes = Object.keys(historico).shift();
        let { signatario, createdAt } = historico[ultimoMes].shift();
        
        let dia     = moment(createdAt).format('DD [de] MMMM [de] YYYY')
        let horario = moment(createdAt).format('hh[:]mm');

        let ultimoRegistro = { signatario, horario, dia };
        setUltimoRegistro(ultimoRegistro);
      })
      .catch(err => console.error(err));
  }

  function buscarViaturas() {
    // TODO ajustar endpoint
 // api.get(`/viaturas?prefixo=${pesquisa}`)
    api.get(`/viaturas`)
      .then(res => {
        let viaturas = res.data.filter(viatura => {
          return filtro ? filtro === viatura.nivelCombustivel : true;
        });

        console.log(viaturas);

        setViaturas(viaturas);
      })
      .catch(err => console.error(err));
  }

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function pesquisarViaturas(pesquisa) {
    console.log(pesquisa);
    setPesquisa(pesquisa);
  }

  function abrirModalAdicionarViatura() {
    setAdicionandoViatura(true);
  }

  function registrar() {
    let usuario = getUsuario();

    const registro = {
      signatario: usuario._id,
      viaturas
    };

    api.post('/registros', registro)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    // IMPEDIR QUE SEJA EXECUTADO PELA PRIMEIRA VEZ
    // registrar();
  }, [viaturas]);

  useEffect(() => {
    document.title = 'FORMULÁRIO ― 1º SGBM/IND';
    buscarUltimoRegistro();
    buscarCategorias();
    buscarViaturas();
  }, [reload, filtro]);

  return (
    <>
      <div className="viaturas">
        <Header />

        <div className="container">
          <div className="checkpoint">
            <span style={{ fontFamily: 'OswaldLight' }}>
              Último militar a atualizar:  <span className="signatario">{ultimoRegistro.signatario.patente} {ultimoRegistro.signatario.nome}</span>
            </span>

            <span className="data">{ultimoRegistro.horario} &bull; {ultimoRegistro.dia}</span>
          </div>

          <div className="filtro">
            <GasStation />
            {Object.keys(filtroNiveisCombustivel).map(filtroNivelCombustivel => {
              const porExtenso = filtroNiveisCombustivel[filtroNivelCombustivel];
              const selecionado = filtro === porExtenso;

              return (
                <div
                  className={'noselect fitro-nivel-combustivel ' + (selecionado ? 'selecionado' : '')}
                  onClick={() => filtrar(porExtenso)}>
                  <span>{filtroNivelCombustivel}</span>
                </div>
              );
            })}
          </div>

          <SearchBar 
            pesquisa={pesquisa}
            setPesquisa={pesquisarViaturas}
            placeholder="Prefixo da viatura" />

          {categorias.map(categoria => (
            <Categoria
              {...categoria}
              key={categoria._id}
              recarregar={recarregar}
              setViatura={setViatura}
              setDeletandoViatura={setDeletandoViatura}
              setEditandoCategoria={setEditandoCategoria}
              setEditandoNivelCombustivel={setEditandoNivelCombustivel} 
              viaturas={viaturas.filter(viatura => {
                try {
                  return viatura.categoria._id === categoria._id;

                } catch(err) {
                  console.table(viatura);

                }
              })} />
          ))}

          <Footer />
        </div>
      </div>

      <div className="btn-adicionar-nova-viatura" onClick={abrirModalAdicionarViatura}>
        <Add />
      </div>

      <ModalEditarNivelCombustivel
        viatura={viatura}
        aberto={editandoNivelCombustivel}
        setAberto={setEditandoNivelCombustivel} />

      <ModalEditarCategoria
        viatura={viatura}
        categorias={categorias}
        aberto={editandoCategoria}
        setAberto={setEditandoCategoria} />

      <ModalAdicionarViatura
        recarregar={recarregar}
        categorias={categorias}
        aberto={adicionandoViatura}
        setAberto={setAdicionandoViatura} />

      <ModalDeletarViatura
        recarregar={recarregar}
        viatura={viatura}
        aberto={deletandoViatura}
        setAberto={setDeletandoViatura} />
    </>
  );
}

export default Viaturas;
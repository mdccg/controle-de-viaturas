import { useState, useEffect } from 'react';
import './styles.css';

import Add     from './../../assets/icons/Add';
import Spinner  from './../../assets/icons/Spinner';
import Clipboard from './../../assets/icons/Clipboard';
import GasStation from './../../assets/icons/GasStation';

import Vazio  from './../../components/Vazio';
import Header  from './../../components/Header';
import Footer   from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import Categoria  from './../../components/Categoria';
import ModalDeletarViatura      from './../../components/ModalDeletarViatura';
import ModalEditarCategoria      from './../../components/ModalEditarCategoria';
import ModalAdicionarViatura      from './../../components/ModalAdicionarViatura';
import ModalEditarNivelCombustivel from './../../components/ModalEditarNivelCombustivel';

import { filtroNiveisCombustivel }  from './../../config/default.json';

import getUsuario from './../../functions/getUsuario';

import api from './../../services/api';

import moment from 'moment';

function Viaturas() {
  const [pesquisa, setPesquisa] = useState('');

  const [buscandoViaturas, setBuscandoViaturas] = useState(false);

  const [viatura, setViatura] = useState({});
  const [viaturas, setViaturas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [ultimoRegistro, setUltimoRegistro] = useState({ signatario: {}, data: '' });

  const [filtro, setFiltro] = useState('');
  const filtrar = novoFiltro => {
    setFiltro(novoFiltro === filtro ? '' : novoFiltro);
  }

  const [editandoNivelCombustivel, setEditandoNivelCombustivel] = useState(false);
  const [adicionandoViatura, setAdicionandoViatura] = useState(false);
  const [editandoCategoria, setEditandoCategoria] = useState(false);
  const [deletandoViatura, setDeletandoViatura] = useState(false);

  function encarrilharViatura(viatura) {
    setViaturas(state => {
      return [...state, viatura];
    });
  }

  function desencarrilharViatura(_id) {
    setViaturas(state => {
      return state.filter(value => value._id !== _id);
    });
  }

  function buscarUltimoRegistro() {
    api.get('/historico')
      .then(({ data: historico }) => {
        try {
          let ultimoMes = Object.keys(historico).shift();
          
          let { signatario, createdAt: data } = historico[ultimoMes].shift() || {};

          let dia     = moment(data).format('DD [de] MMMM [de] YYYY')
          let horario = moment(data).format('HH[:]mm');
  
          if(signatario === null)
            signatario = { patente: 'Militar', nome: 'deletado' };

          let ultimoRegistro = { signatario, horario, dia, data };
          setUltimoRegistro(ultimoRegistro);
        
        } catch(err) {
          let signatario = { patente: 'A atualizar' };

          let dia     = moment().format('DD [de] MMMM [de] YYYY')
          let horario = moment().format('HH[:]mm');
          let data    = moment().toDate();
  
          let ultimoRegistro = { signatario, horario, dia, data };
          setUltimoRegistro(ultimoRegistro);
        }
      })
      .catch(err => console.error(err));
  }

  function exportarPdfAtual() {
    let { data, signatario } = ultimoRegistro;
    
    const relatorio = {
      tipo: 'diario',
      relatorio: { data, signatario, viaturas }
    };

    api.put('/relatorio', relatorio)
      .then(() => {
        window.location.pathname = '/tabela-diaria';
      })
      .catch(err => console.error(err));
  }

  function buscarViaturas() {
    setBuscandoViaturas(true);

    api.get(`/viaturas?prefixo=${pesquisa}`)
      .then(res => setViaturas(res.data))
      .catch(err => console.error(err))
      .finally(() => setBuscandoViaturas(false));
  }

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function abrirModalAdicionarViatura() {
    setAdicionandoViatura(true);
  }

  function enviarRegistro() {
    let usuario = getUsuario();

    const registro = { signatario: usuario._id };

    api.post('/registros', registro)
      .then(() => console.log('Registro criado.'))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    document.title = 'FORMULÁRIO ― 1º SGBM/IND';
    buscarUltimoRegistro();
    buscarCategorias();
    buscarViaturas();
    // eslint-disable-next-line
  }, [pesquisa]);

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
                  key={filtroNivelCombustivel}
                  className={'noselect fitro-nivel-combustivel ' + (selecionado ? 'selecionado' : '')}
                  onClick={() => filtrar(porExtenso)}>
                  <span>{filtroNivelCombustivel}</span>
                </div>
              );
            })}
          </div>

          <SearchBar 
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
            placeholder="Prefixo da viatura" />

          {buscandoViaturas ? <Spinner className="loader" /> : null}

          {!buscandoViaturas && categorias.length === 0
            ? <Vazio icone="viatura">Sem viaturas</Vazio> : null}

          <div className="lista-categorias">
            {categorias.map(categoria => (
              <Categoria
                {...categoria}
                key={categoria._id}
                viaturas={viaturas}
                setViatura={setViatura}
                setViaturas={setViaturas}
                enviarRegistro={enviarRegistro}
                setDeletandoViatura={setDeletandoViatura}
                setEditandoCategoria={setEditandoCategoria}
                setEditandoNivelCombustivel={setEditandoNivelCombustivel} 
                viaturasFiltradas={viaturas.filter(viatura => {
                  try {
                    if(!viatura.categoria)
                      return false;

                    return viatura.categoria._id === categoria._id
                      && (filtro ? viatura.nivelCombustivel === filtro : true);

                  } catch(err) {
                    console.table(viatura);

                    return [];
                  }
                })} />
            ))}
          </div>

          <div className="botao-imprimir-pdf" onClick={exportarPdfAtual}>
            <Clipboard />
            <span className="noselect">Exportar para PDF</span>
          </div>

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
        enviarRegistro={enviarRegistro}
        encarrilharViatura={encarrilharViatura}
        categorias={categorias}
        aberto={adicionandoViatura}
        setAberto={setAdicionandoViatura} />

      <ModalDeletarViatura
        enviarRegistro={enviarRegistro}
        desencarrilharViatura={desencarrilharViatura}
        viatura={viatura}
        aberto={deletandoViatura}
        setAberto={setDeletandoViatura} />
    </>
  );
}

export default Viaturas;
import { useState, useEffect } from 'react';
import './styles.css';

import Add     from './../../assets/icons/Add';
import Spinner  from './../../assets/icons/Spinner';
import Roadblock from './../../assets/icons/Roadblock';
import Clipboard  from './../../assets/icons/Clipboard';
import GasStation  from './../../assets/icons/GasStation';

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
  const eu = getUsuario();

  const [pesquisa, setPesquisa] = useState('');

  const [buscandoViaturas, setBuscandoViaturas] = useState(false);

  const [viatura, setViatura] = useState({});
  const [viaturas, setViaturas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  const [revisoes, setRevisoes] = useState([]);
  const [diaManutencao, setDiaManutencao] = useState(false);

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

  function buscarUltimoRegistro() {
    api.get('/historico')
      .then(({ data: historico }) => {
        try {
          let ultimoMes = Object.keys(historico).shift();
          
          let { signatario, createdAt: data } = historico[ultimoMes].shift() || {};

          let dia     = moment(data).format('DD [de] MMMM [de] YYYY')
          let horario = moment(data).format('HH[:]mm');
  
          if(JSON.stringify(signatario) === '{}' || !signatario)
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

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function buscarViaturas() {
    setBuscandoViaturas(true);

    api.get(`/viaturas?prefixo=${pesquisa}`)
      .then(res => setViaturas(res.data))
      .catch(err => console.error(err))
      .finally(() => setBuscandoViaturas(false));
  }

  async function buscarRevisoes() {
    let revisoes = (await api.get('/revisoes')).data;
    setRevisoes(revisoes);
  }

  async function buscarAgenda() {
    let diasManutencao = (await api.get('/agenda')).data;
    let diaHoje = Number(moment().format('D'));
    let diaManutencao = diasManutencao.includes(diaHoje);

    var hojeIso = moment(moment().format('YYYY-MM-DD'));

    if(diaManutencao) {
      const idViaturas = viaturas.map(({ _id }) => _id);

      for(const idViatura of idViaturas) {
        api.post(`/revisoes/${idViatura}`)
          .then(res => {
            if(typeof res.data === 'string')
              return;

            let { viatura, checklist, _id: revisao } = res.data;
            viatura = viaturas.filter(({ _id }) => _id === viatura)[0];

            let data = hojeIso.toDate();
            let manutencao = { viatura, checklist, revisao, data };

            api.post('/manutencoes', manutencao)
              .then(res => console.log(res.data))
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      }
    }

    let revisoes = (await api.get('/revisoes')).data;
    setRevisoes(revisoes);

    setDiaManutencao(diaManutencao);
  }

  function abrirModalAdicionarViatura() {
    setAdicionandoViatura(true);
  }

  function enviarRegistro() {
    const registro = { signatario: eu._id };

    api.post('/registros', registro)
      .then(() => console.log('Registro criado.'))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    document.title = 'FORMULÁRIO ― 1º SGBM/IND';
    buscarUltimoRegistro();
    buscarCategorias();
    buscarViaturas();
    buscarRevisoes();
    buscarAgenda();
    // eslint-disable-next-line
  }, [pesquisa]);

  useEffect(() => {
    buscarAgenda();
  }, [viaturas]);

  return (
    <>
      <div className="viaturas">
        <Header />

        <div className="container">
          {diaManutencao ? (
            <div className="card-manutencao">
              <Roadblock />

              <span className="card-titulo">Dia de manutenção</span>
            
              <span className="card-descricao">
                Boa tarde, <span className="card-destaque">{eu.patente} {eu.nome}</span>!
                Seja bem-vindo(a) de volta.
                
                Hoje, dia <span className="card-destaque">{moment().format('D [de] MMMM')}</span>,
                você fará a manutenção nas viaturas. Cada viatura abaixo ganhou um botão que
                abrirá uma lista de tópicos a serem conferidos em cada viatura.
              </span>
            </div>
          ) : null}
          
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
                revisoes={revisoes}
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
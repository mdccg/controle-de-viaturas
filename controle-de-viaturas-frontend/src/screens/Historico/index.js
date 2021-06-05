import { useState, useEffect } from 'react';
import './styles.css';

import Clipboard from './../../assets/icons/Clipboard';
import Delete from './../../assets/icons/Delete';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import Vazio from './../../components/Vazio';
import AcordeaoRegistro from './../../components/AcordeaoRegistro';

import { meses } from './../../config/default.json';

import api from './../../services/api';

import { toast } from 'react-toastify';

function Historico() {
  const [reload, setReload] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [historico, setHistorico] = useState({});

  const [pesquisa, setPesquisa] = useState('');

  function recarregar() {
    setReload(!reload);
  }

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function buscarHistorico() {
    api.get(`/historico?patente=${pesquisa}&nome=${pesquisa}&data=${pesquisa}`)
      .then(res => setHistorico(res.data))
      .catch(err => console.error(err));
  }

  function exportarPdfMensal(mes) {
    const relatorio = {
      tipo: 'mensal',
      relatorio: { mes, registros: historico[mes] }
    };

    api.put('/relatorio', relatorio)
      .then(() => window.open('/tabela-mensal', '_blank'))
      .catch(err => console.error(err));
  }

  function deletarRegistrosMensais(data) {
    let [mes, , ano] = data.split(' ');

    mes = `${meses.indexOf(mes) + 1}`.split('');
    
    if(mes.length === 1)
      mes.unshift('0');

    mes = mes.join('');

    api.delete(`/registros/mensais/${mes}/${ano}`)
      .then(res => toast.success(res.data))
      .catch(err => console.error(err))
      .finally(() => recarregar());
  }

  function limparHistorico() {
    api.delete('/registros')
      .then(res => toast.success(res.data))
      .catch(err => console.error(err))
      .finally(() => recarregar());
  }

  useEffect(() => {
    document.title = 'HISTÓRICO ― 1º SGBM/IND';
    buscarCategorias();
    buscarHistorico();
    // eslint-disable-next-line
  }, [reload, pesquisa]);

  return (
    <div className="historico">
      <Header />

      <div className="container">
        <SearchBar
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          placeholder="Militar ou data" /> 

        {JSON.stringify(historico) !== '{}' ? Object.keys(historico).map(mes => {
          const registrosMensais = historico[mes];
          
          return (
            <div className="mes" key={mes}>
              <div className="mes-label">
                <span>{mes}</span>
                <div className="divider"></div>
              </div>
              
              {registrosMensais.map(acordeao => (
                <AcordeaoRegistro
                  {...acordeao}
                  key={acordeao._id}
                  categorias={categorias}
                  recarregar={recarregar} />
              ))}
              
              <div className="botao-exportar mensal" onClick={() => exportarPdfMensal(mes)}>
                <div className="icone">
                  <Clipboard />
                </div>
                
                <span>Exportar tabela de {mes} para PDF</span>
              </div>

              <div className="botao-deletar mensal" onClick={() => deletarRegistrosMensais(mes)}>
                <div className="icone">
                  <Delete />
                </div>
                
                <span>Deletar registros de {mes}</span>
              </div>

              <div className="divider"></div>
            </div>
          );
        }) : <Vazio>Histórico vazio</Vazio>}

        {Object.keys(historico).join('') !== '' ? (
          <div className="botao-deletar total" onClick={limparHistorico}>
            <div className="icone">
              <Delete />
            </div>
            
            <span>Limpar histórico</span>
          </div>
        ) : <></>}
      </div>

      <Footer />
    </div>
  );
}

export default Historico;
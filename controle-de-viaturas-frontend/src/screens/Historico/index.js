import { useState, useEffect } from 'react';
import './styles.css';

import Clipboard from './../../assets/icons/Clipboard';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import Vazio from './../../components/Vazio';
import AcordeaoRegistro from './../../components/AcordeaoRegistro';

import api from './../../services/api';

function Historico() {
  const [categorias, setCategorias] = useState([]);
  const [historico, setHistorico] = useState({});

  const [pesquisa, setPesquisa] = useState('');

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function buscarHistorico() {
    api.get(`/historico?patente=${pesquisa}&nome=${pesquisa}`)
      .then(res => setHistorico(res.data))
      .catch(err => console.error(err));
  }

  function exportarPdfMensal(mes) {
    const relatorio = {
      tipo: 'mensal',
      relatorio: { mes, historico: historico[mes] }
    };

    api.put('/relatorio', relatorio)
      .then(() => window.open('/tabela-mensal', '_blank'))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    document.title = 'HISTÓRICO ― 1º SGBM/IND';
    buscarCategorias();
    buscarHistorico();
  }, [pesquisa]);

  return (
    <div className="historico">
      <Header />

      <div className="container">
        <SearchBar
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          placeholder="Patente e nome do militar" /> 

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
                  categorias={categorias} />
              ))}
              
              <div className="botao-exportar mensal" onClick={() => exportarPdfMensal(mes)}>
                <Clipboard />
                <span>Exportar tabela de {mes} para PDF</span>
              </div>

              <div className="mes">
                <div className="divider"></div>
              </div>
            </div>
          );
        }) : <Vazio>Histórico vazio</Vazio>}
      </div>

      <Footer />
    </div>
  );
}

export default Historico;
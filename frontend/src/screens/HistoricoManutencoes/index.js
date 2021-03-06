import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';

import Delete from './../../assets/icons/Delete';
import Spinner from './../../assets/icons/Spinner';

import Vazio  from './../../components/Vazio';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import AcordeaoManutencao from './../../components/AcordeaoManutencao';

import api from './../../services/api';

function HistoricoManutencoes() {
  const [pesquisa, setPesquisa] = useState('');
  const [quinzenas, setQuinzenas] = useState({});
  const [buscandoQuinzenas, setBuscandoQuinzenas] = useState(false);
  
  const historicoVazio = JSON.stringify(quinzenas) === '{}';

  function deletarManutencao() {
    // TODO
    
  }

  function buscarQuinzenas() {
    setBuscandoQuinzenas(true);

    api.get(`/quinzenas?prefixo=${pesquisa}`)
      .then(res => setQuinzenas(res.data))
      .catch(err => console.error(err))
      .finally(() => setBuscandoQuinzenas(false));
  }

  useEffect(() => {
    document.title = `HISTÓRICO DE MANUTENÇÕES ― 1º SGBM/IND`;
    buscarQuinzenas();
  }, [pesquisa]);

  return (
    <div className="historico-quinzenas">
      <Header />

      <div className="container">
        <SearchBar
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          placeholder="Prefixo ou data" />

        <div className="lista">
          {buscandoQuinzenas ? <Spinner className="loader" /> : null}

          {!historicoVazio ? (
            Object.keys(quinzenas).map(quinzena => {
              const acordeoes = quinzenas[quinzena];

              return (
                <div className="quinzena" key={quinzena}>
                  <div className="quinzena-label">
                    <span>{quinzena}</span>
                    <div className="divider"></div>
                  </div>

                  {Object.keys(acordeoes).map((viatura, index) => (
                    <AcordeaoManutencao
                      key={index}
                      viatura={viatura}
                      checklist={acordeoes[viatura]} />
                  ))}

                  <div className="quinzena-botao-deletar" onClick={deletarManutencao}>
                    <div className="icone">
                      <Delete />
                    </div>
                    <span>Deletar registros de manutenção do dia {quinzena}</span>
                  </div>
                </div>
              );
            })
          ) : null}
          
          {!buscandoQuinzenas && historicoVazio ? (
            <Vazio icone="registro">Histórico vazio</Vazio>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HistoricoManutencoes;
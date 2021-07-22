import { useState, useEffect } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import Vazio  from './../../components/Vazio';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import SearchBar from './../../components/SearchBar';
import AcordeaoManutencao from './../../components/AcordeaoManutencao';

import { quinzenas as quinzenasMock } from './../../tmp/mock.json';

function HistoricoManutencoes() {
  const [pesquisa, setPesquisa] = useState('');
  const [quinzenas, setQuinzenas] = useState({});
  const [buscandoQuinzenas, setBuscandoQuinzenas] = useState(false);
  
  const historicoVazio = JSON.stringify(quinzenas) === '{}';

  function buscarQuinzenas() {
    setBuscandoQuinzenas(true);
    // TODO back-end aqui

    setTimeout(() => {
      setQuinzenas(quinzenasMock);
      setBuscandoQuinzenas(false);
    }, 2e3);
  }

  useEffect(() => {
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
                <div className="quinzena">
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
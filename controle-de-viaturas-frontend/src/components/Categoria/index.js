import { useState, useEffect } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

import Vazio from './../Vazio';

function Categoria({ _id, nome, viaturas = [] }) {
  const [viaturasFiltradas, setViaturasFiltradas] = useState([]);
  const [listaVazia, setListaVazia] = useState(true);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    var viaturasFiltradas = [];

    if(viaturas.length > 0)
      viaturasFiltradas = viaturas.filter(({ categoria }) => categoria._id === _id);
    
    let listaVazia = viaturasFiltradas.length === 0;
    let aberto = !listaVazia;

    setViaturasFiltradas(viaturasFiltradas);
    setListaVazia(listaVazia);
    setAberto(aberto);
  }, [viaturas]);

  return (
    <div className="lista-viaturas" key={_id}>
      <div className="categoria">
        <div></div>
        <span>{nome}</span>
        <div className={'icone ' + (aberto ? 'aberto' : '')} onClick={() => setAberto(!aberto)}>
          <ArrowDownSignToNavigate />
        </div>
      </div>

      {aberto && !listaVazia ? (
        viaturasFiltradas.map(viatura => (
          // TODO componente da viatura aqui
          <span>{viatura.prefixo}</span>
        ))
      ) : aberto && listaVazia ? (
        <Vazio>Sem viaturas</Vazio>
      ) : <></>}
    </div>
  );
}

export default Categoria;
import { useState } from 'react';
import './styles.css';

import Chat from './../../assets/icons/Chat';
import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

function TopicoTextual({
  topico: { _id, titulo, descricao },
  revisado,
  comentario
}) {
  return (
    <div className="topico-textual">
      <div className="topico-cabecalho">
        <div className="titulo">
          <span>{titulo}</span>
        </div>

        <div className="descricao">
          <span>{descricao}</span>
        </div>
      </div>

      {comentario ? (
        <div className="comentario">
          <div className="icone">
           <Chat />
          </div>
          
          <span>{comentario}</span>
        </div>
      ) : null}

      <div className="divider"></div>
    </div>
  );
}

function AcordeaoManutencao({ viatura = {}, checklist = [] }) {
  const [aberto, setAberto] = useState(false);

  const  pendentes = checklist.filter(({ revisado }) => !revisado);
  const resolvidos = checklist.filter(({ revisado }) =>  revisado);

  function alohomora() {
    setAberto(!aberto);
  }

  return (
    <div className="acordeao-manutencao">
      <div className="cabecalho" onClick={alohomora} style={{
        borderBottomRightRadius: !aberto ? '4px' : '0',
        borderBottomLeftRadius:  !aberto ? '4px' : '0',
      }}>
        <div>
          <span className="prefixo">{viatura}</span>
          <span>&nbsp;</span>
          <span className="pendentes">
            {pendentes.length === 1 ? '(1 pendente)' :
            pendentes.length > 1 ? `(${pendentes.length} pendentes)` : ''}
          </span>
        </div>

        <div className={'icone ' + (aberto ? 'aberto' : '')}>
          <ArrowDownSignToNavigate />
        </div>
      </div>

      {aberto ? (
        <div className="corpo">
          {pendentes.length ? (
            <div className="tabela">
              <span className="titulo">Pendentes</span>

              {pendentes.map(pendente => (
                <TopicoTextual
                  {...pendente}
                  key={pendente.topico._id} />
              ))}
            </div>
          ) : null}

          {resolvidos.length ? (
            <div className="tabela">
              <span className="titulo">Resolvidos</span>

              {resolvidos.map(resolvido => (
                <TopicoTextual
                  {...resolvido}
                  key={resolvido.topico._id} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default AcordeaoManutencao;
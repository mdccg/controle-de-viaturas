import { useState } from 'react';
import './styles.css';

import ArrowDownSignToNavigate from './../../assets/icons/ArrowDownSignToNavigate';

function AcordeaoManutencao({ viatura = {}, checklist = [] }) {
  const [aberto, setAberto] = useState(false);

  const pendentes = checklist.filter(({ revisado }) => !revisado);

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
          <span>Lacrimosa</span>
        </div>
      ) : null}
    </div>
  );
}

export default AcordeaoManutencao;
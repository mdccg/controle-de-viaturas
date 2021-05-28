import { useState, useEffect } from 'react';
import './styles.css';

import moment from 'moment';

function TabelaMensal() {
  function buscarViaturas() {

  }

  useEffect(() => {
    buscarViaturas();
  }, []);

  return (
    <div className="tabela-mensal">
    </div>
  );
}

export default TabelaMensal;
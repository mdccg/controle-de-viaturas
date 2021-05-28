import { useState, useEffect } from 'react';
import './styles.css';

import moment from 'moment';

function TabelaDiaria() {
  function buscarViaturas() {

  }

  useEffect(() => {
    buscarViaturas();
  }, []);

  return (
    <div className="tabela">
    </div>
  );
}

export default TabelaDiaria;
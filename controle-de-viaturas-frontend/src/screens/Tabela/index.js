import { useState, useEffect } from 'react';
import './styles.css';

import moment from 'moment';

function Tabela() {
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

export default Tabela;
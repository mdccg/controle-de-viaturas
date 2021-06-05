import { Switch, Route } from 'react-router-dom';

import Cadastro from './screens/Cadastro';

import Login from './screens/Login';
import Pendente from './screens/Pendente';
import Viaturas from './screens/Viaturas';

import TabelaDiaria from './screens/TabelaDiaria';

import Teste from './screens/Teste';
import Historico from './screens/Historico';
import TabelaMensal from './screens/TabelaMensal';

function Routes({ usuario = {}, token = '' }) {
  return (
    <Switch>
      {/* Qualquer usuário */}
      <Route exact path="/cadastro" component={Cadastro} />

      <Route exact path="/" component={
        token !== '' && usuario.ativo ? Viaturas :
        token !== '' && !usuario.ativo ? Pendente : Login
      } />

      {/* Apenas administradores */}
      {usuario.tipo === 'Administrador' ? (
        <>
          <Route exact path="/teste" component={Teste} />
          <Route exact path="/historico" component={Historico} />
          <Route exact path="/tabela-mensal" component={TabelaMensal} />
          <Route exact path="/tabela-diaria" component={TabelaDiaria} />
        </>
      ) : <></>}

      {token !== '' ? (
        <>
          {/* Qualquer usuário logado */}
        </>
      ) : <></>}
    </Switch>
  );
}

export default Routes;
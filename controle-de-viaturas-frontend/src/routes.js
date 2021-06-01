import { Switch, Route } from 'react-router-dom';

import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import Pendente from './screens/Pendente';

import Viaturas from './screens/Viaturas';
import Historico from './screens/Historico';
import TabelaDiaria from './screens/TabelaDiaria';
import TabelaMensal from './screens/TabelaMensal';
import Teste from './screens/Teste';

const routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/cadastro" component={Cadastro} />
    <Route exact path="/pendente" component={Pendente} />
    
    <Route exact path="/viaturas" component={Viaturas} />
    <Route exact path="/historico" component={Historico} />
    <Route exact path="/tabela-diaria" component={TabelaDiaria} />
    <Route exact path="/tabela-mensal" component={TabelaMensal} />
    <Route exact path="/teste" component={Teste} />
  </Switch>
);

export default routes;
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import Historico from './screens/Historico';
import TabelaDiaria from './screens/TabelaDiaria';
import Teste from './screens/Teste';

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/historico" component={Historico} />
      <Route exact path="/tabela-diaria" component={TabelaDiaria} />
      <Route exact path="/teste" component={Teste} />
    </Switch>
  </BrowserRouter>
);

export default routes;
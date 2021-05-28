import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import Tabela from './screens/Tabela';
import Historico from './screens/Historico';
import Teste from './screens/Teste';

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tabela" component={Tabela} />
      <Route exact path="/historico" component={Historico} />
      <Route exact path="/teste" component={Teste} />
    </Switch>
  </BrowserRouter>
);

export default routes;
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import Tabela from './screens/Tabela';

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tabela" component={Tabela} />
    </Switch>
  </BrowserRouter>
);

export default routes;
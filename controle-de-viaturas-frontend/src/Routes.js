import { Switch, Route, Redirect } from 'react-router-dom';

import Login  from './screens/Login';
import Perfil from './screens/Perfil';
import Pendente  from './screens/Pendente';
import Viaturas  from './screens/Viaturas';
import Checklist from './screens/Checklist';

import Teste from './screens/Teste';
import Historico from './screens/Historico';
import Militares from './screens/Militares';
import Solicitacoes from './screens/Solicitacoes';
import TabelaDiaria from './screens/TabelaDiaria';
import TabelaMensal from './screens/TabelaMensal';
import GerenciadorTopicos   from './screens/GerenciadorTopicos';
import HistoricoManutencoes from './screens/HistoricoManutencoes';

import Cadastro from './screens/Cadastro';

const Negado = () => <Redirect to="/" />;

function Routes({ usuario = {}, token = '' }) {
  const sudo = usuario.tipo === 'Administrador';
  const logado = token !== '';
  const { ativo } = usuario;

  return (
    <Switch>
      <Route exact path="/" component={
        logado &&  ativo ? Viaturas :
        logado && !ativo ? Pendente :
        Login
      } />

      {/* Apenas administradores */}
      <Route exact path="/teste"         component={sudo ? Teste : Negado} />
      <Route exact path="/historico"     component={sudo ? Historico : Negado} />
      <Route exact path="/militares"     component={sudo ? Militares : Negado} />
      <Route exact path="/solicitacoes"  component={sudo ? Solicitacoes : Negado} />
      <Route exact path="/tabela-mensal" component={sudo ? TabelaMensal : Negado} />
      <Route exact path="/topicos"       component={sudo ? GerenciadorTopicos : Negado} />
      <Route exact path="/manutencoes"   component={sudo ? HistoricoManutencoes : Negado} />

      {/* Todos os usuários */}
      <Route exact path="/perfil"        component={logado ? Perfil : Negado} />
      <Route exact path="/checklist"     component={logado ? Checklist : Negado} />
      <Route exact path="/tabela-diaria" component={logado ? TabelaDiaria : Negado} />

      <Route exact path="/cadastro"      component={!logado ? Cadastro : Negado} />

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
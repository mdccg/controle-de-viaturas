import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';
import EmblemaCbmmsNegritado from './../../assets/icons/EmblemaCbmmsNegritado';

import putUsuario from './../../functions/putUsuario';
import putToken from './../../functions/putToken';

import api from './../../services/api';

import { toast } from 'react-toastify';

function Login() {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const emailRef = useRef();
  const senhaRef = useRef();

  function logar() {
    setEfetuandoRequisicao(true);

    let atributos = [
      { valor: email, ref: emailRef, atributo: 'o e-mail' },
      { valor: senha, ref: senhaRef, atributo: 'a senha' }
    ];

    for(let { valor, ref, atributo } of atributos) {
      if(!valor) {
        setEfetuandoRequisicao(false);

        toast.error(`Preencha ${atributo}.`);
        ref.current.focus();
        return;
      }
    }

    api.post('/login', { email, senha })
      .then(res => {
        setEmail('');
        setSenha('');

        let { militar, token } = res.data;

        putUsuario(militar);
        putToken(token);
      })
      .catch(err => toast.error(err.response.data))
      .finally(() => setEfetuandoRequisicao(false));
  }

  useEffect(() => {
    document.title = 'CONTROLE DE VIATURAS - 1º SGBM/IND';
  }, []);

  return (
    <>
      <div className="login">
        <div className="conteudo-login">
          <hgroup>
            <h1>Controle de viaturas</h1>
            <h2>1º SGBM/Ind</h2>
          </hgroup>

          <div className="card">
            <input
              type="text"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Digitar e-mail"
              className="input-form"
              ref={emailRef} />
              
            <input
              type="password"
              value={senha}
              onChange={event => setSenha(event.target.value)}
              placeholder="Digitar senha"
              className="input-form"
              ref={senhaRef} />
            
            <button className="botao-form" onClick={efetuandoRequisicao ? undefined : logar}>
              {efetuandoRequisicao ? <Spinner /> : <span>Entrar</span>}
            </button>

            <Link to="/cadastro">Criar uma conta</Link>
          </div>

          <div className="logotipo">
            <EmblemaCbmmsNegritado />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
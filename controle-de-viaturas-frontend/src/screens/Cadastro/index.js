import { useState, useEffect, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import Footer from './../../components/Footer';

import putUsuario from './../../functions/putUsuario';
import putToken   from './../../functions/putToken';

import api from './../../services/api';

import { toast } from 'react-toastify';

function Cadastro() {
  const [efetuandoRequisicao, setEfetuandoRequisicao] = useState(false);

  const [patente, setPatente] = useState('');
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [senha, setSenha]     = useState('');
  const [senha1, setSenha1]   = useState('');
  
  const patenteRef = useRef();
  const nomeRef = useRef();
  const emailRef = useRef();
  const senhaRef = useRef();
  const senha1Ref = useRef();

  function cadastrar(event) {
    event.preventDefault();
    setEfetuandoRequisicao(true);

    let atributos = [
      { valor: patente, ref: patenteRef, atributo: 'patente' },
      { valor: nome,    ref: nomeRef,    atributo: 'nome' },
      { valor: email,   ref: emailRef,   atributo: 'e-mail' },
      { valor: senha,   ref: senhaRef,   atributo: 'senha' },
      { valor: senha1,  ref: senha1Ref,  atributo: 'senha' }
    ];

    for(let { valor, ref, atributo } of atributos) {
      if(!valor) {
        setEfetuandoRequisicao(false);

        toast.error(`Campo ${atributo} obrigatório.`);
        ref.current.focus();
        return;
      }
    }

    if(senha !== senha1) {
      setEfetuandoRequisicao(false);

      toast.error('As senhas não coincidem.');
      return;
    }

    let militar = { patente, nome, email, senha };

    api.post('/militares', militar)
      .then(res => {
        setPatente('');
        setNome('');
        setEmail('');
        setSenha('');
        setSenha1('');

        toast.success(`${patente} ${nome} cadastrado(a) com êxito.`);

        let { militar, token } = res.data;

        putUsuario(militar);
        putToken(token);
      })
      .catch(err => console.error(err))
      .finally(() => setEfetuandoRequisicao(false));
  }

  useEffect(() => {
    document.title = 'CADASTRO ― 1º SGBM/IND';
  }, []);

  return (
    <div className="cadastro">
      <hgroup>
        <h1>Controle de viaturas</h1>
        <h2>1º SGBM/Ind</h2>
      </hgroup>

      <div className="container">
        <div className="aviso">
          <h3>Crie uma conta</h3>
          <p>
            A sua senha não precisa ser a mesma do seu e-mail. Ao final do cadastro, sua
            conta deverá ser aprovada pelos administradores para evitar fraudes.
          </p>
        </div>

        <form onSubmit={cadastrar}>
          <input
            type="text"
            value={patente}
            onChange={event => setPatente(event.target.value)}
            placeholder="Digitar patente (por ex.: Sargento, Tenente...)"
            className="input-form"
            ref={patenteRef} />

          <input
            type="text"
            value={nome}
            onChange={event => setNome(event.target.value)}
            placeholder="Digitar primeiro nome"
            className="input-form"
            ref={nomeRef} />
          
          <input
            type="email"
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
          
          <input
            type="password"
            value={senha1}
            onChange={event => setSenha1(event.target.value)}
            placeholder="Digitar senha novamente"
            className="input-form"
            ref={senha1Ref} />

          <button className="botao-form">
            {efetuandoRequisicao ? <Spinner /> : <span>Criar conta</span>}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Cadastro;
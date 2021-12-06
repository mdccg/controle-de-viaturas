import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './styles.css';

import Spinner from './../../assets/icons/Spinner';

import Header from './../../components/Header';
import Footer from './../../components/Footer';

import getUsuario from './../../functions/getUsuario';

import api from './../../services/api';
import { toast } from 'react-toastify';

function Perfil() {
  const [salvandoDados, setSalvandoDados] = useState(false);
  const [salvandoSenha, setSalvandoSenha] = useState(false);

  const [_id, setId] = useState('');
  const [patente, setPatente] = useState('');
  const [nome, setNome]   = useState('');
  const [email, setEmail] = useState('');

  const [militarDesatualizado, setMilitarDesatualizado] = useState('');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha]   = useState('');
  const [novaSenha1, setNovaSenha1] = useState('');

  const patenteRef = useRef();
  const nomeRef  = useRef();
  const emailRef = useRef();

  const senhaAtualRef = useRef();
  const novaSenhaRef  = useRef();
  const novaSenha1Ref = useRef();

  function salvarDados(event) {
    event.preventDefault();

    setSalvandoDados(true);

    let militar = { patente, nome, email };

    if(JSON.stringify(militar) === militarDesatualizado) {
      setSalvandoDados(false);
      return;
    }

    var obrigatorios = [
      { ref: patenteRef, valor: patente, variavel: 'Patente' },
      { ref: nomeRef,    valor: nome,    variavel: 'Nome' },
      { ref: emailRef,   valor: email,   variavel: 'E-mail' }
    ];

    for(let { ref, valor, variavel } of obrigatorios) {
      if(!valor) {
        ref.current.focus();
        toast.error(`${variavel} é obrigatório.`);
        setSalvandoDados(false);
        return;
      }
    }

    api.put(`/militares/${_id}`, militar)
      .then(() => {
        let militarDesatualizado = JSON.stringify({ patente, nome, email });
        setMilitarDesatualizado(militarDesatualizado);
      })
      .catch(err => console.error(err))
      .finally(() => setSalvandoDados(false));
  }

  function salvarSenha(event) {
    event.preventDefault();

    setSalvandoSenha(true);

    var obrigatorios = [
      { ref: senhaAtualRef, valor: senhaAtual, variavel: 'senha atual' },
      { ref: novaSenhaRef,  valor: novaSenha,  variavel: 'nova senha' },
      { ref: novaSenha1Ref, valor: novaSenha1, variavel: 'nova senha novamente' }
    ];

    for(let { ref, valor, variavel } of obrigatorios) {
      if(!valor) {
        ref.current.focus();
        toast.error(`Preencha a ${variavel}.`);
        setSalvandoSenha(false);
        return;
      }
    }

    if(novaSenha !== novaSenha1) {
      toast.error('As senhas não coincidem.');
      setSalvandoSenha(false);
      return;
    }

    api.post('/login', { email, senha: senhaAtual })
      .then(() => {
        api.put(`/atualizar-senha/${_id}`, { senha: novaSenha })
          .then(() => {
            setSenhaAtual('');
            setNovaSenha('');
            setNovaSenha1('');
          })
          .catch(err => console.error(err));

      })
      .catch(err => console.error(err))
      .finally(() => setSalvandoSenha(false));
  }

  function buscarUsuario() {
    let { _id, patente, nome, email } = getUsuario();

    setId(_id);
    setPatente(patente);
    setNome(nome);
    setEmail(email);

    let militarDesatualizado = JSON.stringify({ patente, nome, email });

    setMilitarDesatualizado(militarDesatualizado);
  }

  useEffect(() => {
    document.title = 'PERFIL ― 1º SGBM/IND';
    buscarUsuario();
  }, []);

  return (
    <div className="perfil">
      <Header />

      <div className="container">
        <form onSubmit={salvarDados}>
          <div className="titulo">
            <span>Editar perfil</span>
          </div>

          <input
            type="text"
            value={patente}
            onChange={event => setPatente(event.target.value)}
            placeholder="Sua patente"
            className="input-form"
            ref={patenteRef} />
          
          <input
            type="text"
            value={nome}
            onChange={event => setNome(event.target.value)}
            placeholder="Seu nome"
            className="input-form"
            ref={nomeRef} />
          
          <input
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Seu e-mail"
            className="input-form"
            ref={emailRef} />

          <button disabled={salvandoDados} className={'botao-form ' + (JSON.stringify({ patente, nome, email }) === militarDesatualizado ? 'desabilitado' : '')}>
            {salvandoDados ? <Spinner /> : <span>Salvar dados</span>}
          </button>
        </form>

        <form onSubmit={salvarSenha}>
          <div className="titulo">
            <span>Mudar senha</span>
          </div>

          <input
            type="password"
            value={senhaAtual}
            onChange={event => setSenhaAtual(event.target.value)}
            placeholder="Digitar senha atual"
            className="input-form"
            ref={senhaAtualRef} />
          
          <input
            type="password"
            value={novaSenha}
            onChange={event => setNovaSenha(event.target.value)}
            placeholder="Digitar nova senha"
            className="input-form"
            ref={novaSenhaRef} />

          <input
            type="password"
            value={novaSenha1}
            onChange={event => setNovaSenha1(event.target.value)}
            placeholder="Digitar nova senha novamente"
            className="input-form"
            ref={novaSenha1Ref} />

          <button disabled={salvandoSenha} className="botao-form">
            {salvandoSenha ? <Spinner /> : <span>Mudar senha</span>}
          </button>
        </form>

        <Footer />
      </div>
    </div>
  );
}

export default Perfil;